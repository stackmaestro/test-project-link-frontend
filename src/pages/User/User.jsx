import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGithub,
  BsYoutube,
  BsFacebook,
  BsLinkedin,
  BsInstagram,
} from "react-icons/bs";
import { useAtom } from "jotai";
import { userAtom, linksAtom } from "../../store/store";

import LinkButton from "../../components/LinkButton/LinkButton";

const LINK_TYPES = {
  YouTube: { color: "bg-[#c4302b]", icon: <BsYoutube size={30} /> },
  Facebook: { color: "bg-[#3b5998]", icon: <BsFacebook size={30} /> },
  GitHub: { color: "bg-[#151013]", icon: <BsGithub size={30} /> },
  Instagram: { color: "bg-[#4f5bd5]", icon: <BsInstagram size={30} /> },
  LinkedIn: { color: "bg-[#0072b1]", icon: <BsLinkedin size={30} /> },
};

const User = () => {
  const { userId } = useParams();
  const [userLinks, setUserLinks] = useAtom(linksAtom);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        let res = await fetch(`http://localhost:5000/api/v1/user/${userId}`);
        if (res.ok) {
          let data = await res.json();
          console.log("User (User.jsx): ", data);
          setUser(data);
        } else {
          console.log("error: ", res);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const getUserLinks = async () => {
      try {
        let res = await fetch(`http://localhost:5000/api/v1/links/${userId}`);
        if (res.ok) {
          let data = await res.json();
          console.log("Links (User.jsx): ", data);
          setUserLinks(data);
        } else {
          console.log("error: ", res);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
    getUserLinks();
  }, [userId, setUser, setUserLinks]);
  return (
    <div className="w-80 sm:w-96 flex flex-col items-center mx-auto rounded-2xl bg-white">
      <div className="user-details flex flex-col items-center space-y-24">
        {user?.image?.url ? (
          <img
            className="h-32 w-32 rounded-full border-4 border-purple-700 mt-5"
            src={user.image.url}
            alt="user-pfp"
          />
        ) : (
          <img
            className="h-32 w-32 rounded-full border-4 border-purple-700 mt-5"
            src={require("../../components/UserItem/pfp.jpg")}
            alt="user-pfp"
          />
        )}
        <div className="flex flex-col items-center space-y-5">
          <h2 className="font-bold text-3xl">
            {user && `${user.firstName} ${user.lastName}`}
          </h2>
          <p className="font-light text-sm">{user && user.email}</p>
        </div>
      </div>
      <div className="link-details w-full flex flex-col items-center space-y-10 my-6">
        {userLinks &&
          userLinks.map((link, _) => {
            let linkObj = LINK_TYPES[link.platform];
            if (linkObj !== undefined) {
              return (
                <LinkButton
                  key={_}
                  color={linkObj.color}
                  platform={link.platform}
                  logo={linkObj.icon}
                />
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default User;
