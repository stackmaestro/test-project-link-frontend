import { BsArrowRight } from "react-icons/bs";
const LinkButton = ({ platform, color, logo }) => {
  return (
    <div
      className={`link ${color} text-white rounded-xl w-3/4 h-16 flex justify-around items-center`}
    >
      {logo}
      <p>{platform}</p>
      <BsArrowRight size={20} />
    </div>
  );
};

export default LinkButton;
