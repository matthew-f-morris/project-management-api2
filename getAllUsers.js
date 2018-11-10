// import * as dynamoDbLib from "./libs/dynamodb-lib";
//import { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk"

export async function main(event, context) {

    const params = {
        "UserPoolId": "eu-west-2_kKROnK0bk",
        "AttributesToGet": [ "email" ] 
    };

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

    try {
        const result = await cognitoidentityserviceprovider.listUsers(params).promise()
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















    //     return success(result.Items); 
//   } catch (e) {
//     console.log(e);
//     return failure({ status: false, error: e, event });
//   }
// }