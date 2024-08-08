# Contact API Spec


## Create Contact API

Endpoint : POST /api/contacts

Headers : 
- Authorization : Bearer unique-token

Request Body :

```json
{
    "firstName" : "Muh",
    "lastName" : "Rapl",
    "email" : "muh@gmail.com",
    "phone" : "1234567890",
}
```

Response Body Success :

```json
{
    "data" {
        "id" : 1,
        "firstName" : "Muh",
        "lastName" : "Rapl",
        "email" : "muh@gmail.com",
        "phone" : "1234567890",
    }
}
```

Response Body Error :

```json
{
    "errors" : "Email is not valid format"
}
```


## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers : 
- Authorization : Bearer unique-token

Request Body :

```json
{
    "data" : {
        "id" : "1",
        "firstName" : "Muh",
        "lastName" : "Rapl",
        "email" : "muh@gmail.com",
        "phone" : "1234567890",
    }
}
```

Response Body Success :

```json
{
    "data" : {
        "id" : "1",
        "firstName" : "Muh",
        "lastName" : "Rapl",
        "email" : "muh@gmail.com",
        "phone" : "1234567890",
    }
}
```

Response Body Error :

```json
{
    "errors" : "Email is not valid format"
}
```


## Get Contact API

Endpoint : GET /api/contacts/:id

Headers : 
- Authorization : Bearer unique-token

Response Body Success : 

```json
{
    "data" : {
        "id" : "1",
        "firstName" : "Muh",
        "lastName" : "Rapl",
        "email" : "muh@gmail.com",
        "phone" : "1234567890",
    }
}
```

Response Body Error :

```json
{
    "errors" : "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers : 
- Authorization : Bearer unique-token

Query Params :
- name : Search by firstName or lastName, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : number of page, default
- size : size per page, default 10

Response Body Success : 

```json
{
    "data" : [
        {
            "id" : "1",
            "firstName" : "Muh",
            "lastName" : "Rapl",
            "email" : "muh@gmail.com",
            "phone" : "1234567890",
        },
        {
            "id" : "2",
            "firstName" : "Muh",
            "lastName" : "Rapl",
            "email" : "muh@gmail.com",
            "phone" : "1234567890",
        },
    ],
    "pagging" : {
        "page" : 1,
        "totalPage" : 3,
        "totalItem" : 30 
    }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers : 
- Authorization : Bearer unique-token


Response Body Success :

```json
{
    "message" : "contact removed successfully"
}
```

Response Body Error :

```json
{
    "errors" : "contact not found"
}
```


