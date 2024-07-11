import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import baseUrl from "../api/api";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const checkEmailExists = async (email: string) => {
    try {
      const response = await baseUrl.get(`users?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Kiểm tra email đã tồn tại chưa
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        throw new Error("Email đã được sử dụng");
      }

      const response = await baseUrl.post("users", {
        name: values.fullName,
        email: values.email,
        password: values.password,
        profilePicture:
          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
        role: 0,
        status: true,
      });

      if (response.data) {
        notification.success({
          message: "Đăng ký thành công",
          description: "Tài khoản của bạn đã được tạo. Vui lòng đăng nhập.",
        });
        navigate("/login");
      } else {
        throw new Error(response.data.message || "Đăng ký thất bại");
      }
    } catch (error: any) {
      notification.error({
        message: "Đăng ký thất bại",
        description:
          error.response?.data?.message ||
          error.message ||
          "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-custom flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex shadow-lg rounded-lg overflow-hidden w-full max-w-xl mx-auto">
        <div className="hidden md:block md:w-1/3">
          <img
            src="https://img.lovepik.com/original_origin_pic/18/11/27/137f9dc94ac924466aa154bcbc13531e.jpg_wh860.jpg"
            alt="Canyon"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full md:w-2/3 p-6 bg-white">
          <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
          >
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nhập họ và tên"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Địa chỉ email"
              rules={[
                {
                  type: "email",
                  message: "Email không đúng định dạng!",
                },
                {
                  required: true,
                  message: "Vui lòng nhập email!",
                },
                {
                  validator: async (_, value) => {
                    if (value) {
                      const exists = await checkEmailExists(value);
                      if (exists) {
                        return Promise.reject("Email đã được sử dụng");
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Nhập địa chỉ email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Nhập mật khẩu"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng xác nhận mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={loading}
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">hoặc</span>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-purple-500 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
