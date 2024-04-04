const create = async (user) => {
    try {
      let response = await fetch("/api/users/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  const list = async (signal) => {
    try {
      let response = await fetch("/api/users/", {
        method: "GET",
        signal: signal,
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const read = async (params, credentials, signal) => {
    try {
      let response = await fetch("/api/users/" + params.userId, {
        method: "GET",
        signal: signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const update = async (params, credentials, user) => {
    try {
      let response = await fetch("/api/users/" + params.userId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const remove = async (params, credentials) => {
    try {
      let response = await fetch("/api/users/" + params.userId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + credentials.t,
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };
  const getUsersByUsertype = async (usertype) => {
    try {
      let response = await fetch(`/api/users/usertype/${usertype}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users by usertype");
      }
      const data = await response.json();
      console.log("Fetched users:", data); // Add this line for debugging
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  

export { create, list, read, update, remove, getUsersByUsertype };
  