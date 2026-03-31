const AuthLeftPanel = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 sticky top-0 h-screen items-center justify-center bg-green-100 p-12 overflow-hidden relative">
      
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full border-4 border-green-300 opacity-40" />
      <div className="absolute -top-8 -left-8 w-72 h-72 rounded-full border-4 border-green-400 opacity-30" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full border-4 border-green-300 opacity-40" />
      <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full border-4 border-green-400 opacity-25" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-24 w-64 h-64 rounded-full border-[3px] border-green-500 opacity-20" />
      <div className="absolute top-10 right-16 w-20 h-20 rounded-full bg-green-300 opacity-30" />
      <div className="absolute bottom-16 left-10 w-14 h-14 rounded-full bg-green-400 opacity-25" />
      <div className="absolute top-1/3 left-6 w-8 h-8 rounded-full bg-green-500 opacity-20" />

      <img
        src="/login.png"
        alt="Auth illustration"
        className="max-w-full w-auto h-auto object-contain relative z-10"
      />
    </div>
  )
}

export default AuthLeftPanel