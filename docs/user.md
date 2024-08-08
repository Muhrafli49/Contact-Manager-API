# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body: 

```json
{
    "username": "rapl",
    "password": "adadeh",
    "name": "Muhamad Rafli"
}
```

Response: Body Succes: 

```json 
{
    "data" : {
        "username": "rapl",
        "name": "Muhamad Rafli"
    }
}
```

Response: Body Error: 

```json 
{
    "error" : "username already exist"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body: 

```json
{
    "username": "rapl",
    "password": "adadeh"
}
```

Response: Body Succes:

```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error : 

```json
{
    "error" : "invalid username or password"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers : 
- Authorization : Bearer unique-token

Request Body :

```json
    {
        "name": "Muhamad Rafli Arizal", //opsional
        "password": "new password" //opsional
    }
```

Response Body Succes :

```json
{
    "data" : {
        "username" : "rapl",
        "name" : "Muhamad Rafli Arizal"
    }
}
```

Response Body Error : 

```json
{
    "error": "name length max 100"
}
```


## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : Bearer unique-token

Response Body Succes :

```json
{
    "data" : {
        "username" : "rapl",
        "name" : "Muhamad Rafli Arizal"
    }
}
```

Response Body Error :

```json
{
    "error": "invalid token"
}
```


## Logout User API

Endpoint: DELETE /api/users/logout

Headers : 
- Authorization : Bearer unique-token

Response Body Success : 

```json
{
    "data" : "OK"
}
```

Response Body Error : 

```json
{
    "error": "Unauthorized"
}
```