# bookingapp
[Woking url](http://alicel3q.beget.tech/)

## Project `bookingapp` includes 2 apps named `booking`(backend) and `frontend`(frontend, obviously)
- [`settings`](./bookingapp/bookingapp/settings/) folder contains settings configuration split into 3 files:
- [`base.py`](./bookingapp/bookingapp/settings/base.py)  for common settings
- [`development.py`](./bookingapp/bookingapp/settings/development.py)  for dev 
- [`production.py`](./bookingapp/bookingapp/settings/production.py)  for prod

## **Installed packages:**

### backend:
- `rest_framework` - to create Rest API
- `djoser` & `rest_framework_simplejwt` - to provide authentication. You might find its configuration in settings file.

### frontend:
- `ReactJS` - for building frontend conponents
- `axios` - for making internal requests
- `redux` - for dispatching responses into fe storage
- `babel` - for compiling frontend parts

## **Endpoints:**
- `api/bookings/`- to interract with bookings by api **methods**: `get` `put` `post`  `delete`. Optional postfix /<int:pk>
- `api/parcing_space/` - to interract with parking spaces by api **methods**: `get` `post` `delete`. Optional postfix /<int:pk>

- `/` - to interract with frontend views



## **booking**
Contains all the backend parts. 
Views are stored in file named `api.py`
> Custom data validation functions stored in `services` directory. Because additional requireents were not specified, basic booking algorythm is performed. 
> So in order to check wether the parking space is available, system simply serializes data from booking records and builds ann array with available time intervals. 
> The better algoryth may be implemented, such as storing slots in reddis and building bool vectors for each day f.e.

Serializer validation also performed. User cant make booking for the past, either book time back forward

## **frontend**
Contains all the frontend parts.
- [`src`](./bookingapp/frontend/src/) - main frontend directory containing:
  - [`actions`](./bookingapp/frontend/src/actions) - for api requests functions(`bookings`) and storing const wariables(`types`)
  - [`redusers`](./bookingapp/frontend/src/reducers) - for dispatching requests
  - [`components`](./bookingapp/frontend/src/components) - for React components

> Permissions are hardcoded in [`src/actions/types.js`](./bookingapp/frontend/src/actions/types.js). 
> In order to ensure scaleability there might be a need to create custom permissions model and an endpoint to access permissions dynamicaly.
