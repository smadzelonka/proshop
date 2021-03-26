const USERURL = "http://localhost:5000/api/users/login";
const URL = "http://localhost:5000/api/users";
// const URL =
//   process.env.NODE_ENV === "production"
//     ? "https//seansshop.herokuapp.com/api/users"
//     : "http://localhost:5000/api/users";

class AuthModel {
  static register = (data) => {
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  static login = (data) => {
    return fetch(`${URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };

  // daltons need to rewatch this
  static verify = () => {
    return fetch(USERURL, {
      method: "GET",
      // add header authorization with token
      headers: {
        authorization: `Bearer ${localStorage.uid}`,
        // for session based auth
        // withCredientials: true
      },
    }).then((response) => response.json());
  };

  static editUser = ({ name, email, password }) => {
    return fetch(`${URL}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.uid}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((response) => response.json());
  };

  static getUsers = (data) => {
    return fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };
}

export default AuthModel;
