# Smart and Healthy Office

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
