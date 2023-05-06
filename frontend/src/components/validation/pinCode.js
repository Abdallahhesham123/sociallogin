const messages = {
    required: "frontend: This code field is required, try again",
    firstNameError: () =>
      `frontend: all field must be One Digit`,

  };

  const rules = {
    required: (val) => (val ? "pass" : messages.required),

    number: (val) =>{
        const number = /^[0-9]{1}$/;
        return(

          number.test(val) ? "pass" :messages.firstNameError()

        )
    }
  };
  
  const validator = {

    number: (val) => {
        return [
          rules.required(val),
          rules.number(val),
       
        ];
      }
 
  };




const validate = ( f1 ,f2 ,f3 ,f4) => {
    const errors = {  f1: 0 , f2: 0 , f3: 0 , f4: 0 };
    
    errors.f1 = validator.number(f1).find((y) => y !== "pass") || "";
    errors.f2 = validator.number(f2).find((y) => y !== "pass") || "";
    errors.f3 = validator.number(f3).find((y) => y !== "pass") || "";
    errors.f4 = validator.number(f4).find((y) => y !== "pass") || "";

    return {  ...errors};
  };
  
  export default validate;