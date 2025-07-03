const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    const params = {
        TableName: 'Register',
        Item: {
            Email: body.email,
            FirstName: body.firstname,
            LastName: body.lastname,
            PhoneNumber: body.number,
            Password: body.password
        }
    };

    try {
        await dynamo.put(params).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // Important for browser
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ message: 'User registered successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
