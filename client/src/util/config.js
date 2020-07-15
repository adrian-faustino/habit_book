// this will be used in all requests to routes protected by auth
export const config = {
  headers: {
    authorization : `Bearer ${localStorage.accessToken}`
  }
};

// this will be used in all delete requests to routes protected by auth
export const headers = {
  authorization: `Bearer ${localStorage.accessToken}`
};