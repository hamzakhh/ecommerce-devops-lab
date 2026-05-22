variable "aws_region" {
  description = "Région AWS"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Nom du projet"
  type        = string
  default     = "ecommerce-devops-lab"
}

variable "instance_type" {
  description = "Type d'instance EC2"
  type        = string
  default     = "t3.micro"
}

variable "ami_id" {
  description = "AMI Amazon Linux 2023"
  type        = string
  default     = "ami-0c02fb55956c7d316"  # Amazon Linux 2023 us-east-1
}

variable "instance_count" {
  description = "Nombre d'instances EC2"
  type        = number
  default     = 2
}

variable "key_name" {
  description = "Nom de la paire de clés SSH dans AWS"
  type        = string
  default     = "ecommerce-key"
}