
const jwt = require('jsonwebtoken');
const { resolve } = require('path');

const obj ={
    'api_access_list' : [
        {
            'api_no' : 1,
            'user_types' : ['ambulance']
        },
        {
            'api_no' : 2,
            'user_types' : ['user']
        }
    ]
} 

function check_authorization(api_no , user_type){
    var value = false
    const availability = new Promise((resolve) => {
        var newArray = obj.api_access_list.filter(function (el)
    { 
        if(el.api_no == api_no ){
            resolve(el.user_types.includes(user_type) )
            value = el.user_types.includes(user_type)
            return

        }
    }
    );
    })
    return value 
}

function getDecode(req){
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const response = new Promise((resolve) =>{
        try {
            const token = req.header(tokenHeaderKey);
            if (token == null){
                const response = {
                    "status" : "error",
                    "massage" : error,
                    "verified": false
                }
                resolve(response)
            }
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            console.log(jwt.decode(token))
            const response = {
                "status" : "success",
                "massage" : "verified",
                "verified": true,
                "token" : jwt.decode(token)
            }
            resolve(response);
        }else{
            const response = {
                "status" : "error",
                "massage" : error,
                "verified": false
            }
            resolve(response)
        }
    } catch (error) {
        const response = {
            "status" : "error",
            "massage" : error,
            "verified": false
        }
        resolve(response);
    }
    })
    return response
}

module.exports =async function authenticate(req , api_no){
    const response =await getDecode(req)
    console.log(response)
    if(response.verified){
        var condition =await check_authorization(api_no , response.token.userType)
        console.log("condition ",condition)
        if(condition){
            return {
                "condition" : true,
                "userId" : response.token.userId
            }
        }
        else{
            return {
                "condition" : false,
                "userId" : null
            }
        }
    }
    return {
        "condition" : false,
        "userId" : null
    }
}