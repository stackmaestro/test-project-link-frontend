import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { linksAtom, userAtom } from "../../store/store";
// import Links from "./Link/Links";
import Link from "../../components/Link/Link";

const Links = () => {
  const [links, setLinks] = useAtom(linksAtom);
  const [user, _] = useAtom(userAtom);
  const [platforms, setPlatforms] = useState([
    "YouTube",
    "LinkedIn",
    "GitHub",
    "Instagram",
    "Facebook",
  ]);

  const tempPlatform = [
    "YouTube",
    "LinkedIn",
    "GitHub",
    "Instagram",
    "Facebook",
  ];

  const handleAddNewLinkButton = () => {
    let temp = [...links];
    console.log(temp.some((link) => link.platform === ""));
    if (
      !temp.some((link) => link.platform === "") &&
      temp.length < tempPlatform.length
    ) {
      temp.push({ platform: "", link: "" });
      setLinks(temp);
    }
  };

  const handleRemoveLinkButton = (linkPlatform) => {
    const temp = links.filter((link) => {
      return link.platform !== linkPlatform;
    });
    setLinks(temp);

    const filteredPlatforms = tempPlatform.filter((platform) => {
      return !temp.some((obj) => obj.platform === platform);
    });
    setPlatforms(filteredPlatforms);
  };

  const handleEachLinkDataUpdate = (object, index) => {
    let temp = [...links];
    temp[index] = object;
    setLinks(temp);

    const filteredPlatforms = tempPlatform.filter((platform) => {
      return !temp.some((obj) => obj.platform === platform);
    });
    setPlatforms(filteredPlatforms);
  };

  const handleSaveLinks = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, links }),
    };

    console.log("LinksS: ", links);
    try {
      let res = await fetch(
        "http://localhost:5000/api/v1/links",
        requestOptions
      );
      let data = await res.json();
      if (res.ok) {
        console.log("Sucess (POST): ", data);
        setLinks(data);
      } else {
        console.log("Error: ", res);
      }
    } catch (error) {
      console.log("Error (ACT):", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="px-5 space-y-5 max-w-5xl">
        <div className="space-y-3">
          <h3 className="text-3xl text-left font-extrabold">
            Customize Your Link
          </h3>
          <p className="pr-10 text-sm text-gray-600">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>
        <button
          className="border border-purple-500 rounded-md w-full py-2 font-semibold text-purple-600"
          onClick={() => handleAddNewLinkButton()}
        >
          + Add new link
        </button>
        {links &&
          links.map((link, index) => {
            return (
              <Link
                key={link.platform}
                count={index}
                link={link}
                handleRemoveLinkButton={handleRemoveLinkButton}
                handleEachLinkDataUpdate={handleEachLinkDataUpdate}
                platforms={platforms}
              />
            );
          })}
      </div>
      <button
        onClick={handleSaveLinks}
        className="mt-10 bg-purple-800 text-white w-32 h-12 rounded-lg hover:bg-white hover:text-purple-800 hover:border hover:border-purple-800 transition"
      >
        Save
      </button>
    </div>
  );
};

export default Links;
