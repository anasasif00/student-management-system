import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
// Function to display welcome message
function welcomeMessage() {
    console.log(chalk.green.bold('Welcome to the Student Management System CLI!'));
}
// Function to display exit message
function exitMessage() {
    const rainbow = chalkAnimation.rainbow('Thank you for using the Student Management System CLI!');
    setTimeout(() => {
        rainbow.stop();
    }, 5000);
}
// Function to generate a random student status
function generateRandomStudentStatus() {
    const fakeNames = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Emily Davis'];
    const fakeIds = [1001, 1002, 1003, 1004];
    const fakeCourses = ['Math', 'Science', 'History', 'English'];
    const isPaid = Math.random() < 0.5;
    const randomIndex = Math.floor(Math.random() * fakeNames.length);
    return {
        name: fakeNames[randomIndex],
        id: fakeIds[randomIndex],
        courses: fakeCourses,
        balance: isPaid ? 0 : Math.floor(Math.random() * 5000),
    };
}
// Function to start the CLI
function startCLI() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'Add New Student',
                'Enroll Student',
                'View Balance',
                'Pay Tuition Fees',
                'Show Student Status',
                'Exit',
            ],
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter student name:',
            when: (answers) => answers.action === 'Add New Student',
        },
        {
            type: 'input',
            name: 'courses',
            message: 'Enter courses (comma-separated):',
            when: (answers) => answers.action === 'Add New Student',
        },
        {
            type: 'input',
            name: 'enrollId',
            message: 'Enter student ID to enroll:',
            when: (answers) => answers.action === 'Enroll Student',
        },
        {
            type: 'input',
            name: 'payId',
            message: 'Enter student ID to pay tuition fees:',
            when: (answers) => answers.action === 'Pay Tuition Fees',
        },
        {
            type: 'input',
            name: 'viewBalanceId',
            message: 'Enter student ID to view balance:',
            when: (answers) => answers.action === 'View Balance',
        },
        {
            type: 'input',
            name: 'showStatusId',
            message: 'Enter student ID to show status:',
            when: (answers) => answers.action === 'Show Student Status',
        },
    ])
        .then((answers) => {
        // Perform actions based on user input
        switch (answers.action) {
            case 'Add New Student':
                console.log(`Adding new student: ${answers.name} with courses ${answers.courses}`);
                break;
            case 'Enroll Student':
                console.log(`Enrolling student with ID ${answers.enrollId}`);
                break;
            case 'View Balance':
                if (answers.viewBalanceId) {
                    // User has entered a student ID
                    const randomStudent = generateRandomStudentStatus();
                    console.log(`Student Name: ${randomStudent.name}`);
                    console.log(`Student ID: ${randomStudent.id}`);
                    console.log(`Courses Enrolled: ${randomStudent.courses.join(', ')}`);
                    console.log(`Balance: $${randomStudent.balance}`);
                }
                else {
                    console.log('Viewing balance');
                }
                break;
            case 'Pay Tuition Fees':
                console.log(`Paying tuition fees for student with ID ${answers.payId}`);
                // Prompt for payment amount here
                inquirer
                    .prompt({
                    type: 'input',
                    name: 'amount',
                    message: 'Enter the amount to pay:',
                })
                    .then((paymentAnswer) => {
                    const amountPaid = parseFloat(paymentAnswer.amount);
                    console.log(`Paid $${amountPaid} in tuition fees for student with ID ${answers.payId}`);
                    // Ask if the user wants to perform another action
                    inquirer
                        .prompt({
                        type: 'confirm',
                        name: 'continue',
                        message: 'Do you want to perform another action?',
                        default: true,
                    })
                        .then((answer) => {
                        if (answer.continue) {
                            // If the user wants to continue, start the CLI again
                            startCLI();
                        }
                        else {
                            // If the user chooses not to continue, display the exit message
                            console.log('Exiting program');
                            exitMessage();
                        }
                    });
                });
                return; // Exit this case to prevent asking for another action prematurely
            case 'Show Student Status':
                if (answers.showStatusId) {
                    // User has entered a student ID
                    // Here you can generate a random student status or retrieve it from a database
                    const randomStudent = generateRandomStudentStatus();
                    console.log(`Student Name: ${randomStudent.name}`);
                    console.log(`Student ID: ${randomStudent.id}`);
                    console.log(`Courses Enrolled: ${randomStudent.courses.join(', ')}`);
                    console.log(`Balance: $${randomStudent.balance}`);
                    console.log(`Semesters Left: ${Math.floor(Math.random() * 5)}`);
                }
                else {
                    console.log('Showing student status');
                }
                break;
            case 'Exit':
                console.log('Exiting program');
                exitMessage(); // Display exit message
                return; // Exit the function to end the program
            default:
                console.log('Invalid action');
        }
        // Ask if the user wants to perform another action
        inquirer
            .prompt({
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to perform another action?',
            default: true,
        })
            .then((answer) => {
            if (answer.continue) {
                // If the user wants to continue, start the CLI again
                startCLI();
            }
            else {
                // If the user chooses not to continue, display the exit message
                console.log('Exiting program');
                exitMessage();
            }
        });
    });
}
// Start the CLI
welcomeMessage();
startCLI();
