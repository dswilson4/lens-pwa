#!/bin/bash

# Get Subscription + all media
curl -x post \
     -h "content-type: application/json" \
     -d '{"subscriberwalletaddress": "test",  "creatorwalletaddress": "0xexamplewalletaddress123"}' \

     http://localhost:3000/api/all_media
