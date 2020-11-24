NAME					=	Dashboard

API_DIR					=	backend

FRONT_DIR				=	front

.DEFAULT: start

.PHONY: .DEFAULT

######################################################################################
# SERVER / FRONT
start:
	@docker-compose up -d --build

run:
	@docker-compose up --build

dev:
	@docker-compose -f docker-compose.dev.yml up --build

#api-test:
#	@cd $(API_DIR) && docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
#
#api-unit-test: api-start
#	-@cd $(API_DIR) && go test ./...
#	@make --no-print-directory api-stop

stop:
	@docker-compose down

clean:
	@docker-compose down --remove-orphans --volumes


restart: stop
restart: .DEFAULT

.PHONY: start run test stop restart clean


######################################################################################
# Misc
clean-docker: stop
	@echo "y" | docker system prune

fclean-docker:
	@echo "y" | docker system prune -a --volumes

.PHONY: clean-docker fclean-docker
