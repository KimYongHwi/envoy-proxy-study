# envoy-proxy-study
HTTP/JSON을 gRPC로 트랜스코딩 하기 위한 envoy proxy sample 입니다.

## Main Component
- [spring cloud gateway](https://cloud.spring.io/spring-cloud-static/spring-cloud-gateway/2.2.3.RELEASE/reference/html/)
- [envoy](https://www.envoyproxy.io/docs/envoy/latest/intro/what_is_envoy)
- [malijs](https://mali.js.org/)

## Architecture

![Untitled Diagram (30)](https://user-images.githubusercontent.com/60471420/88253345-88f00180-ccec-11ea-90dd-22c8a89d308f.png)

> client로 부터 전달 받은 request를 Api gateway에서 Envoy proxy로 전달하면 Envoy에서 gRPC로 트랜스코딩 후 gRPC Server로 전달된다.

## Before start

```
$ ./compile-proto.sh 
$ ./build-gateway.sh
```

## Run containers

```
$ docker-compose up -d
```

## Test

```
$ curl -XGET http://localhost:8000/helloworld?name=test
```

## Main directories

```
├── api
├── envoy-config
├── gateway
└── idl
```

- api: mali.js로 grpc server를 실행시킵니다.
- envoy-config: envoy관련 설정은 해당 디렉토리에 envoy.yml에 정의 합니다.
- gateway: spring cloud gateway로 api gateway를 실행시킵니다. 
- idl: *.proto을 관리합니다.

## Envoy
L7 proxy and communication bus designed for large modern service oriented architectures.

### Out of process architecture
Envoy is a self contained process that is designed to run alongside every application server. All of the Envoys form a transparent communication mesh in which each application sends and receives messages to and from localhost and is unaware of the network topology. The out of process architecture has two substantial benefits over the traditional library approach to service to service communication:

- Envoy works with any application language. A single Envoy deployment can form a mesh between Java, C++, Go, PHP, Python, etc. It is becoming increasingly common for service oriented architectures to use multiple application frameworks and languages. Envoy transparently bridges the gap.

- As anyone that has worked with a large service oriented architecture knows, deploying library upgrades can be incredibly painful. Envoy can be deployed and upgraded quickly across an entire infrastructure transparently.

### gRPC support
gRPC is an RPC framework from Google that uses HTTP/2 as the underlying multiplexed transport. Envoy supports all of the HTTP/2 features required to be used as the routing and load balancing substrate for gRPC requests and responses. The two systems are very complementary.
