# Migrations Commands
- yarn typeorm migration:create -n MigrationName
- yarn typeorm migration:run
- yarn typeorm migration:revert

# Docker images
  - docker run --name gostack_gobarber -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres.
  "port": 5433,
  "username": "postgres",
  "password": "docker",
  "database": "gostack_gobarber",

  - docker run --name mongodb -p 27017:27017 -d -t mongo

  - docker run --name redis -p 6379:6379 -d -t redis:alpine


