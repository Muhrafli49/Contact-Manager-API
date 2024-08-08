# Adress API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers : 
- Authorization : Bearer unique-token

Request Body :

```json
{
    "street": "Nama jalan",
    "city": "Nama kota",
    "province": "Nama provinsi",
    "country": "Nama negara",
    "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
    "data" :
    {
        "id" : 1,
        "street": "Nama jalan",
        "city": "Nama kota",
        "province": "Nama provinsi",
        "country": "Nama negara",
        "postal_code": "Kode pos"
    }
}
```

Response Body Error : 

```json
{
    "error" : "Error message"
}
```


## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers : 
- Authorization : Bearer unique-token

Request Body :

```json
{
    "street": "Nama jalan",
    "city": "Nama kota",
    "province": "Nama provinsi",
    "country": "Nama negara",
    "postal_code": "Kode pos"
}
```

Response Body Success :

```json
{
    "data" :
    {
        "id" : 1,
        "street": "Nama jalan",
        "city": "Nama kota",
        "province": "Nama provinsi",
        "country": "Nama negara",
        "postal_code": "Kode pos"
    }
}
```

Response Body Error : 

```json
{
    "error" : "Error message"
}
```


## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers : 
- Authorization : Bearer unique-token


Response Body Success :

```json
{
    "data" :
    {
        "id" : 1,
        "street": "Nama jalan",
        "city": "Nama kota",
        "province": "Nama provinsi",
        "country": "Nama negara",
        "postal_code": "Kode pos"
    }
}
```

Response Body Error : 

```json
{
    "errors" : "contact is not found"
}
```


## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Headers : 
- Authorization : Bearer unique-token


Response Body Success :

```json 
{
    "data" :[
        {
            "id" : 1,
            "street": "Nama jalan",
            "city": "Nama kota",
            "province": "Nama provinsi",
            "country": "Nama negara",
            "postal_code": "Kode pos"
        },
         {
            "id" : 2,
            "street": "Nama jalan",
            "city": "Nama kota",
            "province": "Nama provinsi",
            "country": "Nama negara",
            "postal_code": "Kode pos"
        }
    ]
}
```

Response Body Error : 

```json
{
    "errors" : "contact is not found"
}
```


## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
    "errors" : "address is not found"
}
```