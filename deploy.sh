#!/bin/bash

sudo docker stop react-travis
sudo docker rm react-travis
sudo docker rmi adesupraptolaia/react-travis
sudo docker run -d --name react-travis -p 3000:80 adesupraptolaia/react-travis:latest