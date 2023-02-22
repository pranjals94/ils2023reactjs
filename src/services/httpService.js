import axios from "axios";
//import logger from "./logService";
import { toast } from "react-toastify";

//401 Unauthorized
//403 Forbidden
//404 Not Found
//500 Internal Server Error
const showError = (error) => {
  let message = ""
  if(error.response.status === 403){
    message = "You are not authorized to access this resource. Please try login."
  }else if(error.response.status === 401){
    message = "You do not have permission to access this resource."
  }else if(error.response.status === 404){
    message = "Resource you are looking for is not found in the server."
  }else if(error.response.status === 500){
    message = "Opps. Some error has occured in the server."
  }else{
    message = "Opps. Some error has occured in the server."
  }
  toastify(message)
}
const toastify = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });        
}
axios.interceptors.request.use(
  config => {
    document.body.classList.add('loading');
    return config
  },
  error => {
    document.body.classList.add('loading');
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if(expectedError){
      showError(error)
    }else{
      toastify("An unexpected error occurrred.");
    }
    Promise.reject(error)
  }
)

axios.interceptors.response.use(response => {
    document.body.classList.remove('loading');
    return response
  }, error => {
    document.body.classList.remove('loading');
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if(expectedError){
      showError(error)
    }else{
      toastify("An unexpected error occurrred.");
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
