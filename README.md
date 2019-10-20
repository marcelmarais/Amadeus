# Amadeus <img src="https://lh3.googleusercontent.com/rIB5sP8kUzPQebacqucskT7tj4IgU_aiBJE5JKRraiLVRgDyLo36jqa8z58qynbn95Ze" alt="drawing" width="70" align = "center"/>
Amadeus aims to provide a user interface and type inference for Uber's deep learning toolkit [Ludwig](https://uber.github.io/ludwg/).

## Setup

### Docker

After cloning the repository and navigating to its directory, use the Docker one-liner below to build the `backend` and `frontend`. The development server will also start up.
```bash
docker-compose up
```
***Alternatively,*** you could build the containers separately from each image by running:
```
docker build app/backend
```
and
```
docker build app/frontend
```

## Credits

[Ludwig](https://uber.github.io/ludwig/)
