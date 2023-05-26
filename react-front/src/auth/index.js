import { AuthContext } from "../AuthContext";
import { useContext } from "react";

export function signup(user) {
  return fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function signin(user) {
  return fetch("http://localhost:8080/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function authenticate(jwt, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    localStorage.setItem("auth", true);

    next();
  }
}
export const DelUser = id => {
return fetch(`http://localhost:8080/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${isAuth().token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const Signout = () => {

  if (typeof window !== "undefined") {
    window.localStorage.clear()
    }
  return fetch("http://localhost:8080/signout", {
    method: "GET",
  })
    .then((response) => {
      console.log("signout", response);
            return response.json();
    })
    .catch((err) => console.log(err));
};
export const Logout = () => {
  const { logout } = useContext(AuthContext);

  if (typeof window !== "undefined") {
    window.localStorage.clear()
    }
  return fetch("http://localhost:8080/signout", {
    method: "GET",
  })
    .then((response) => {
      console.log("signout", response);
      logout();
            return response.json();
    })
    .catch((err) => console.log(err));
};
export const isAuth = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const follow = (followId, token, userId) => {
  return fetch("http://localhost:8080/follow", {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
       Authorization: `Bearer ${isAuth().token}`,
     },
     body: JSON.stringify({userId,followId}),
   }).then((res) =>  res.json())
 };