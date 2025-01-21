// eslint-disable-next-line react/prop-types
const AuthLayout = ({children}) => {
    return (
      <div className="bg-white min-h-screen flex justify-center items-center text-black">
          <div className="max-w-xl mx-auto p-5 w-full">
            {children}
          </div>
      </div>
    )
  }
  
  export default AuthLayout;