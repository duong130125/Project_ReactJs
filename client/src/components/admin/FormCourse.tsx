import React, { useEffect } from "react";
import { Form, Input, Button, Modal } from "antd";

interface CourseFormModalProps {
  isOpen: boolean;
  closeModal: () => void;
  course: { title: string; description: string; image?: string };
  setCourse: (course: {
    title: string;
    description: string;
    image?: string;
  }) => void;
  handleSave: () => void;
  isEditing: boolean;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  closeModal,
  course,
  setCourse,
  handleSave,
  isEditing,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue(course);
    } else {
      form.resetFields();
    }
  }, [isOpen, course, form]);

  const onFinish = (values: { title: string; description: string; image?: string }) => {
    setCourse({ ...course, ...values });
    handleSave();
    form.resetFields();
  };

  return (
    <Modal
      visible={isOpen}
      title={null}
      closable={false}
      onCancel={closeModal}
      footer={null}
      destroyOnClose
      width={600}
      className="rounded-3xl overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
        <h2 className="text-2xl font-extrabold text-white">
          {isEditing ? "Cập nhật Khóa học" : "Tạo Mới Khóa học"}
        </h2>
        <p className="text-primary-100 text-sm mt-1">
          {isEditing ? "Chỉnh sửa thông tin chi tiết của khóa học." : "Điền thông tin bên dưới để bắt đầu luyện thi."}
        </p>
      </div>
      
      <div className="p-8 pb-6">
        <Form
          form={form}
          initialValues={course}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="title"
            label={<span className="font-semibold text-slate-700">Tên chuyên đề</span>}
            rules={[{ required: true, message: "Vui lòng nhập tên chuyên đề!" }]}
          >
            <Input
              size="large"
              placeholder="VD: Toán học THPT 2024..."
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500"
              onChange={(e) => setCourse({ ...course, title: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label={<span className="font-semibold text-slate-700">URL Hình Ảnh Cover</span>}
            rules={[{ required: true, message: "Vui lòng dán link hình ảnh!" }]}
          >
            <Input
              size="large"
              placeholder="https://..."
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500"
              onChange={(e) => setCourse({ ...course, image: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={<span className="font-semibold text-slate-700">Mô Tả Sinh Động</span>}
            rules={[{ required: true, message: "Nhập một mô tả ngắn gọn..." }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Mô tả sẽ hiển thị trên card để thu hút học sinh..."
              className="rounded-xl border-slate-200 hover:border-primary-400 focus:border-primary-500resize-none"
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md shadow-primary-200 hover:from-primary-600 hover:to-primary-700 transition-all"
            >
              {isEditing ? "Lưu Thay Đổi" : "Khởi Tạo Ngay"}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default CourseFormModal;
