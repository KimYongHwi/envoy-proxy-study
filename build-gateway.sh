# bin/bash

cd gateway
./gradlew clean && ./gradlew build -x test
