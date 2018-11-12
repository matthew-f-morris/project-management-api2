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
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {

    const data = JSON.parse(event.body)
    const params = {
        GroupName: 'Developers',
        UserPoolId: 'eu-west-2_kKROnK0bk',
        Username: data.username
    };    

    cognitoidentityserviceprovider.adminAddUserToGroup(params, function(err, data) {
        if (err) return failure({ status: false, error: err, data }); // an error occurred
        else return success({ status: true });           // successful response
    });
}