import { CgProfile } from "react-icons/cg";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { userAtom } from "../../store/store";
import { useAtom } from "jotai";

const UserProfile = () => {
  const [_, setUser] = useAtom(userAtom);

  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    //setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        image: profilePicture,
      }),
    };

    try {
      let res = await fetch(
        "http://localhost:5000/api/v1/user",
        requestOptions
      );
      let data = await res.json();
      if (res.ok) {
        setUser(data);
        console.log("Sucess (POST): ", data);
        setFirstName("");
        setLastName("");
        setEmail("");
      } else {
        console.log("Error: ", data);
      }
    } catch (error) {
      console.log("Error (ACT):", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="px-5 space-y-5 min-w-[50%]">
          <div className="space-y-3">
            <h3 className="text-3xl text-left font-extrabold">
              Profile Details
            </h3>
            <span>(Create a new User)</span>
            <p className="pr-10 text-sm text-gray-600">
              Add your details to create a personal touch to your profile.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
            <Dropzone
              onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
              accept={{
                "image/png": [".png", ".jpg", ".bmp"],
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="bg-gray-100 p-5 rounded-lg flex md:justify-between items-center gap-5">
                      <p className="w-2/6">Profile Picture</p>
                      <div className="w-4/6 md:flex items-center gap-10">
                        <div className="w-32 h-32 items-center flex bg-gray-300 rounded-xl">
                          {profilePicture ? (
                            <img
                              src={profilePicture}
                              alt="Profile"
                              className="bg-gray-300 rounded-xl w-32 h-32 bg-cover "
                            />
                          ) : (
                            <CgProfile
                              size={200}
                              className="bg-gray-300 rounded-xl w-32 h-32"
                            />
                          )}
                        </div>
                        {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                        <div className="text-sm">
                          <p>Image must be below 1024x1024px.</p>
                          <p>Use PNG, JPG, or BMP format.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>

            <div className="bg-gray-100 rounded-lg p-5 space-y-5">
              <div className="flex justify-between items-center gap-5">
                <label htmlFor="fName" className="w-2/6">
                  First name
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="fName"
                  required
                  className="outline-none border border-purple-500 rounded-lg h-full w-4/6 px-3 py-3 focus:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>

              <div className="flex justify-between items-center gap-5">
                <label htmlFor="lName" className="w-2/6">
                  Last name
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lName"
                  type="text"
                  required
                  className="outline-none border border-purple-500 rounded-lg h-full w-4/6 px-3 py-3 focus:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>
              <div className="flex justify-between items-center gap-5">
                <label htmlFor="email" className="w-2/6">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  required
                  className="outline-none border border-purple-500 rounded-lg h-full w-4/6 px-3 py-3 focus:drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 bg-purple-800 text-white w-32 h-12 rounded-lg hover:bg-white hover:text-purple-800 hover:border hover:border-purple-800 transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
