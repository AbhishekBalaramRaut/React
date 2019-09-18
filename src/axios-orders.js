import axios from "axios";

const instance = axios.create({
    baseURL : "https://my-burger-project-dc13b.firebaseio.com/"
});

instance.defaults.headers.common['Authorization'] = "Auth Token Axios.js";
instance.defaults.headers.post['Content-Type'] = "application/json";

export default instance;