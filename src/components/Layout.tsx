import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";
import { IoIosLogOut } from "react-icons/io";

export const Layout: React.FC = () => {
  const { isLogged, setIsLogged } = useAppStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLogged(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <>
      <div className="h-12 border-b  flex justify-between items-center px-5">
        <Link to={"/home"}>
          <span className="text-xl font-bold ">Gafar</span>
        </Link>
        {isLogged ? (
          <div
            className="flex gap-2 items-center justify-center  text-blue-600 hover:text-blue-400 cursor-pointer"
            onClick={handleLogout}
          >
            <h3 className="text-xl mb-1"> выйти</h3>
            <IoIosLogOut className="text-2xl" />
          </div>
        ) : null}
      </div>
      <div className="flex justify-center py-5  min-h-[90vh]">
        <div className=" lg:w-2/3 my-0 mx-auto border-1 border-inherit border-solid rounded">
          <Outlet />
        </div>
      </div>
    </>
  );
};
