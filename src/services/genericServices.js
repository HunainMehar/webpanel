import jwtDecode from "jwt-decode";

export class genericService {
  isLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    }
    return false;
  };
  getUserInfo = () => {
    let result = localStorage.getItem("token");
    if (result) {
      return jwtDecode(result);
    } else {
      console.log("No token found");
    }
  };
  getToken = () => {
    return localStorage.getItem("token");
  };
}

let gS = new genericService();
export default gS;
