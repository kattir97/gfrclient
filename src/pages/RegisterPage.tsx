import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppStore } from "../stores/appStore";
import { register } from "../services/apiService";

const RegisterPage: React.FC = () => {
  const { isAppLoading, setIsAppLoading } = useAppStore();
  const navigate = useNavigate();

  const handleRegister = async (values: unknown) => {
    try {
      setIsAppLoading(true);
      const res = await register(values);

      if (res.data.status === "success") {
        navigate("/login");
      }
      setIsAppLoading(false);
    } catch (error) {
      setIsAppLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          message.error(
            error.response.data.message || "Пользователь с таким именем уже существует."
          );
        }
      } else {
        message.error("Произошла ошибка. Попробуйте войти позже.");
      }
    }
  };

  return (
    <div className="flex flex-col mt-20 items-center min-h-screen">
      <Spin fullscreen spinning={isAppLoading} />;
      <h1 className="mb-10 text-2xl">Создать аккаунт</h1>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400, width: "100%" }}
        initialValues={{ remember: true }}
        layout="vertical"
        onFinish={handleRegister}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Пожалуйста, введите имя пользователя!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Пожалуйста, введите пароль!" },
            { min: 6, message: "Пароль должен содержать не менее 6 символов!" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          {/* wrapperCol={{ offset: 8, span: 16 }} */}
          <Button htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
      <div className="flex flex-col gap-2 items-center justify-center text-sm">
        <h3>
          Уже зарегистрированы?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-400">
            Войти в аккаунт
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

export default RegisterPage;
