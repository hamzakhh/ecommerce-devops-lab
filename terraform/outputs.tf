# IPs utilisées par Ansible dans le pipeline
output "instance_public_ips" {
  description = "IPs publiques des instances EC2"
  value       = aws_instance.web[*].public_ip
}

output "alb_dns_name" {
  description = "URL publique de l'application"
  value       = aws_lb.main.dns_name
}

output "vpc_id" {
  description = "ID du VPC créé"
  value       = aws_vpc.main.id
}