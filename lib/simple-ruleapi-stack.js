const { Stack, Duration, CfnOutput } = require('aws-cdk-lib');
const { Runtime } = require('aws-cdk-lib/aws-lambda');
const lambdaNodejs = require('aws-cdk-lib/aws-lambda-nodejs');
const apigateway = require('aws-cdk-lib/aws-apigateway');
const path = require('path');

class SimpleRuleapiStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // Lambda function
    const myLambda = new lambdaNodejs.NodejsFunction(this, 'MyRulesEngineLambda', {
      functionName: 'rulesEngineLambda',
      runtime: Runtime.NODEJS_22_X,
      entry: path.resolve(__dirname, '../lambda/index.js'),
      handler: 'handler',
      memorySize: 128,
      timeout: Duration.seconds(10)
    });

    // API Gateway REST API
    const api = new apigateway.RestApi(this, 'RulesEngineApi', {
      restApiName: 'Rules Engine Service',
      description: 'API para evaluar reglas con json-rules-engine',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: ['POST'],
      },
    });
    // Add API url as Cloudformation output
    new CfnOutput(this, "RulesEngineUrlOutput", {
      value: api.url
    })

    // recurso /evaluate
    const evaluate = api.root.addResource('evaluate');

    // integración lambda POST /evaluate
    evaluate.addMethod('POST', new apigateway.LambdaIntegration(myLambda));
  }
}

module.exports = { SimpleRuleapiStack }
