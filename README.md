# simple-ruleapi
Simple rule engine execution API (based on [JSON rules engine](https://github.com/cachecontrol/json-rules-engine))

This project is a CDK development with JavaScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

* `npm run test`         perform the jest unit tests
* `npx cdk deploy`       deploy this stack to your default AWS account/region
* `npx cdk diff`         compare deployed stack with current state
* `npx cdk synth`        emits the synthesized CloudFormation template

## Usage example

Once deployed (you will get the API `$URL` as output),
you can call the API to evaluate a ruleset on a fact (see rules+facts examples in the `example/` folder):

```bash
# Execute the first example
curl -X POST $URL/evaluate -d examples/example.json
# Result:
# {"events":[{"type":"fouledOut","params":{"message":"Player has fouled out!"}}]}


#Execute the second example
curl -X POST $URL/evaluate -d examples/example2.json
# Result:
# {"events":[{"type":"is-adult","params":{"message":"El usuario es mayor de edad"}}]}
```