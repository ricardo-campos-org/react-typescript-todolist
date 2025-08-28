#!/bin/bash

# Get the IP address of the Docker container running the database
DB_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' db)

# Output the IP address
echo "$DB_IP"
