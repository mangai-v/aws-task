import { Construct } from 'constructs';
import {Stack, StackProps} from 'aws-cdk-lib'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import {join} from 'path'
import { ApiStackProps } from '../src/infra/common/interface'

export class AwsTaskStack extends Stack {
  public readonly getFunctionLambdaIntegration: LambdaIntegration
  public readonly postFunctionLambdaIntegration: LambdaIntegration 
  constructor(scope: Construct, id: string, props?: ApiStackProps) {
    super(scope, id, props);

    const getFunction = new NodejsFunction(this, 'GetFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: join(
          __dirname, 
          '..',
          'src', 
          'api', 
          'get-api.ts'
      )
  })

  const postFunction = new NodejsFunction(this, 'PostFunction', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: join(
          __dirname, 
          'src', 
          'api', 
          'get-api.ts'
      )
  })

  this.getFunctionLambdaIntegration = new LambdaIntegration(getFunction)
  this.postFunctionLambdaIntegration = new LambdaIntegration(postFunction)

  const api = new RestApi(this, 'MyApi')

  const itemResource = api.root.addResource('items')
  itemResource.addMethod('GET',this.getFunctionLambdaIntegration)
  itemResource.addMethod('POST',this.postFunctionLambdaIntegration)

   
  }
}
