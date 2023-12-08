import { useState } from "react";
import authImage from "../assets/auth.png";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

function Auth() {
  const [view, setView] = useState("signin");

  const handleView = () => {
    setView("signin")
  }

  return (
    <>
      <div className="flex w-full h-[calc(100vh-80px)] select-none bg-gray-200">
        {/* Left Pane */}
        <div className="hidden lg:flex items-center justify-center flex-1 bg-marine text-gray-900">
          <div className="max-w-md text-center">
            <img fill="true" src={authImage} alt="auth"></img>
          </div>
        </div>

        {/* Right Pane */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            {view === "signin" ? (
              <>
                <SignIn />
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    Não tem uma conta?
                    <button
                      onClick={() => setView("signup")}
                      className="font-semibold ml-2 hover:text-marine text-gray-900 hover:underline"
                    >
                      Cadastre-se
                    </button>
                  </p>
                </div>
              </>
            ) : view === "signup" && (
              <>
                <SignUp handleView={handleView} />
                <div className="mt-4 text-sm text-gray-600 text-center">
                  <p>
                    Já tem uma conta?
                    <button
                      onClick={() => setView("signin")}
                      className="font-semibold ml-2 hover:text-marine text-gray-900 hover:underline"
                    >
                      Entre já
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;