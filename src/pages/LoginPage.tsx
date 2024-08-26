import { Button, Form, Input, message, Spin } from "antd";
import { useAuthStore } from "../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../stores/appStore";
import axios from "axios";

const LoginPage: React.FC = () => {
  const { login, admin } = useAuthStore();
  const navigate = useNavigate();
  const { setIsLogged, setIsAppLoading, isAppLoading } = useAppStore();

  const handleLogin = async (values: unknown) => {
    try {
      setIsAppLoading(true);
      const logRes = await login(values);
      if (logRes.status === 200) {
        const token = logRes.data.token;
        localStorage.setItem("authToken", token);
      }

      const adRes = await admin();

      if (adRes.status === 200) {
        setIsLogged(true);
        navigate("/admin");
      }
      setIsAppLoading(false);
    } catch (error) {
      setIsAppLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          message.error(error.response.data.message || "Неверные учетные данные.");
        } else if (error.response?.status === 403) {
          message.error(error.response.data.message || "У вас нет прав администратора.");
        } else {
          message.error("Произошла ошибка. Попробуйте войти позже.");
        }
      } else {
        message.error("Произошла ошибка. Попробуйте войти позже.");
      }
    }
  };

  return (
    <div className="flex flex-col mt-20 items-center min-h-screen">
      <Spin fullscreen spinning={isAppLoading} />
      <h1 className="mb-10 text-2xl">Войти</h1>
      <Form
        name="basic"
        style={{ maxWidth: 400, width: "100%" }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          {/* wrapperCol={{ offset: 8, span: 16 }} */}
          <Button htmlType="submit">Login</Button>
        </Form.Item>
      </Form>

      <div className="flex flex-col gap-2 items-center justify-center text-sm">
        <h3>
          Не зарегистрированы?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-400">
            Пройти регистрацию
          </Link>
        </h3>
        <h3>
          <Link to="/" className="text-blue-500 hover:text-blue-400">
            На главную
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default LoginPage;
