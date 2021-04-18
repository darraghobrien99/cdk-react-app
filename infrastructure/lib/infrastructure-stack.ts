import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class InfrastructureStack extends cdk.Stack {
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
}
}