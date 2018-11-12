// var params = {
//   GroupName: 'STRING_VALUE', /* required */
//   UserPoolId: 'STRING_VALUE', /* required */
//   Username: 'STRING_VALUE' /* required */
// };
// cognitoidentityserviceprovider.adminRemoveUserFromGroup(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

//mport { success, failure } from "./libs/response-lib";
import AWS from "aws-sdk"

export async function main(event, context) {

    const data = JSON.parse(event.body)
    const params = {
        GroupName: data.groupname,
        UserPoolId: 'eu-west-2_kKROnK0bk',
        Username: data.username
    };    

    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

    try {
        const result = await cognitoidentityserviceprovider.adminRemoveUserFromGroup(params).promise()
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