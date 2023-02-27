const url = "http://localhost:8000/api/v1"

export const userRegister = async(name,email,password) => {
    const res=await fetch(`${url}/users/register`,{
        method : "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            name,email,password
        })
    })
    const user = await res.json();
    
    return user;
}

export const userLogin = async(email,password) => {
    const res = await fetch(`${url}/users/login`,{
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            email,password
        })
        
    })
    const user =res.json()
    return user ;
}