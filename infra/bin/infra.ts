#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { InfraStack } from "../src/infra-stack";
import { CertificateStack } from "../src/certificate-stack";

const app = new cdk.App();

const props = {
  name: app.node.tryGetContext("name"),
  domainName: app.node.tryGetContext("domainName"),
  applicationTag: app.node.tryGetContext("applicationTag"),
  hostedZoneName: app.node.tryGetContext("hostedZone"),
  sourcePath: app.node.tryGetContext("sourcePath"),
  env: {
    account: app.node.tryGetContext("accountId"),
    region: app.node.tryGetContext("region"),
  },
  crossRegionReferences: true,
};

/*
 * Two stacks to satisfy cross-region certificate:
 * https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_certificatemanager-readme.html#cross-region-certificates
 */
const certificateStack = new CertificateStack(
  app,
  `${props.applicationTag}-cert-stack`,
  {
    ...props,
    env: {
      region: "us-east-1",
      account: props.env.account,
    },
  }
);

new InfraStack(app, props.applicationTag, {
  ...props,
  acmCertifcate: certificateStack.certificate,
  hostedZone: certificateStack.hostedZone,
});
