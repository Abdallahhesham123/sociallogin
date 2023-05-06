const messages = {
  required: "frontend: This field is required",
  email: (val) =>
    `frontend: your email : ${val}  is not correct please enter avalid mail`,
};

const rules = {
  required: (val) => (val ? "pass" : messages.required),
  email: (val) => {
    const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.test(val) ? "pass" : messages.email(val);
  },
};

const validator = {
  email: (val) => {
    return [rules.required(val), rules.email(val)];
  },
};

const validate = (email) => {
  const errors = { email: "" };
  errors.email = validator.email(email).find((y) => y !== "pass") || "";
  return { ...errors };
};

export default validate;
