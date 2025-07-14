import React from "react"

export default function CustomerDashboardLayout(){
    return <div className="flex bg-gray-800 h-screen w-screen">

              <div className="flex flex-col border border-blue-50 h-full w-1/4">
                  <div className="border border-blue-50 h-1/2">{/*Here will be khutruke*/}</div>
                  <div className="border border-blue-50 h-1/2">{/*Here will be userinfo and logout*/}</div>
              </div>

              <div className="flex flex-col w-1/2 h-full border border-blue-50">
                  <div className="flex h-24 border border-blue-50">{/*Here will be search*/}</div>
                  <div className="flex flex-1 border border-blue-50">{/*Main Content*/}</div>
              </div>

              <div className="flex flex-col w-1/4 h-full border border-blue-50">
                  <div className="flex border border-blue-50 h-56">{/*here will be heropage*/}</div>
                  <div className="flex flex-1 border border-blue-50">{/*here will be Menu*/}</div> 
              </div>

           </div>
}