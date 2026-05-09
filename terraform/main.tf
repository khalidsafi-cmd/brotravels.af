terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Configure the AWS Provider for LocalStack
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    s3 = "http://localhost:4566"
  }
}

# S3 bucket for static website hosting
resource "aws_s3_bucket" "website_bucket" {
  bucket = "brotravels-af-website"

  tags = {
    Name        = "BroTravels.AF Website"
    Environment = "dev"
    Project     = "brotravels-af"
  }
}

# Configure the bucket for website hosting
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# Bucket policy to allow public read access
resource "aws_s3_bucket_policy" "website_policy" {
  bucket = aws_s3_bucket.website_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.website_bucket.arn}/*"
        ]
      }
    ]
  })
}

# Upload website files to S3
resource "aws_s3_object" "website_files" {
  for_each = fileset("../", "**/*")

  bucket = aws_s3_bucket.website_bucket.id
  key    = each.value
  source = "../${each.value}"
  etag   = filemd5("../${each.value}")

  # Only upload specific file types
  content_type = lookup({
    "html" = "text/html"
    "css"  = "text/css"
    "js"   = "application/javascript"
    "png"  = "image/png"
    "jpg"  = "image/jpeg"
    "jpeg" = "image/jpeg"
    "webp" = "image/webp"
    "svg"  = "image/svg+xml"
  }, split(".", each.value)[length(split(".", each.value)) - 1], "binary/octet-stream")
}

# Output the website URL
output "website_url" {
  value = aws_s3_bucket_website_configuration.website_config.website_endpoint
}