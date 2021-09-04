variable "aws_region" {
  description = "The AWS region to create things in."
  default     = "us-east-2"
}

variable "key_name" {
  description = " SSH key name to connect to ec2 instance"
  default     = "your-ssh-key-name"
}

variable "instance_type" {
  description = "instance type for ec2"
  default     = "t2.micro"
}

variable "security_group" {
  description = "Name of security group"
  default     = "my-security-group"
}

variable "tag_name" {
  description = "Tag Name of for Ec2 instance"
  default     = "my-ec2-instance"
}

variable "ami_id" {
  description = "AMI for Ubuntu Ec2 instance"
  default     = "ami-0b9064170e32bde34"
}

variable "aws_access_key" {
  description = "Access key for account"
  default     = "your-access-key"
}

variable "aws_secret_key" {
  description = "Secret key for Account"
  default     = "your-secret-key"
}

variable "username" {
  description = "EC2 instance username for SSH"
  default     = "your user name"
}
