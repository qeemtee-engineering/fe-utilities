import jwt from 'jsonwebtoken';

const isTokenValid = token => {
  try {
    if (token && token !== 'undefined') {
      const decodedToken = jwt.decode(token, { complete: true });
      const dateNow = new Date();
      if (decodedToken.payload.exp * 1000 > dateNow.getTime()) {
        return true;
      }
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default isTokenValid;
