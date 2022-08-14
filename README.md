## Installation

```bash
$ yarn
```

## Running the app

1. Make sure you have docker installed on your system, then run :

```bash
# watch mode
$ docker-compose up

```

## Creating Migrations

1. Make sure the docker container is up and running
2. docker exec -it links_app yarn typeorm migration:create ./src/db/migrations/<MIGRATION_NAME>

## Running Migrations

After you have created your migration, run

1. docker exec -it links_app yarn typeorm migration:run
