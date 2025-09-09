import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";

import React, { useState } from 'react'

const MyCollection = () => {
  const bgColor = "bg-gradient-to-r from-[#16C875] to-[#6CDFAB]";
  const username = "Thanh Phong";
  const userTag = "@ThanhPhong";
  const job = "Digital Artist"
  const bioLink = "www.biolinker.thanhphong.com";
  const avatar = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";

  const [activeTab, setActiveTab] = useState<'owned' | 'created' | 'collections' | 'activity' | 'insight' | 'more'>('created')
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'smallGrid'>('smallGrid')
  const tabs = [
    { key: 'owned', label: 'Owned (14)' },
    { key: 'created', label: 'Created (45)' },
    { key: 'collections', label: 'Collections (2)' },
    { key: 'activity', label: 'Activity' },
    { key: 'insight', label: 'Insight' },
    { key: 'more', label: 'More' },
  ]
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col px-10 ">
        <div className="flex flex-col gap-4 w-full my-10 rounded-t-2xl" >
            {/* thong tin user */}
            <div className="flex flex-row md:flex-row gap-16 w-full max-w-full px-6 py-6 ">
                <div className="flex-1 flex justify-start items-center">
                  {/* avatar user */}
                  <div className="mx-6">
                    <img
                      src={avatar}
                      alt="Template"
                      className="w-32 h-32 rounded-full border-2 shadow"
                    />
                  </div>

                  {/* name user */}
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-2 items-end">   
                      <h2 className="text-3xl font-bold max-w-screen-2xl text-start">{username} </h2>
                      <p className="text-black/80 font-bold font">{userTag}</p>
                    </div>
                    <p className="text-black/60">{job}</p>
                    <p className="text-black/60">{bioLink}</p>
                  </div>
                </div>

                <div className="flex-1 flex justify-center items-center "></div>
            </div>

            {/* Tabs */}
            <div className="w-full border-b border-white/10">
              <div className="w-full">
                <div className="flex items-center gap-10 w-full text-base sm:text-base border-b border-[#CAC6D2] px-4">
                  {tabs.map(t => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key as typeof activeTab)}
                      className={`relative py-4 font-helvetica font-bold  hover:text-[#111014] transition-colors ${activeTab === (t.key as typeof activeTab) ? 'text-[#111014]' : 'text-[#6D667F]'}`}
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

            {/* Controls row */}
            <div className="max-w-screen-2xl mx-auto w-full px-4 py-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0 w-2/3">
                {/* Filters button */}
                <button className="flex items-center gap-2 rounded-xl bg-[#F7F7FF] hover:bg-white/10 text-black px-4 py-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M6 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="font-medium">Filters</span>
                </button>

                {/* Search */}
                <div className="relative flex-1 min-w-[120px]  rounded-xl max-w-1/3 ">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <input
                    placeholder="Search by name"
                    className="w-1/2 bg-[#F7F7FF] border border-white/10 rounded-full py-3 pl-11 pr-4 placeholder-black text-black outline-none focus:border-white/20"
                  />
                </div>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <button className="flex items-center gap-2 bg-[#F7F7FF] hover:bg-gray-200 text-black rounded-xl px-4 py-3">
                  <span className="whitespace-nowrap">Recently received</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* View toggle */}
                <div className="flex items-center gap-2">
                  {/*Small Grid*/}
                  <button
                    onClick={() => setViewMode('smallGrid')}
                    className={`p-3 rounded-xl ${viewMode === 'smallGrid' ? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white"  : 'bg-[#F7F7FF] hover:bg-green1 text-black'}`}
                    aria-label="Grid view"
                  >
                    <svg width="25" height="25" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66642 4.3335C5.19366 4.3335 3.99975 5.51105 3.99975 6.96363L3.99977 11.4534C3.99977 12.906 5.19367 14.0835 6.66643 14.0835H10.6664C12.1392 14.0835 13.3331 12.906 13.3331 11.4534L13.3331 6.96363C13.3331 5.51105 12.1392 4.3335 10.6664 4.3335L6.66642 4.3335Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M25.3331 18.5835C26.8059 18.5835 27.9998 19.7611 27.9998 21.2136V25.7034C27.9998 27.1559 26.8059 28.3335 25.3331 28.3335H21.3331C19.8603 28.3335 18.6664 27.1559 18.6664 25.7034L18.6664 21.2136C18.6664 19.7611 19.8603 18.5835 21.3331 18.5835H25.3331Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M25.3331 4.3335C26.8058 4.3335 27.9998 5.51105 27.9998 6.96363L27.9998 11.4534C27.9998 12.906 26.8059 14.0835 25.3331 14.0835H21.3331C19.8603 14.0835 18.6664 12.906 18.6664 11.4534L18.6664 6.96363C18.6664 5.51105 19.8603 4.3335 21.3331 4.3335L25.3331 4.3335Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M6.66643 18.5835C5.19367 18.5835 3.99977 19.7611 3.99977 21.2136L3.99977 25.7034C3.99977 27.1559 5.19368 28.3335 6.66644 28.3335H10.6664C12.1392 28.3335 13.3331 27.1559 13.3331 25.7034L13.3331 21.2136C13.3331 19.7611 12.1392 18.5835 10.6664 18.5835H6.66643Z" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                  </button>

                  {/*Grid*/}
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl ${viewMode === 'grid'? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white" : 'bg-white/5 hover:bg-white/10 text-black'}`}
                    aria-label="Grid view"
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.866455 3.1332C0.866455 2.24955 1.5828 1.5332 2.46646 1.5332H5.66646C6.55011 1.5332 7.26646 2.24955 7.26646 3.1332V6.3332C7.26646 7.21686 6.55011 7.9332 5.66646 7.9332H2.46646C1.5828 7.9332 0.866455 7.21686 0.866455 6.3332V3.1332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M10.4665 3.1332C10.4665 2.24955 11.1828 1.5332 12.0665 1.5332H15.2665C16.1501 1.5332 16.8665 2.24955 16.8665 3.1332V6.3332C16.8665 7.21686 16.1501 7.9332 15.2665 7.9332H12.0665C11.1828 7.9332 10.4665 7.21686 10.4665 6.3332V3.1332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M20.0665 3.1332C20.0665 2.24955 20.7828 1.5332 21.6665 1.5332H24.8665C25.7501 1.5332 26.4665 2.24955 26.4665 3.1332V6.3332C26.4665 7.21686 25.7501 7.9332 24.8665 7.9332H21.6665C20.7828 7.9332 20.0665 7.21686 20.0665 6.3332V3.1332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M0.866455 12.7332C0.866455 11.8495 1.5828 11.1332 2.46646 11.1332H5.66646C6.55011 11.1332 7.26646 11.8495 7.26646 12.7332V15.9332C7.26646 16.8169 6.55011 17.5332 5.66646 17.5332H2.46646C1.5828 17.5332 0.866455 16.8169 0.866455 15.9332V12.7332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M10.4665 12.7332C10.4665 11.8495 11.1828 11.1332 12.0665 11.1332H15.2665C16.1501 11.1332 16.8665 11.8495 16.8665 12.7332V15.9332C16.8665 16.8169 16.1501 17.5332 15.2665 17.5332H12.0665C11.1828 17.5332 10.4665 16.8169 10.4665 15.9332V12.7332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M20.0665 12.7332C20.0665 11.8495 20.7828 11.1332 21.6665 11.1332H24.8665C25.7501 11.1332 26.4665 11.8495 26.4665 12.7332V15.9332C26.4665 16.8169 25.7501 17.5332 24.8665 17.5332H21.6665C20.7828 17.5332 20.0665 16.8169 20.0665 15.9332V12.7332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M0.866455 22.3332C0.866455 21.4496 1.5828 20.7332 2.46646 20.7332H5.66646C6.55011 20.7332 7.26646 21.4496 7.26646 22.3332V25.5332C7.26646 26.4169 6.55011 27.1332 5.66646 27.1332H2.46646C1.5828 27.1332 0.866455 26.4169 0.866455 25.5332V22.3332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M10.4665 22.3332C10.4665 21.4496 11.1828 20.7332 12.0665 20.7332H15.2665C16.1501 20.7332 16.8665 21.4496 16.8665 22.3332V25.5332C16.8665 26.4169 16.1501 27.1332 15.2665 27.1332H12.0665C11.1828 27.1332 10.4665 26.4169 10.4665 25.5332V22.3332Z" stroke="currentColor" stroke-width="1.33333"/>
                      <path d="M20.0665 22.3332C20.0665 21.4496 20.7828 20.7332 21.6665 20.7332H24.8665C25.7501 20.7332 26.4665 21.4496 26.4665 22.3332V25.5332C26.4665 26.4169 25.7501 27.1332 24.8665 27.1332H21.6665C20.7828 27.1332 20.0665 26.4169 20.0665 25.5332V22.3332Z" stroke="currentColor" stroke-width="1.33333"/>
                    </svg>
                  </button>

                  {/*List*/}
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl ${viewMode === 'list'? "bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white" : 'bg-white/5 hover:bg-white/10 text-black'}`}
                    aria-label="List view"
                  >
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.95997 1.3335H26.1333M8.95997 9.9735H26.1333M8.95997 18.6135H26.1333M2.1333 1.3335V1.35056M2.1333 9.9735V9.99056M2.1333 18.6135V18.6306" stroke="currentColor" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  </button>
                </div>
              </div>


            </div>

            {/* Content area placeholder */}
            <div className="max-w-screen-2xl mx-auto w-full px-4 pb-10">
              <div className="rounded-2xl border border-white/10 bg-white/5 min-h-[420px] flex items-center justify-center text-black">
                Content for {activeTab}
              </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>    
  )
}

export default MyCollection
