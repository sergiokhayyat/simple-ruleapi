const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
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
    const myLambda = new lambda.Function(this, 'MyRulesEngineLambda', {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda')),
      memorySize: 256,
      timeout: Duration.seconds(10),
      environment: {
        // variables si necesitas
      }
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

    // recurso /evaluate
    const evaluate = api.root.addResource('evaluate');

    // integración lambda POST /evaluate
    evaluate.addMethod('POST', new apigateway.LambdaIntegration(myLambda));
  }
}

module.exports = { SimpleRuleapiStack }
