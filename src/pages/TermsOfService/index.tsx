import React from "react";

const TermsOfService: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-gray-800 px-6 py-10">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Điều khoản Dịch vụ
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
            Khi bạn truy cập hoặc sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân
            thủ và bị ràng buộc bởi các điều khoản sau đây. Nếu bạn không đồng
            ý với bất kỳ phần nào của điều khoản này, vui lòng không sử dụng
            dịch vụ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            2. Quyền và trách nhiệm của người dùng
          </h2>
          <p className="text-justify leading-relaxed">
            Người dùng cam kết cung cấp thông tin chính xác và không sử dụng
            dịch vụ cho các mục đích vi phạm pháp luật, gây hại hoặc xâm phạm
            quyền lợi của người khác. Mọi hành vi lạm dụng sẽ bị xử lý theo quy
            định hiện hành.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            3. Trách nhiệm của chúng tôi
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi cam kết cung cấp dịch vụ ổn định và bảo mật. Tuy nhiên,
            chúng tôi không chịu trách nhiệm cho những gián đoạn hoặc thiệt hại
            phát sinh ngoài khả năng kiểm soát hợp lý, bao gồm sự cố kỹ thuật,
            tấn công mạng hoặc thiên tai.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            4. Sở hữu trí tuệ
          </h2>
          <p className="text-justify leading-relaxed">
            Tất cả nội dung, hình ảnh, logo, mã nguồn và tài liệu trên website
            này thuộc quyền sở hữu của chúng tôi hoặc các bên được cấp phép hợp
            pháp. Nghiêm cấm sao chép, phân phối hoặc sử dụng trái phép dưới bất
            kỳ hình thức nào.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            5. Giới hạn trách nhiệm
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp hoặc
            gián tiếp nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch
            vụ, trừ khi có quy định khác trong pháp luật bắt buộc.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            6. Thay đổi điều khoản
          </h2>
          <p className="text-justify leading-relaxed">
            Chúng tôi có thể cập nhật hoặc sửa đổi Điều khoản Dịch vụ này bất kỳ
            lúc nào mà không cần thông báo trước. Người dùng có trách nhiệm tự
            kiểm tra định kỳ để nắm các thay đổi mới nhất.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            7. Liên hệ
          </h2>
          <p className="text-justify leading-relaxed">
            Mọi thắc mắc liên quan đến điều khoản dịch vụ xin vui lòng liên hệ
            với chúng tôi qua email:{" "}
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
        © 2025 Công ty TNHH Dự Án Của Bạn. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};

export default TermsOfService;
