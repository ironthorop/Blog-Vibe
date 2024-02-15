
import React,{createContext, useState} from 'react'

export const DataContext = createContext(null);



const DataProvider = ({children}) => {
    const [account, setAccount] = useState("");
    const [mode, setMode] = useState('white');
  return (
    
   <DataContext.Provider value={{
   account,
   setAccount,
   mode,
   setMode,
   }}>
   {children}
   </DataContext.Provider>
  )
}

export default DataProvider