const endpoints ={
    

    getAll :()=>{
            return {

                url : `/user/`,
                options:{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            }
                
                    },
    getOneUser :()=>{
        return {

            url : `/user/getProfile/`,
            options:{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        }
            
                },
    deleteOnePost :(id)=>{
        return {

            url : `/posts/${id}`,
            options:{
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            }
        }
            
                },
                addOnePost:(dataToSend)=>{
                    return {
                        url : `/posts/`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {'Content-Type': 'application/json'},
                        }
                    }

                },
                updateuser:(updatedataToSend)=>{
                    return {
                        url : `/user/findByIdAndUpdate`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(updatedataToSend),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            },
                        }
                    }

                },
                resetpassword:(dataToSend)=>{
                    return {
                        url : `/auth/resetpassword`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(dataToSend),
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                              },
                        }
                    }

                },
}

export default endpoints;