# tienda
Una tienda con nest js, en arquitectura de rest con  microservicios. Cuenta con  las funcionalidades de crear productos,usuarios por roles, autentificacion,autorizacion. 

### Account service
**/account GET** 
get all orders of a user

1.-auth token is neeeded


### Admin service
**/admin GET**
show all products

**admin/store POST**
save a product with image
1.-auth token is neeeded
2.-A user in database with role admin is needed
3.- body DTO: 
*{name:string,
description:string,
price:string
image:file}*

**admin/:id DELETE** 
delete a product
1.-auth token is neeeded
2.- A user in database with role admin is needed

**admin/:id PATCH** 
update a product
1.-auth token is neeeded
2.-A user in database with role admin is needed
3.- body DTO: 
*{name:string,
description:string,
price:string
image:file}*

### Auth
**/auth POST** 
login a user returns a token 
body DTO:
*{
username:string
password:string
}*

### Cart
**/cart POST**
creates a order for a user
1.-auth token is neeeded
2.-body dto
*{
  "products":[  
    {
    "id":number,
    "quantity":number
    }]
}*

### Products
**/products GET**
show all products  

**/products/:id GET**  
show a product  

### User
**/user/:id  GET**  
returns a user data

**/user  GET**
returns all users

**/user/:id PATCH**   
for update a user information
1.-body DTO:
*{
  name: string;
  email: string;
  password: string;
  role: string;
  balance: number;
}*

**/user/:id DELETE**
remove a user temporarily

**/user/restoreUser/:id  PATCH**
restore a user deleted

**/user/ POST**
create a user
1.-body DTO:
*{
  name: string;
  email: string;
  password: string;
  role: string;
  balance: number;
}*
