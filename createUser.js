import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: "user_data",
    Item: {
      userId: data.userId,
      email: data.email,
      name: data.name,
      skills: data.skills,
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false, error: e, data });
  }
}













// import uuid from "uuid";
// import * as dynamoDbLib from "./libs/dynamodb-lib";
// import { success, failure } from "./libs/response-lib";

// export async function main(event, context){

//     const params = {

//         TableName: "users",
//         Item: {
//             userId: event.requestContext.identity.cognitoIdentityId,
//             projectId: uuid.v1()
//         }
//     };

//     try {
//         await dynamoDbLib.call("put", params);
//         return success(params.Item);
//     } catch (error){
//         console.log(error);
//         return failure({ status: false });
//     }
// }
