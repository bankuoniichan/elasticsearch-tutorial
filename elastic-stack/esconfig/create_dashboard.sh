#!/bin/bash

echo Creating dashboard...

# Try to send import request every 10 second
# Both "success" and "already exist" responses have HTTP status of 200
while [[ "$(
    curl -XPOST localhost:5601/api/kibana/dashboards/import \
    -H 'kbn-xsrf:true' -H 'Content-type:application/json' \
    --write-out "%{http_code}" --output /dev/null --silent \
    --data @dashboard.json
)" != "200" ]]
do
    sleep 10
    echo Retrying to create dashboard...
done