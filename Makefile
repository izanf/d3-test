default:
	rm -rf public
	npm run build

build:
	docker-compose run --rm hotsite make
