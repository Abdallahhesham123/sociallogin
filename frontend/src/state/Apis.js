import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("token"))
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/auth/login", formData);
export const signUp = (formData) => API.post("/auth/register", formData );
export const googleSignIn = (result) => API.post("/auth/googleSignIn", {
  googleAccessToken:result
});
export const facebookSignIn = (result) => API.post("/auth/facebookSignIn", result);

export const GithubSignIn = (result) => API.post("/auth/GithubSignIn", result);


// export const createTour = (tourData) => API.post("/tour", tourData);
// export const getTours = (page) => API.get(`/tour?page=${page}`);
// export const getTour = (id) => API.get(`/tour/${id}`);
// export const deleteTour = (id) => API.delete(`/tour/${id}`);
// export const updateTour = (updatedTourData, id) =>
//   API.patch(`/tour/${id}`, updatedTourData);
// export const getToursByUser = (userId) => API.get(`/tour/userTours/${userId}`);

// export const getToursBySearch = (searchQuery) =>
//   API.get(`/tour/search?searchQuery=${searchQuery}`);

// export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);
// export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
// export const likeTour = (id) => API.patch(`/tour/like/${id}`);