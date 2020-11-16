RUN = docker run --rm -v $(shell pwd):/src
IMAGE = klakegg/hugo:0.77.0

.PHONY: dev
dev:
	$(RUN) -p "1313:1313" -w /src/site $(IMAGE) server -D -v --log --disableFastRender

.PHONY: cli
cli:
	$(RUN) --entrypoint=/bin/sh -it $(IMAGE)

.PHONE: build
build:
	$(RUN) -w /src/site $(IMAGE)