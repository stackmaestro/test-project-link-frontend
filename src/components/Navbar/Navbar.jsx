import { useAtom } from "jotai";
import { userAtom } from "../../store/store";
import { Link, Navigate } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="container-full md:w-10/12 my-2 py-2 mx-auto bg-white rounded-2xl flex justify-between items-center px-5 sm:px-20">
      <div className="flex space-x-2">
        <div className="text-purple-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">devlinks</h1>
        </div>
      </div>
      <div className="flex space-x-5 text-sm md:text-lg">
        {user && (
          <>
            {" "}
            <Link to="/links">Links</Link>
          </>
        )}
        <Link to="/profile">Profile Details</Link>
      </div>

      <button className="w-28 md:w-32 rounded-lg border border-purple-700 p-3 md:text-lg font-medium">
        Preview
      </button>
    </div>
  );
};

export default Navbar;
