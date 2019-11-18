IMAGE_NAME := leafme
IMAGE_CLOUD_NAME := docker.pkg.github.com/2j/leafme/leafmeapi
TAG_NAME := latest

build:
	docker build -t $(IMAGE_NAME) .

tag:
	docker tag $(IMAGE_NAME):$(TAG_NAME) $(IMAGE_CLOUD_NAME):$(TAG_NAME)

run:
	docker run --rm -p 8000:8000 $(IMAGE_CLOUD_NAME):$(TAG_NAME)

push: build tag
	docker push $(IMAGE_CLOUD_NAME):$(TAG_NAME)

# Server commands
pull:
	docker pull $(IMAGE_CLOUD_NAME):$(TAG_NAME)

run-server:
	echo TODO
