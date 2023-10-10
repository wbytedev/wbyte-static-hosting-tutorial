# wbyte-static-hosting-tutorial

## Overview

This repository houses the source code and infrastructure setup for wbyte-static-hosting-tutorial. The project is designed to easily deploy a static website to AWS S3 which serves it's content via CloudFront by any domain name of choice(via Route53). Be aware that the hosted zone should be already there.

## Folder Structure

The repository is organized into the following directories:

- **_CI**: This folder contains general bash scripts that are used to execute various build, synthesis, and bootstrap tasks for the entire application.

- **.github**: Inside this directory, you will find workflows that are responsible for deploying the application. These workflows are used to automate the deployment process.

- **infra**: The `infra` directory holds an AWS CDK (Cloud Development Kit) project. This CDK project is used to deploy the application to an S3 bucket with AWS CloudFront for serving its content. You can find all the infrastructure-as-code (IaC) scripts and configuration here.

- **src**: This directory contains the source code for the application. It is a Next.js project that can be built into a static website. You'll find all the code, assets, and components related to the application's frontend in this directory.

## Getting Started

To get started with this project, follow the steps below:

1. **Cloning the Repository**: Clone this repository to your local development environment using the following command:

```bash
git clone https://github.com/wbytedev/wbyte-static-hosting-tutorial.git
```

1. **Building the Application**: Navigate to the `src` directory and follow the build instructions to compile the Next.js project into a static website.

```bash
npm i && npm run dev
```

2. **Infrastructure Deployment**: Go to the `infra` directory, where you'll find the AWS CDK project. Use the CDK CLI to deploy the necessary infrastructure on AWS. Make sure you have the required AWS credentials and permissions set up.

For synthing:
``` bash
cdk synth \
     --context accountId={YOUR_AWS_ACCOUNT_ID} \ 
     --context region={YOUR_AWS_REGION} \
     --context name={YOUR_STACK_NAME} \ 
     --context domainName={YOUR_DOMAIN_NAME} \
     --context applicationTag={YOUR_APPLICATION_TAG} \
     --context zoneName={YOUR_ZONE_NAME} \
     --context hostedZone={YOUR_HOSTED_ZONE}
```

For deploying:
``` bash
cdk deploy \
     --context accountId={YOUR_AWS_ACCOUNT_ID} \ 
     --context region={YOUR_AWS_REGION} \
     --context name={YOUR_STACK_NAME} \ 
     --context domainName={YOUR_DOMAIN_NAME} \
     --context applicationTag={YOUR_APPLICATION_TAG} \
     --context zoneName={YOUR_ZONE_NAME} \
     --context hostedZone={YOUR_HOSTED_ZONE} \
     --require-approval never
```

3. **CI/CD Workflows**: Explore the workflows in the `.github` directory. These workflows are used for automated deployments. You may need to configure secrets and settings in your repository settings for successful deployment.

## Contributing

We welcome contributions from the community. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.


## Contact

If you have any questions or need further assistance, feel free to contact me.
