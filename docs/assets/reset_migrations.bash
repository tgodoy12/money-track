rm -R -f ./migrations &&
pipenv run init &&
dropdb -h localhost -U postgres money-track || true &&
createdb -h localhost -U postgres money-track || true &&
psql -h localhost money-track -U postgres -c 'CREATE EXTENSION unaccent;' || true &&
pipenv run migrate &&
pipenv run upgrade
