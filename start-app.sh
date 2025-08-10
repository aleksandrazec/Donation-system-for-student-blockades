#!/bin/bash

export PATH=/home/studenti/famnit/89231167/.nvm/versions/node/v20.19.1/bin:/usr/bin:/bin

cd /home/studenti/famnit/89231167/Desktop/donations-system/back-end || exit

PING_URL="http://88.200.63.148:3333/ping"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $PING_URL)

if [ "$HTTP_STATUS" == "200" ]; then
    echo "App is running fine at $(date)" >> /home/studenti/famnit/89231167/Desktop/donations-system/cron-debug.log
else
    echo "App is down, restarting at $(date)" >> /home/studenti/famnit/89231167/Desktop/donations-system/cron-debug.log
    
    pkill -f "index.js" -u 89231167
    sleep 2
    
    nohup node index.js > /home/studenti/famnit/89231167/Desktop/donations-system/back-end/nohup.out 2>&1 &
fi