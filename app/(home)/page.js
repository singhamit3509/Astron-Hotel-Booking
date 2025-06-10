
export default function Home() {
  return (
    <>
      <section>
        
        <div className="h-screen bg-[url(/bg-astron.png)] bg-cover">
          <div className="flex items-center justify-center gap-2 ">
            <div className="w-[20%] border-[1px] border-zinc-600"></div>
            <div className="text-3xl ">Hotel Booking</div>
            <div className="w-[20%] border-[1px] border-zinc-600"></div>
          </div>
          <div className="flex items-center justify-center hover:text-green-900 hover:cursor-pointer">
            <h2 className="text-xl">
              There's is Nothing More Enjoyable Than a Hotel Room View
            </h2>
          </div>

          <div className="Cards flex justify-center items-center w-full h-[50%] mt-8 px-20">
            <div className="flex items-center justify-center w-full h-full gap-5">
            <div className="Card bg-amber-700 w-100 h-[90%] overflow-hidden">
              <img className="bg-cover h-full" src="/img1.jpg" alt=""/>
            </div>
            <div className="Card bg-amber-700 w-100 h-[90%] overflow-hidden">
              <img className="bg-cover h-full" src="/img2.jpg" alt=""/>
            </div>
            <div className="Card bg-amber-700 w-100 h-[90%] overflow-hidden">
              <img className="bg-cover h-full" src="/img3.jpg" alt=""/>
            </div>
            <div className="Card bg-amber-700 w-100 h-[90%] overflow-hidden">
              <img className="bg-cover h-full" src="/img4.jpg" alt=""/>
            </div>
            <div className="Card bg-amber-700 w-100 h-[90%] overflow-hidden">
              <img className="bg-cover h-full" src="/img5.jpg" alt=""/>
            </div>
            <div className="Card bg-amber-700 w-100 h-[90%] overflow-hidden">
              <img className="bg-cover h-full" src="/img6.jpg" alt=""/>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
