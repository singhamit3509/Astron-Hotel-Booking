import React from 'react'

function signup() {
  return (
    <div>
         <>
        <div className="flex items-center justify-center bg-zinc-100">
        <div className="bg-white p-8  rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold text-centre mb-5 text-zinc-700">
            SignUp
          </h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Enter Email Id"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>


            <div>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>


            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter City"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Enter Full Address"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>

            <div>
              <input
                type="number"
                maxLength="10"
                placeholder="Contact Number"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>


            <div>
              <button className="w-full bg-zinc-700 text-white py-2 rounded hover:bg-zinc-800">
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
        </>
    </div>
  )
}

export default signup