

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

export function createPost(userId,post) {
    return fetch(`http://localhost:8080/post/new/${userId}`, {
      method: "POST",
      headers: {
       
        Authorization: `Bearer ${isAuth().token}`,

      },
      body: post,
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  export function updatePostl(userId,post) {
    return fetch(`http://localhost:8080/post/update/${userId}`, {
      method: "PUT",
      headers: {
       
        Authorization: `Bearer ${isAuth().token}`,

      },
      body: post,
    })
      .catch((err) => {
        console.log(err);
      });
  }


export const getPosts=()=>{
 return fetch(`http://localhost:8080/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
       .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
}