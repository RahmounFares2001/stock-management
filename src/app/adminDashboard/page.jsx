import React from 'react'


// components
import DashboradHeader from '../components/layouts/DashboradHeader'
import { StockChart } from '../components/adminDashboard/dashboard/StockChart'
import { TotalStockChart } from '../components/adminDashboard/dashboard/TotalStockChart'




export default function page() {

  return (
    <section>
      <DashboradHeader currentPage= "Dashboard" />


      {/* charts */}
      <div className='px-10 py-10 flex flex-col gap-10 bg-gray-100' >

        <div className='w-full h-80 flex gap-10 justify-center' > 
          <StockChart />
          <StockChart />
          <StockChart />
        </div>

        <TotalStockChart />
      </div>
        

    </section>
   
  )
}
