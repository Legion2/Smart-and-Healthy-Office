# smart-and-healthy-office-controller project

This project uses Quarkus, the Supersonic Subatomic Java Framework.

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:
```
./mvnw quarkus:dev
```

## Packaging and running the application

The application can be packaged using `./mvnw package`.
It produces the `smart-and-healthy-office-controller-1.0.0-SNAPSHOT-runner.jar` file in the `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/smart-and-healthy-office-controller-1.0.0-SNAPSHOT-runner.jar`.

## REST API

The Controller provides an REST API.
The API is documented with OpenAPI which can be loaded from the `/openapi` path after starting the controller.
There is also an Swagger UI at `/swagger-ui` available in dev mode.
