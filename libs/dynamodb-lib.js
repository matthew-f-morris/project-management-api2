import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-2" });

export function call(action, params){
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    console.log(dynamoDb);
    return dynamoDb[action](params).promise();
} 
