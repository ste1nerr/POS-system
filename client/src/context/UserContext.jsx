import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/menu/${user.menu_id}`)
        .then(({ data }) => {
          setMenu(data.menu);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, menu }}>
      {children}
    </UserContext.Provider>
  )
}