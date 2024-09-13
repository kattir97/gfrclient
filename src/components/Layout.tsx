import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";
import { IoIosLogOut } from "react-icons/io";
import { Dropdown, Space } from "antd";
import { FaAngleDown } from "react-icons/fa6";
import type { MenuProps } from "antd";
import { useAuthStore } from "../stores/authStore";
import { RiAdminFill } from "react-icons/ri";

export const Layout: React.FC = () => {
  const { isLogged, setIsLogged } = useAppStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <RiAdminFill />,
      label: <Link to={"/admin"}>Админка</Link>,
    },
    {
      key: "2",
      danger: true,
      icon: <IoIosLogOut />,
      label: <a onClick={handleLogout}>Выйти</a>,
    },
  ];
  return (
    <>
      <div className="h-12 border-b  flex justify-between items-center px-5">
        <Link to={"/home"}>
          <span className="text-xl font-bold ">Gafar</span>
        </Link>
        <div className="mr-5">
          {isLogged ? (
            <div className="flex gap-2">
              <Link to={"/admin"}></Link>
              <Dropdown menu={{ items }} placement="bottom">
                <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
                  <Space className="flex justify-center items-center">
                    {user}
                    <FaAngleDown fontSize={15} style={{ marginTop: "3px" }} />
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center py-5  min-h-[90vh]">
        <div className=" lg:w-2/3 my-0 mx-auto border-1 border-inherit border-solid rounded">
          <Outlet />
        </div>
      </div>
    </>
  );
};
