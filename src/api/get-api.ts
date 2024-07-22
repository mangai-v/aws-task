import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
  } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent, context: Context ) => {
    
    switch(event.httpMethod) {
        case 'GET':
            return getApi(event,context)
        case 'POST':
            return postApi(event,context)
        default:
            return {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            };
    }
};

const getApi = (event: APIGatewayProxyEvent, context: Context):APIGatewayProxyResult => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "GET request received" }),
      };
}

const postApi = (event: APIGatewayProxyEvent, context: Context) => {
    const item = JSON.parse(event.body|| '{}')
    return {
        statusCode: 200,
        body: JSON.stringify({ message: "POST request received",item }),
    }
}
