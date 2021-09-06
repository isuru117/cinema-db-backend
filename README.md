# Cinema DB API ![main branch status](https://img.shields.io/github/checks-status/isuru117/cinema-db-backend/main)
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

### Setting up locally
#### Running manually
1. Ensure you have mongoDB setup and running locally
2. Fork and `git clone` the project to your local machine
3. Add an .env with value for `MONGO_DB_URI` and `PORT` in the root folder
3. Run `npm run start` to run the application 

#### Running with docker-compose
1. Fork and `git clone` the project to your local machine
2. Add an .env with value for `MONGO_DB_URI` in the root folder
3. Run `docker-build . -t <anyname>:<anytag>`
4. Update app:image to your `<anyname>:<anytag>` in **docker-compose.yaml** and run `docker-compose up`
5. App should now be running on `http://localhost:80/` 

#### Additional commands
- `npm run dev` to run the app with nodemon
- `npm run test` to run unit tests
- `npm run lint` to run a code analysis 

### Setting up Infrastructure via Terraform
#### This section explains how to deploy required infrastructure via Terraform CLI locally
1. Fork and `git clone` the project to your local machine  
2. Set the variables specified in (terraform.tfvars)[https://github.com/isuru117/cinema-db-backend/blob/main/terraform/terraform.tfvars] in `./terraform`
3. **IMPORTANT** : Replace the `bucket` name in the `terraform backend "s3"` module of [main.tf](https://github.com/isuru117/cinema-db-backend/blob/main/terraform/main.tf) with a unique value, otherwise the following steps will fail
4. Run **terraform init -backend-config="access_key=`your aws access key`" -backend-config="secret_key=`your aws secret key`"**
5. Run **terraform apply**  

### Setting up the pipeline
#### This sections describes setting up the pipeline on CircleCI cloud
1. Login to CircleCI cloud and select your forked project, select `main` branch for `config.yml` in the popup
2. Set the variables specified in [.env.example](https://github.com/isuru117/cinema-db-backend/blob/main/.env.example) with your values to `Project Settings > Environment Variables` of the CircleCI project
3. Setup branch protection rules in settings to your liking
4. After inital deployment, you can test the application via **https://`{EC2-Public-IPv4-DNS-here}`/movie/{some value}** (Swagger will not run as SSL is not setup, check ***Manual Steps Required*** section)

#### Manual Steps Required
- Adding TLS/SSL needs to be manually configured, this can be achieved either by using an Elastic Load Balancer with a certificate from AWS Certificate Manager or by using a service such as LetsEncrypt or any other method of choice
- Obtaining a domain (The demo domain was obtained from [freenom](https://www.freenom.com/)) and configuration (via [AWS Route53](https://aws.amazon.com/route53/) or any preferred method)

### CI Process
#### A brief description on the CI process setup in the project
- A build will be run for every Pull Request made to the `main` branch, and the follwing events will occur  
  - Update packages with `npm ci` and save-cache, run `eslint` for code analysis and run unit tests with `mocha`
  - If above steps pass, docker build will be run for additional validation
  - If all the checks are passed only, will the Pull Request merging be allowed 
- A deployment will run for each Pull Request merged to master, consisting of the following steps
  - Rebuild Dockerimage and push to Docker Hub with tag set to last git commit hash (this avoid issues when updating docker-compose on server in future steps)
  - Setup AWS CLI and open port 22 via Security Group for connecting to EC2 instance
  - Run `scp` and copy docker-compose.yml
  - Update running docker-compose instance via `ssh` along with updated image tag, the deployment completes 
  - Close the port 22 previously opened to connect to the EC2 instance      

### Notes
- Should a step between Opening and Closing Port 22 for SSH & SCP fail , the EC2 instance will be left exposed to the IP used by CircleCI pipeline, 'when: always' was added to the close port step as a potential fix for this
- Some of the package and file imports may look inconsistent in the source due to the use of in-built experimental ES6 features packaged in node by adding `{"type":"module"}` in `package.json` without setting up a transpiler such as babel
