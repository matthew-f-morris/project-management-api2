// var params = {
//     GroupName: 'STRING_VALUE', /* required */
//     UserPoolId: 'STRING_VALUE', /* required */
//     Username: 'STRING_VALUE' /* required */
//   };
//   cognitoidentityserviceprovider.adminAddUserToGroup(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });

//import * as dynamoDbLib from "./libs/dynamodb-lib";
//import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk"

export async function main(event, context) {

    const data = JSON.parse(event.body)
    const params = {
        GroupName: 'Developers',
        UserPoolId: 'eu-west-2_kKROnK0bk',
        Username: data.username
    };    

    var provider = new AWS.AmazonIdentityManagementServiceClient()

    try {
        const result = await provider.Add
        return success({data: result}); 
    } catch (e) {
        console.log(e);
        return failure({ status: false, error: e, event });
    }
}

function buildResponse(statusCode, body){
    return {
        statusCode,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(body)
    };
}

export function success(body){
    return buildResponse(200, body);
}

export function failure(body){
    return buildResponse(500, body);
}