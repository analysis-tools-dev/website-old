.PHONY: install
install:
	yarn install

.PHONY: build
build:
	yarn run build

.PHONY: deploy-all
deploy-all: deploy-voteUp deploy-voteDown deploy-votesList deploy-persistVote deploy-recalculateStatistics

backup:
	gcloud beta firestore export gs://analysis-tools-votes-backups

deploy-voteUp: 					TRIGGER=--trigger-http --allow-unauthenticated
deploy-voteDown: 				TRIGGER=--trigger-http --allow-unauthenticated
deploy-votesList: 				TRIGGER=--trigger-http --allow-unauthenticated
deploy-persistVote: 			TRIGGER=--trigger-topic=dev-votes
deploy-recalculateStatistics: 	TRIGGER=--trigger-event=providers/cloud.firestore/eventTypes/document.write --trigger-resource="projects/analysis-tools-dev/databases/(default)/documents/tags/{tag}/votes/{vote}"
.PHONY: deploy-%
deploy-%:
	gcloud functions deploy $(subst deploy-,,$@) $(TRIGGER) --runtime nodejs10