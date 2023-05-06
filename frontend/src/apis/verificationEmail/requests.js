import endpoint from "./endpoint"
const {verifyEmail }= endpoint;
const requests = {

  verifyEmail: async(dataToSend ,id)=>{
    const {url,options} = verifyEmail(dataToSend ,id);
    const response = await fetch(url,options);
    const data = await response.json();
    console.log(data);
  
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
