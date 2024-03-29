import axios from "axios";
import store from "../store/index";

const api = axios.create({
  baseURL: "https://deepshoes.up.railway.app/",
});

const tokenChange = (token = store.state.auth.usuario.access) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

const cleanToken = () => {
  api.defaults.headers.common["Authorization"] = "";
};

export { api, tokenChange, cleanToken };
