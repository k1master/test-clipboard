import { createContext, useState, useContext } from 'react'

const mContext = createContext(null)

export const JobProvider = ({ children }) => {
  const [payload, setPayload] = useState({
    search: '',
    sort: {}
  });
  return (
    <mContext.Provider
      value={{ payload, setPayload }}
    >
      {children}
    </mContext.Provider>
  );
};

export const useSearch = () => useContext(mContext);
