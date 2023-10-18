import * as cdk from "aws-cdk-lib";
import { ICertificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  CfnDistribution,
  CfnOriginAccessControl,
  CloudFrontAllowedCachedMethods,
  CloudFrontAllowedMethods,
  CloudFrontWebDistribution,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { Effect, PolicyStatement, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import {
  ARecord,
  AaaaRecord,
  IHostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import {
  BlockPublicAccess,
  Bucket,
  BucketEncryption,
} from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export interface InfraStackProps extends cdk.StackProps {
  name: string;
  domainName: string;
  hostedZone: IHostedZone;
  sourcePath: string;
  acmCertifcate: ICertificate;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const bucketName = `${props.name}-bucket`;

    const contentBucket = new Bucket(this, "StaticWebsiteBucket", {
      bucketName: bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    if (props.sourcePath !== undefined) {
      new BucketDeployment(this, "UploadContent", {
        sources: [Source.asset(props.sourcePath)],
        destinationBucket: contentBucket,
      });
    }

    const oac = new CfnOriginAccessControl(this, "OAC", {
      originAccessControlConfig: {
        name: `${props.name}-oac`,
        originAccessControlOriginType: "s3",
        signingBehavior: "always",
        signingProtocol: "sigv4",
      },
    });

    const cloudFrontDistribution = new CloudFrontWebDistribution(
      this,
      "StaticWebsiteDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: contentBucket,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                allowedMethods: CloudFrontAllowedMethods.GET_HEAD,
                compress: true,
                cachedMethods: CloudFrontAllowedCachedMethods.GET_HEAD,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                minTtl: cdk.Duration.seconds(0),
                maxTtl: cdk.Duration.seconds(86400),
                defaultTtl: cdk.Duration.seconds(3600),
              },
            ],
          },
        ],
        viewerCertificate: {
          aliases: [props.domainName],
          props: {
            acmCertificateArn: props.acmCertifcate.certificateArn,
            sslSupportMethod: "sni-only",
            minimumProtocolVersion: "TLSv1.2_2021",
          },
        },
      }
    );

    // ** Work around for OAC
    const cfnDistribution = cloudFrontDistribution.node
      .defaultChild as CfnDistribution;

    cfnDistribution.addPropertyOverride(
      "DistributionConfig.Origins.0.OriginAccessControlId",
      oac.getAtt("Id")
    );
    // **

    const cdfTarget = new CloudFrontTarget(cloudFrontDistribution);

    new ARecord(this, "PublicARecord", {
      recordName: props.domainName,
      zone: props.hostedZone,
      target: RecordTarget.fromAlias(cdfTarget),
    });

    new AaaaRecord(this, "PublicAaaaRecord", {
      recordName: props.domainName,
      zone: props.hostedZone,
      target: RecordTarget.fromAlias(cdfTarget),
    });

    contentBucket.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["s3:GetObject"],
        principals: [new ServicePrincipal("cloudfront.amazonaws.com")],
        resources: [`arn:aws:s3:::${bucketName}/*`],
        conditions: {
          StringEquals: {
            "AWS:SourceArn": `arn:aws:cloudfront::${props.env?.account}:distribution/${cloudFrontDistribution.distributionId}`,
          },
        },
      })
    );
  }
}
