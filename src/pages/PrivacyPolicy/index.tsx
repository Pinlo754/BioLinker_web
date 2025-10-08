import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Chính sách Quyền Riêng Tư
        </h1>
        <p className="text-sm text-gray-500">Cập nhật lần cuối: 08/10/2025</p>
      </header>

      {/* Content */}
      <main className="flex flex-col gap-6 bg-white shadow-md rounded-2xl max-w-3xl w-full p-8">
        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            1. Giới thiệu
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi cam kết bảo vệ quyền riêng tư và thông tin cá nhân của
            người dùng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng và
            bảo vệ dữ liệu của bạn khi bạn sử dụng dịch vụ của chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            2. Thông tin chúng tôi thu thập
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi có thể thu thập thông tin cá nhân như tên, địa chỉ email,
            số điện thoại, thông tin thanh toán và dữ liệu sử dụng (ví dụ: trang
            bạn truy cập, thời gian truy cập, v.v...).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            3. Mục đích sử dụng thông tin
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi sử dụng thông tin của bạn để cung cấp, duy trì và cải
            thiện dịch vụ; xử lý thanh toán; liên hệ hỗ trợ; gửi thông báo cập
            nhật và đảm bảo tuân thủ pháp luật.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            4. Bảo mật thông tin
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo
            vệ thông tin của bạn khỏi truy cập trái phép, mất mát hoặc tiết lộ
            không mong muốn.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            5. Quyền của người dùng
          </h2>
          <p className="text-justify leading-relaxed">
            Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân
            của mình. Bạn cũng có thể từ chối nhận thông báo hoặc yêu cầu ngừng
            xử lý dữ liệu bất kỳ lúc nào.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            6. Liên hệ với chúng tôi
          </h2>
          <p className="text-justify leading-relaxed">
            Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách quyền riêng
            tư này, vui lòng liên hệ qua email:{" "}
            <a
              href="mailto:biolinker.contact@gmail.com"
              className="text-blue-500 hover:underline"
            >
              biolinker.contact@gmail.com
            </a>
            .
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-sm text-gray-500 text-center">
        © 2025 Công ty TNHH BioLinker. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
