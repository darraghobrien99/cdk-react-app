import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { UserPool, VerificationEmailStyle, UserPoolClient, AccountRecovery } from '@aws-cdk/aws-cognito';
import * as codecommit from "@aws-cdk/aws-codecommit";
import * as amplify from "@aws-cdk/aws-amplify";


export class InfrastructureStack extends cdk.Stack {
  public readonly handler: lambda.Function;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucket = new s3.Bucket(this, 'ReactAppBucket', {
      bucketName: 'react-aws-application' // Choose your own bucket name here
    });
 // 3
  const bucketPolicy = new iam.PolicyStatement({
  actions: ['s3:GetObject'],
  resources: [
    `${bucket.bucketArn}/*`
  ],
  principals: [new iam.Anyone()],
})
bucket.addToResourcePolicy(bucketPolicy); // 4 

//Create Movies Table in DynamoDB
const tableName = 'Movie';
   const moviesTable =  new Table(this, 'moviesTable', {
      tableName,
      partitionKey: { name: 'title', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
    });

const moviesLambda = new lambda.Function(this, 'MoviesHandler', {
      code: lambda.Code.fromAsset('src/lambda'),
      
      handler: 'moviesHandler.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 256,
      environment: {
        TABLE_NAME:moviesTable.tableName,
      },
    });

    moviesTable.grantReadWriteData(moviesLambda);

    new apigateway.LambdaRestApi(this, 'MoviesEndpoint', {
      handler: moviesLambda,
    });

  /*   // Part 1 [Optional] - Creation of the source control repository
    const amplifyReactRepo = new codecommit.Repository(
      this,
      "react-aws-application",
      {
        repositoryName: "react-aws-application-repo",
        description:
          "CodeCommit repository that will be used as the source repository for the react app and the cdk app",
      }
    );

    // Part 2 - Creation of the Amplify Application
    const amplifyApp = new amplify.App(this, "react-aws-movie-application", {
      sourceCodeProvider: new amplify.CodeCommitSourceCodeProvider({
        repository: amplifyReactRepo,
      }),
    });
    const masterBranch = amplifyApp.addBranch("master"); */

    const userPool = new UserPool(this, 'react-app-user-pool', {
      selfSignUpEnabled: true,
      accountRecovery: AccountRecovery.PHONE_AND_EMAIL,
      userVerification: {
        emailStyle: VerificationEmailStyle.CODE
      },
      autoVerify: {
        email: true
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true
        }
      }
    });
    
    const userPoolClient = new UserPoolClient(this, "UserPoolClient", {
      userPool
    });
  
}
}
