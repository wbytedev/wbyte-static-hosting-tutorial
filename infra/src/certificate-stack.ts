import * as cdk from "aws-cdk-lib";
import {
  Certificate,
  CertificateValidation,
  ICertificate,
} from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone, IHostedZone } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";

export interface CertificateStackProps extends cdk.StackProps {
  name: string;
  hostedZoneName: string;
  domainName: string;
}

export class CertificateStack extends cdk.Stack {
  public readonly certificate: ICertificate;
  public readonly hostedZone: IHostedZone;

  constructor(scope: Construct, id: string, props: CertificateStackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromLookup(this, "HostedZoneWebsite", {
      domainName: props.hostedZoneName,
    });

    this.hostedZone = hostedZone;

    this.certificate = new Certificate(this, "AcmCertificate", {
      certificateName: `${props.name}-acm-certificate`,
      domainName: props.domainName,
      validation: CertificateValidation.fromDns(hostedZone),
    });
  }
}
