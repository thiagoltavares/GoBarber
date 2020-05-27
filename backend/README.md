# Migrations Commands
- yarn typeorm migration:create -n MigrationName
- yarn typeorm migration:run
- yarn typeorm migration:revert

- create a docker image with name: gostack_gobarber:
  docker run --name gostack_gobarber -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres.
  "port": 5433,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_gobarber",
- yarn typeorm migration:run (execute migrations)
