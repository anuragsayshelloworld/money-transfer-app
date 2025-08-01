import React, { useEffect, useState } from "react"
import UserInfo from "../components/userInfo";
import Khutruke from "../components/Khutruke";
import SearchComponent from "../components/Search";
import FavnNot from "../components/FavnNot";
import Actions from "../components/Actions";
import PropTypes from "prop-types";

export default function CustomerDashboardLayout({children}){
    const [isLoading, setIsloading] = useState(true);
    
    useEffect(()=>{
     setTimeout(()=>{
      setIsloading(false); 
     },3000) 
    },[]);

    return <div className="flex bg-gray-800 h-screen w-screen">
             {!isLoading ? 
              (
              <>
              <div className="flex flex-col h-full w-1/4 gap-4 shadow-md border-r border-gray-600">
                  <div className="h-1/2"><Khutruke/></div>
                  <div className="h-1/2"><UserInfo/></div>
              </div>

              <div className="flex flex-col w-1/2 h-full">
                  <div className="flex h-24 justify-center"><SearchComponent /></div>
                  <div className="flex flex-col flex-1 justify-end gap-8">
                       <div className="flex justify-center">{children}</div>
                       <div><Actions/></div>
                  </div>
              </div>

              <div className="flex w-1/4 h-full">
                  <div className="flex"><FavnNot/></div>
              </div>
              </>
               ) 
               : 
               (
              <div className="flex items-center justify-center h-full w-full">
                  <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-l-white border-r-white rounded-full animate-spin"></div>
                  <p className="text-white text-lg tracking-wide animate-pulse">Loading the page...</p>
                </div> 
              </div>
               )
               }
           </div>
}

CustomerDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
