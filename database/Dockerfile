# Create PostgreSQL image and initalize database
FROM postgres:14

RUN mkdir -p /tmp/psql_data/

COPY ./init-db.sql /tmp/psql_data/
COPY ./init_docker_postgres.sh /docker-entrypoint-initdb.d/

EXPOSE 5432
CMD ["postgres"]
