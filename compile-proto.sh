# bin/bash

rm -rf helloworld.pb

protoc \
  --proto_path=./idl \
  --include_imports \
  --descriptor_set_out=./helloworld.pb ./idl/example/helloworld.proto
