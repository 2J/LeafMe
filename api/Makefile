IMAGE_NAME := leafme
IMAGE_CLOUD_NAME := docker.pkg.github.com/2j/leafme/leafmeapi
TAG_NAME := latest

build:
	docker build -t $(IMAGE_NAME) .

tag:
	docker tag $(IMAGE_NAME):$(TAG_NAME) $(IMAGE_CLOUD_NAME):$(TAG_NAME)

run:
	docker run --rm -p 8000:8000 --name=leafmeapi --network=leafme $(IMAGE_CLOUD_NAME):$(TAG_NAME)

rundb:
	docker run -d --restart always \
	--name mysql \
	--network=leafme \
	-e MYSQL_ROOT_PASSWORD=***REMOVED*** \
	-p 3306:3306 \
	mysql:5

push: build tag
	docker push $(IMAGE_CLOUD_NAME):$(TAG_NAME)

# Server commands
pull:
	docker pull $(IMAGE_CLOUD_NAME):$(TAG_NAME)

run-server:
	echo TODO
