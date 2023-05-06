const endpoints ={
    


    verifyEmail:(dataToSend ,id)=>{
                    return {
                        url : `/auth/verify-email/${id}/${dataToSend}`,
                        options:{
                            method: 'POST',
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                              },
                        }
                    }

                },

}

export default endpoints;