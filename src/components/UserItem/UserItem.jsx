import { Link } from "react-router-dom";
const UserItem = ({ firstName, lastName, userId, user }) => {
  console.log(user);
  return (
    <div className="flex h-20 xs:h-32 md:h-full w-10/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 text-white bg-purple-700 rounded-2xl p-2 justify-between items-center">
      {user?.image?.url ? (
        <img
          className="w-22 md:w-28 h-full rounded-2xl"
          src={user.image.url}
          alt="profile pic"
        />
      ) : (
        <img
          className="w-22 md:w-28 h-full rounded-2xl"
          src={require("./pfp.jpg")}
          alt="profile pic"
        />
      )}
      <p>
        {firstName} {lastName}
      </p>
      <Link to={`/user/${userId}`} className="flex space-x-2">
        <p>Click Here</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default UserItem;
