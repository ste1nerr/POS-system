// import { createContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export const MenuContext = createContext({});

// export function MenuContextProvider({ children, id }) {
//   const [menu, setMenu] = useState(null);

//   useEffect(() => {
//     if (!menu) {
//       axios.get(`/menu/${id}`).then(({ data }) => {
//         setMenu(data);
//       });
//     }
//   }, [id]);

//   return (
//     <MenuContext.Provider value={{ menu, setMenu }}>
//       {children}
//     </MenuContext.Provider>
//   );
// }