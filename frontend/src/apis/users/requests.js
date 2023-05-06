import endpoint from "./endpoint"
const {getAll,getOneUser,deleteOnePost,addOnePost ,updateuser,resetpassword}= endpoint;
const requests = {
  getAll: async () => {
    const {url,options} = getAll();
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  getOneUser: async () => {
    const {url,options} = getOneUser();
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  deleteOnePost: async (id) => {
    const {url,options} = deleteOnePost(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  addOnePost: async(dataToSend)=>{
    const {url,options} = addOnePost(dataToSend);
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
  updateuser:async( updatedataToSend)=>{
    const {url,options} = updateuser( updatedataToSend);
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
  resetpassword: async(dataToSend)=>{
    const {url,options} = resetpassword(dataToSend);
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
