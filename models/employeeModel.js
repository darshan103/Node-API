const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter employee first-name"]
        },
        lastName: {
            type: String,
            required: [true, "Please enter employee last-name"]
        },
        email: {
            type: String,
            required: [true, "Please enter employee email"]
        },
        dob: {
            type: String,
            required: [true, "Please enter employee dob"]
        },
        gender: {
            type: String,
            required: [true, "Please enter employee gender"]
        },
        education: {
            type: String,
            required: [true, "Please enter employee education name"]
        },
        company: {
            type: String,
            required: [true, "Please enter employee company name"]
        },
        experience: {
            type: String,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;