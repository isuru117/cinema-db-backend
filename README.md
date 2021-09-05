# Cinema DB API
A simple REST API to store and query Movie information

![Terraform](https://img.shields.io/badge/-Terraform-purple)
![AWS](https://img.shields.io/badge/-AWS-orange)
![Node](https://img.shields.io/badge/-Node-brightgreen)
![MongoDB](https://img.shields.io/badge/-MongoDB-green)
![Docker](https://img.shields.io/badge/-Docker-blue)

#### You can view the hosted demo here: [Live Demo](https://api.cinemadb.ml)

### Requirements
- An AWS Account
- CircleCI Cloud (or any other CI/CD)
- Terraform `1.0.5` **(Recommended)**
- Node `14.7`
- Mongo `5.0.2`
- Docker Compose

## Instructions
The following sections describe steps to configure each component of the project in order 

### Setting up Infrastructure via Terraform
1. Fork and `git clone` the project to your local machine  
2. Set the variables specified in (terraform.tfvars)[https://github.com/isuru117/cinema-db-backend/blob/main/terraform/terraform.tfvars] in `./terraform`
3. **IMPORTANT** : Replace the `bucket` name in the `terraform backend "s3"` module of [main.tf](https://github.com/isuru117/cinema-db-backend/blob/main/terraform/main.tf) with a unique value, otherwise the following steps will fail
4. Run **terraform init -backend-config="access_key=`your aws access key`" -backend-config="secret_key=`your aws secret key`"**
5. Run **terraform apply**  

### Setting up the pipeline
#### This sections explains setting up the pipeline on CircleCI cloud
1. Login to CircleCI cloud and select your forked project, select `main` branch for `config.yml` in the popup
2. Set the variables specified in [.env.example](https://github.com/isuru117/cinema-db-backend/blob/main/.env.example) with your values to `Project Settings > Environment Variables` of the CircleCI project
3. Setup branch protection rules in settings to your liking
4. After inital deployment, you can view access the application **https://`{EC2-Public-IPv4-DNS-here}`/movie/{some value}**

### Manual Steps Required
- Adding TLS/SSL needs to be manually configured, this can be achieved either by using an Elastic Load Balancer with a certificate from AWS Certificate Manager or by using a service such as LetsEncrypt or any other method of choice
- Obtaining a domain (The demo domain was obtained from [freenom](freenom.com)) and configuration (via [AWS Route53](https://aws.amazon.com/route53/) or any preferred method)

### Known Issues
- Should a step between Opening and Closing Port 22 for SSH & SCP fail , the EC2 instance will be left exposed to the IP used by CircleCI pipeline
