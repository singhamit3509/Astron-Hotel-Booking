import React from 'react'

function login() {
  return (
    <div className="flex items-center justify-center bg-zinc-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold text-centre mb-5 text-zinc-700">
            Login
          </h3>
          <div >
            <form className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter Email Id"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-500"
                required
              />
            </div>
            <div>
              <input type="submit" className="w-full bg-zinc-700 text-white py-2 rounded hover:bg-zinc-800" value="Login"/>
            </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default login