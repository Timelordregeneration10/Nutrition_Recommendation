## Login

/**

Your html shouldn't has the same name as url you will request.

param==request (and the json's key's name should be the same as I written)

return==response

Result{returning_code, [message], data}

User{id(null), username, password, signature(null)}

*/

### sign up

@method post

@url ${project_prefix}/login/signup

@param User

@return Result

​	possibilities: SAME_USERNAME, OK, WRONG

### sign in 

@method post

@url ${project_prefix}/login/signin

@param User	

@return Result

​	possibilities: WRONG_PASSWORD,OK ,WRONG, UNFOUND_USER

## Settings

### update username

@method post

@url ${project_prefix}/settings/update-username

@param oldUsername(String), newUsername(String) 

​	# need array json

@return Result

​	possibilities: SAME_USERNAME,OK ,WRONG , UNFOUND_USER

### update password

@method post

@url ${project_prefix}/settings/update-password

@param username(String), oldPassword(String), newPassword(String)

​	# need array json

@return Result

​	possibilities: WRONG_PASSWORD,OK ,WRONG, UNFOUND_USER

### update signature

@method post

@url ${project_prefix}/settings/update-signature

@param username(String), signature(String)

​	# need array json

@return Result

​	possibilities:OK ,WRONG, UNFOUND_USER

### details

@method post

@url ${project_prefix}/settings/details

@param {username(String)}

​	# need array json

@return Result

​	possibilities: OK, WRONG

   data: User


## data-recommendation

### foods

@method post

@url ${project_prefix}/data-recommendation/foods

@param {username(String), conditions(String), symptoms(String), treatments(String), date(String)}

@return Result

​	possibilities: OK ,WRONG  

   data: recommendation(String)

### history

@method post

@url ${project_prefix}/data-recommendation/history

@param {username(String)}

​	# need array json

@return Result

​	possibilities: OK ,WRONG  

   data: {conditions(String), symptoms(String), treatments(String), recommendation(String), date(DATE)}


## date-recommendation

### foods

@method post

@url ${project_prefix}/date-recommendation/foods

@param {username(String), number(int), foods(String), dates(String), date(String)}

@return Result

​	possibilities: OK ,WRONG  

   data: recommendation(String)

### history

@method post

@url ${project_prefix}/date-recommendation/history

@param {username(String)}

​	# need array json

@return Result

​	possibilities: OK ,WRONG  

   data: {foods(String), dates(String), recommendation(String), date(Date)}


## region-recommendation

### recipes

@method post

@url ${project_prefix}/region-recommendation/foods

@param {username(String), region(String), date(String)}

@return Result

​	possibilities: OK ,WRONG  

   data: recommendation(String)

### history

@method post

@url ${project_prefix}/region-recommendation/history

@param {username(String)}

​	# need array json

@return Result

​	possibilities: OK ,WRONG  

   data: {region(String), recommendation(String), date(Date)}