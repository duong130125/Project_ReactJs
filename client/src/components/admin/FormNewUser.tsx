import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/reducers/admin/getUsers";
import { Form, Input, Button, notification, Modal } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import baseUrl from "../../api/api";
import { HiOutlineUserAdd } from "react-icons/hi";

const NewUserForm = ({
  setModalVisible,
}: {
  setModalVisible: (visible: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const checkEmailExists = async (email: string) => {
    try {
      const response = await baseUrl.get(`users?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error("Lỗi kiểm tra email:", error);
      return false;
    }
  };

  const handleAddUser = async (values: any) => {
    setLoading(true);
    try {
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        throw new Error("Email đã được sử dụng");
      }

      const newUser = {
        name: values.name,
        email: values.email,
        profilePicture:
          "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
        role: 0,
        status: true,
        password: values.password,
      };

      if (newUser) {
        dispatch(addUser(newUser));
        setModalVisible(false);
        notification.success({
          message: "Thành công",
          description: "Thêm mới người dùng thành công",
        });
        form.resetFields();
      } else {
        throw new Error("Không thể thêm người dùng");
      }
    } catch (error: any) {
      notification.error({
        message: "Thêm mới thất bại",
        description: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={true}
      title={null}
      closable={false}
      onCancel={() => setModalVisible(false)}
      footer={null}
      destroyOnClose
      width={500}
      className="rounded-3xl overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <HiOutlineUserAdd className="w-6 h-6" /> Thêm Mới Người Dùng
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          Khởi tạo tài khoản hệ thống mới.
        </p>
      </div>

      <div className="p-8 pb-6 bg-slate-50">
        <Form
          form={form}
          name="newUser"
          onFinish={handleAddUser}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="name"
            label={<span className="font-semibold text-slate-700">Họ và Tên</span>}
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="text-slate-400 mr-2" />}
              placeholder="Nguyễn Văn A"
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<span className="font-semibold text-slate-700">Địa chỉ Email</span>}
            rules={[
              { type: "email", message: "Email không đúng định dạng!" },
              { required: true, message: "Vui lòng nhập email!" },
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
              size="large"
              prefix={<MailOutlined className="text-slate-400 mr-2" />}
              placeholder="nguyen.a@gmail.com"
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="font-semibold text-slate-700">Mật khẩu Khởi tạo</span>}
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-slate-400 mr-2" />}
              placeholder="Mật khẩu"
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<span className="font-semibold text-slate-700">Xác nhận Mật khẩu</span>}
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
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
              size="large"
              prefix={<LockOutlined className="text-slate-400 mr-2" />}
              placeholder="Gõ lại mật khẩu bên trên"
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500"
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setModalVisible(false)}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Hủy Quyền
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md shadow-primary-200 hover:from-primary-600 hover:to-accent-600 transition-all flex items-center gap-2"
            >
              {loading && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
              {loading ? "Đang xử lý..." : "Xác Nhận Tạo"}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default NewUserForm;
