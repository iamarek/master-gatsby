const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
    return `
        <div>
            <h2>Your Recent Order for ${total}</h2>
            <p>Please start walking over, we will have your orde reeady in the next 20 minutes.</p>
            <ul>
            ${order.map(item => `
                <li>
                    <img src="${item.thumbnail}" alt="${item.name}" />
                    ${item.size} ${item.name} - ${item.price}
                </li>`).join('')}
            </ul>
            <p>Your total is <strong>${total}</strong> due at pickup</p>
            <style>
                ul {
                    list-style: none;
                }
            </style>
        </div>
    `
}

// https://ethereal.email
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});


exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);

    if (body.mapleSyrup) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Bot!'
            })
        }
    }
    const requiredFields = ['email', 'name', 'order'];
    for (const field of requiredFields) {
        if(!body[field]) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: `Ooops! You are missing the ${field} field`,
                })
            }
        }
    }

    const info = await transporter.sendMail({
        from: "Slicks Slices <slick@example.com>",
        to: `${body.name} <${body.email}>, orders@example.com`,
        subject: "New order!",
        html: generateOrderEmail({ order: body.order, total: body.total }),
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Success' }),
    }
}