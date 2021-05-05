import * as AWS from 'aws-sdk';
import { IMovie } from '../interfaces/movie';
import * as AWSLambda from 'aws-lambda';

const tableName = process.env.TABLE_NAME || '';
const tablePK = process.env.TABLE_PK || '';
const dynamo = new AWS.DynamoDB.DocumentClient();

const createResponse = (body: string | AWS.DynamoDB.DocumentClient.ItemList, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,DELETE',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    },
    body: JSON.stringify(body, null, 2),
  };
};

const getAllMovies = async () => {
  const scanResult = await dynamo.scan({ TableName: tableName }).promise();
  return scanResult;
};

const oneMovie = async (movie: string) => {
  const params = { TableName: tableName, Key: { [tablePK]: movie } };
  return await dynamo.get(params).promise();
};

const addMovieItem = async (data: IMovie) => {
  if (data) await dynamo.put({ TableName: tableName, Item: data }).promise();
  return data;
};

const deleteMovieItem = async (data: { title: string }) => {
  const { title } = data;
  if (title) await dynamo.delete({ TableName: tableName, Key: { title } }).promise();
  return title;
};

exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
  try {
    const { httpMethod, body: requestBody, queryStringParameters: params } = event;

    if (httpMethod === 'OPTIONS') {
      return createResponse('Ok');
    }

    if (httpMethod === 'GET') {
      if (!params) {
        const response = await getAllMovies();
        return createResponse(response.Items || []);
      } else if (params.movie) {
        const { Item } = await oneMovie(params.movie);
        return createResponse(Item ? [Item] : []);
      }
    }


    if (!requestBody) {
      return createResponse('Missing request body', 500);
    }

    const data = JSON.parse(requestBody);

    if (httpMethod === 'POST') {
      const movie = await addMovieItem(data);
      return movie
        ? createResponse(`${JSON.stringify(data)} added to the database`)
        : createResponse('Movie is missing', 500);
    }

    if (httpMethod === 'DELETE') {
      const movie = await deleteMovieItem(data);
      return movie
        ? createResponse(`${JSON.stringify(data)} deleted from the database`)
        : createResponse('Movie is missing', 500);
    }

    return createResponse(`Ops, something wrong!`, 500);
  } catch (error) {
    console.log(error);
    return createResponse(error, 500);
  }
};