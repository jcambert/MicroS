cd ..
SET COMPOSE_CONVERT_WINDOWS_PATHS=1 
docker-compose -f ./compose/mongo-rabbit-redis.yml -f ./compose/grafana-influxdb-prometheus.yml  up -d
pause