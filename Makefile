RUN = docker run --rm -v $(shell pwd):/src --user "$(shell id -u):$(shell id -g)"
IMAGE = klakegg/hugo:0.77.0

.PHONY: dev
dev:
	$(RUN) -p "1313:1313" -w /src/site $(IMAGE) server -D -v --verboseLog --log --disableFastRender

.PHONY: cli
cli:
	$(RUN) --entrypoint=/bin/sh -it $(IMAGE)

.PHONY: new-page
new-blog:
ifdef page
	$(RUN) -w /src/site $(IMAGE) new blog/$(page)/index.md
else
	$(error "Usage: make new-blog page=[PAGE_NAME]")

endif

.PHONY: build
build:
	$(RUN) -w /src/site $(IMAGE)

.PHONY:
lighthouse-test:
	echo PWD $(shell pwd)
	docker run --rm -v $(shell pwd):/home/lhci/site -v $(shell pwd)/.lighthouseci:/home/lhci/.lighthouseci pixboost/lighthouse-ci-cli lhci --config ./site/lighthouserc.yaml autorun
