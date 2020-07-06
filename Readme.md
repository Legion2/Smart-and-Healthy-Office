# Smart and Healthy Office

This is a prototype for a study project, it has no security build in and the code does not represent best practice.
Use at your own risk.

This project consists of sensors (simulated), a Controller with Repository and Web Server and a WebApp.
## Getting started
Clone this repository.
Create a copy of the `example.env` file and name it `.env`, adjust the values in for your needs.
To run the simulated system on your machine you need docker installed and running.
Start the system using `docker-compose`:
```
docker-compose up -d
```
View the logs with `docker-compose logs -f`

### Use the production deployment
First create the `.env` file and set all the required variables:
- `DOCKER_HOST=ssh://<domain name here>`
- `HOST_NAME=<domain name here>`
- `SSL_CERTIFICATE_NAME=<domain name here>`
You need ssh access to the host and docker running on the host.

Create a SSL certificate with certbot:

`DOCKER_HOST=ssh://<domain name here> ./certbot certonly --manual -d '<domain name here>' --preferred-challenges dns`

### Distributed Setup

All components can communicate over the network.
By default all are hosted on the same server.
To demonstrate the distribution of the system, the components can be stopped on the central server and started on any other server which have network access to the MQTT broker.
There are two docker-compose files to demonstrate this `docker-compose.remote-presence-simulation.yml` and `docker-compose.remote-sensor-office.yml`.
To use them create a `.env` file which defines `REMOTE_MQTT_HOST` and then start the service with `docker-compose -f docker-compose.remote-{service}.yml up -d`.

## Fake data

Fake presence data can be generated with the `docker-compose.remote-presence-simulation.yml` service, which reads the locations of the users from the file `presence.json`.
The file can be edited while the service is running.
