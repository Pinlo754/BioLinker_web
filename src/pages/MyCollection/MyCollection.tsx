import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";

import React, { useState } from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { LuUpload } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import Analytics from "./Tags/Analytics/Analytics";
import Collection from "./Tags/Collection/Collection";
type TabKey = 'collections' | 'insight' ;

const MyCollection = () => {
  const [count, setCount] = useState(0);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [activeTab, setActiveTab] = useState<'collections' | 'insight'>('collections')

  const tabs = [
    { key: 'collections', label: `Bộ sưu tập (${count})` },
    { key: 'insight', label: 'Phân tích' },
  ]
  const handleCountChange = (newCount: number) => {
    setCount(newCount);
  };
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />                   
      <main className="flex-1 flex flex-col  relative">
        <div className="w-full">
          <img src={user.backgroundImage} alt="Template" className="w-full h-[600px] object-cover" />
        </div>
        <div className="flex flex-col flex-1 px-10 absolute top-[320px] left-0 right-0" >
          <div className="w-full  gap-4 w-full mt-10 rounded-t-2xl  bg-white">
            {/* thong tin user */}
            <div className="flex flex-row md:flex-row gap-16 w-full max-w-full px-12 py-6 justify-between ">

              {/* author information */}
              <div className="flex-1 flex justify-start items-center">

                {/* avatar user */}
                <div className="mx-6">
                  <img
                  src={user.userImage}
                  alt="Template"
                  className="w-40 h-40 rounded-full border-2 shadow"
                  />
                </div>

                {/* name user */}
                <div className="flex flex-col gap-6">
                  <div className="flex flex-row gap-2 items-end">   
                    <h2 className="text-3xl font-bold max-w-screen-2xl text-start">{user.fullName} </h2>
                    <p className="text-black/80 font-bold font">{user.userTag}</p>
                  </div>
                  <p className="text-black/60">{user.job}</p>
                  <a href={`/biolinker/${user.customerDomain}`} className="text-emerald-500 underline">{`biolinker.io.vn/biolinker/${user.customerDomain}`}</a>
                </div>
              </div>

              {/* follower & media information */}
              <div className="flex-1 flex justify-end items-end flex-col gap-6 px-6 pt-6">
                <div className="flex flex-col gap-6 align-top min-w-[320px] px-4">
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-black/60">Lượt theo dõi</p>
                    <p className="text-black/60">{ user.followers ? user.follower : 0}</p>
                  </div>
                  <div className="flex flex-row  justify-between items-center">
                    <p className="text-black/60">Đang theo dõi</p>
                    <p className="text-black/60">{ user.followings ? user.followings : 0}</p>
                  </div>
                  <div className="flex flex-row gap-4 justify-between items-center">
                    <div className="flex items-center gap-4">
                      <button>{FaFacebookF({ className: "w-5 h-5 text-gray-600" })}</button>
                      <button>{FaTwitter({ className: "w-5 h-5 text-gray-600" })}</button>
                      <button>{FaInstagram({ className: "w-5 h-5 text-gray-600" })}</button>  
                    </div>
                    <div className="flex items-center flex-row gap-4">
                      <button>{LuUpload({ className: "w-5 h-5 text-gray-600" })}</button>
                      <button>{BsThreeDots({ className: "w-5 h-5 text-gray-600" })}</button>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white rounded-full px-4 py-2 w-full mt-4 ">Theo dõi</button>
                </div>          
              </div>
            </div>

            {/* main content*/}
            <div className="w-full">
              {/* Tabs */}
              <div className="w-full border-b border-white/10">
                <div className="w-full">
                  <div className="flex items-center gap-10 w-full text-base sm:text-base border-b border-[#CAC6D2] px-10">
                    {tabs.map(t => (
                      <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key as typeof activeTab)}
                        className={`relative py-4 font-helvetica font-bold text-xl hover:text-[#111014] transition-colors ${activeTab === (t.key as typeof activeTab) ? 'text-[#111014]' : 'text-[#6D667F]'}`}
                      >
                        {t.label}
                        {activeTab === (t.key as typeof activeTab) && (
                          <span className="absolute -bottom-[1px] left-0 right-0 h-[3px] bg-blue-500 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {activeTab === 'collections' ? (
                <Collection onCountChange={handleCountChange} />
              ) : (
                <Analytics />
              )} 
            </div>
          </div>
          <Footer/> 
        </div>
      </main>       
    </div>    
  )
}

export default MyCollection
