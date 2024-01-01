RUN = docker run --rm -v $(shell pwd):/src --user "$(shell id -u):$(shell id -g)"
IMAGE = hugomods/hugo:reg-0.121.1

.PHONY: dev
dev:
	$(RUN) -p "1313:1313" -w /src/site $(IMAGE) hugo server -D -v --verbose --disableFastRender --bind 0.0.0.0

.PHONY: cli
cli:
	$(RUN) --entrypoint=/bin/sh -it $(IMAGE)

.PHONY: new-page
new-blog:
ifdef page
	$(RUN) -w /src/site $(IMAGE) hugo new blog/$(page)/index.md
else
	$(error "Usage: make new-blog page=[PAGE_NAME]")

endif

.PHONY: build
build:
	$(RUN) -w /src/site hugo $(IMAGE)

.PHONY:
lighthouse-test:
	docker run --rm -v "$(shell pwd)/.lighthouseci:/home/lhci/.lighthouse" -v "$(shell pwd):/home/lhci/site" pixboost/lighthouse-ci-cli:1.1.1-0.7.2 lhci --config ./site/lighthouserc.yaml autorun
