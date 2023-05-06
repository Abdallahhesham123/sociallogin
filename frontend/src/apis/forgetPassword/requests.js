import endpoint from "./endpoint"
const {sendingemail }= endpoint;
const requests = {

  sendingemail: async(dataToSend)=>{
    const {url,options} = sendingemail(dataToSend);
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
