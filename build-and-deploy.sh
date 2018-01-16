#! /bin/bash

# Compile Angular code
ng build --prod

# Put dist/ into nginx-container
docker build -t opensplit/frontend .

# Push container to Docker Hub
docker push opensplit/frontend

