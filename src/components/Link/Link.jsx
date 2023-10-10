import { useState } from "react";
import { BsGithub, BsLink45Deg } from "react-icons/bs";

const Link = ({
  count,
  link,
  handleRemoveLinkButton,
  handleEachLinkDataUpdate,
  platforms,
}) => {
  const [selectedLink, setSelectedLink] = useState(link.link);
  const [selectedPlatform, setSelectedPlatform] = useState(link.platform);

  const linkPlatforms = [
    "YouTube",
    "LinkedIn",
    "GitHub",
    "Instagram",
    "Facebook",
  ];

  const handlePlatformSelectionChange = (e) => {
    setSelectedPlatform(e.target.value);
    setSelectedLink("");
    handleEachLinkDataUpdate({ platform: e.target.value, link: "" }, count);
  };
  const handleLinkChange = (e) => {
    setSelectedLink(e.target.value);
    handleEachLinkDataUpdate(
      { platform: selectedPlatform, link: e.target.value },
      count
    );
  };

  return (
    <div className="bg-slate-100 w-full px-3 py-5 rounded-lg">
      <div className="flex justify-between text-gray-500 py-2">
        <h5 className="font-medium">= Link # {count + 1}</h5>
        <button onClick={() => handleRemoveLinkButton(selectedPlatform)}>
          Remove
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm">Platform</label>
          <select
            className="outline-none w-full bg-slate-100 border px-2 rounded-md py-3 text-gray-500"
            onChange={(e) => handlePlatformSelectionChange(e)}
            defaultValue={selectedPlatform}
          >
            <option>select</option>
            {linkPlatforms.map((linkPlatform) => {
              return (
                <option
                  key={linkPlatform}
                  value={linkPlatform}
                  disabled={!platforms.includes(linkPlatform)}
                >
                  {linkPlatform}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-sm">Link</label>
          <div className="flex items-center border px-2 rounded-md py-3 text-gray-500 gap-2">
            <BsGithub size={20} />
            <BsLink45Deg size={25} />
            <input
              type="text"
              placeholder="paste your link here"
              className="outline-none w-full bg-slate-100"
              value={selectedLink}
              onChange={(e) => handleLinkChange(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Link;
