.PHONY: help install run build preview lint format doctor clean test docker-build docker-run
PORT ?= 3333
PM ?= pnpm
RUN = $(PM) run

DOCKER_IMAGE ?= nextbite:latest
DOCKER_PORT ?= 3334

help: ## List available targets.
	@awk -F ':.*## ' '/^[a-zA-Z0-9_-]+:.*## / { printf "%-18s %s\n", $$1, $$2 }' Makefile
	@printf "\n"

install: ## Install dependencies (PM=bun|pnpm|npm|yarn), remove other lockfiles.
	@if [ "$(PM)" = "bun" ]; then \
		rm -f pnpm-lock.yaml package-lock.json yarn.lock; \
	elif [ "$(PM)" = "pnpm" ]; then \
		rm -f bun.lock bun.lockb package-lock.json yarn.lock; \
	elif [ "$(PM)" = "npm" ]; then \
		rm -f bun.lock bun.lockb pnpm-lock.yaml yarn.lock; \
	elif [ "$(PM)" = "yarn" ]; then \
		rm -f bun.lock bun.lockb pnpm-lock.yaml package-lock.json; \
	else \
		echo "Unsupported PM: $(PM)"; \
		exit 1; \
	fi
	@$(PM) install

run: ## Start Vite dev server.
	@rm -rf .next
	@PORT=$(PORT) $(RUN) dev

build: ## Build for production.
	@$(RUN) build

lint: ## Run linter.
	@$(RUN) lint

format: ## Run formatter.
	@$(RUN) format

doctor: ## Run all checks: lint + format + type check
	@$(RUN) doctor

clean: ## Cleaning the app
	@rm -rf .next
	@rm -rf .playwright
	@rm -rf node_modules

test: ## Run Playwright tests.
	@$(RUN) test

docker-build: ## Build production Docker image.
	@if docker image inspect $(DOCKER_IMAGE) >/dev/null 2>&1; then docker rmi -f $(DOCKER_IMAGE); fi
	@docker build -t $(DOCKER_IMAGE) .

docker-run: ## Run production Docker image.
	@docker run --rm -p $(DOCKER_PORT):3000 $(DOCKER_IMAGE)
