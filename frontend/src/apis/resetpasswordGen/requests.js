import endpoint from "./endpoint"
const {resetpasswordG }= endpoint;
const requests = {

  resetpasswordG: async(dataToSend ,id,token)=>{
    const {url,options} = resetpasswordG(dataToSend ,id,token);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },

};
export default requests;
