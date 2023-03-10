const url = "http://localhost:8000/api/v1"

export const userRegister = async(name,email,password) => {
    const res=await fetch(`${url}/register`,{
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
    const res = await fetch(`${url}/login`,{
        method : "post",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            email,password
        })
        
    })
    
    if(!res.ok) {
        const user =await res.json();
        return user
    }
    const token = await res.text();
    localStorage.setItem("token",token);
    return token
    
}

export const follow = async (id) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${url}/users/${id}/follow`,{
        method : "put",
        headers : {
            Authorization : `Baerer ${token}`
        }
    });
    if(!res.ok) return false;
    const user = res.json()
    return user;

}


export const verify = async() => {
    const token = localStorage.getItem("token")
    
    const res = await fetch(`${url}/users/verify`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    
    if(!res.ok) return false;
    const user = await res.json();
    
    return user;
}

export const getUser = async(handle) => {
    const res = await fetch(`${url}/users/${handle}`);
    if(!res.ok) return false
    const user =await res.json()
    return user ;
}