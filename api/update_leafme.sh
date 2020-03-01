#!/bin/bash
# Updates copy of leafme on server and restarts

docker kill leafmeapi || echo 1
docker rm leafmeapi || echo 1

docker pull docker.pkg.github.com/2j/leafme/leafmeapi:latest

docker run -d \
	--restart always \
	--name leafmeapi \
	--network prismo \
	-p 8010:8000 \
	-e VIRTUAL_HOST=leafme.jj.ai \
	-e url=https://leafme.jj.ai \
	docker.pkg.github.com/2j/leafme/leafmeapi
