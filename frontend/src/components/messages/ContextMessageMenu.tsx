import { AiOutlineDelete } from "react-icons/ai";
interface IContextMenu {
  callback: () => void;
}

const ContextMenu = ({ callback }: IContextMenu) => {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content z-[1] menu p-1 shadow bg-base-100 opacity- rounded-box -right-[21%] w-44"
    >
      <li onClick={callback}>
        <a>
          <AiOutlineDelete /> Retrieve message
        </a>
      </li>
    </ul>
  );
};

export default ContextMenu;
