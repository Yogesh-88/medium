import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/register");
  }

  return (
    <div className="bg-yellow-50">
      <div className=" border-b border-black-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900">Medium</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Sign In
              </button>

              <Button
                onClick={handleRegister}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center">
          <h1 className="text-8xl font-semibold text-gray-800">
            Human
            <br /> stories & ideas
          </h1>
          <p className="mt-5 text-lg text-gray-500">
            A place to read, write, and deepen your understanding
          </p>
          <Button
            onClick={handleRegister}
            className="mt-5 bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
          >
            Start reading
          </Button>
        </div>
      </div>
    </div>
  );
}
