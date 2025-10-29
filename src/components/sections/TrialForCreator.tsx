import React from 'react';

type TrialForCreatorProps = {
  visible: boolean;
  onClose: () => void;
};

export const TrialForCreator: React.FC<TrialForCreatorProps> = ({ visible, onClose}) => {
  if (!visible) return null;
  const message = "Cảm ơn bạn đã quan tâm đến Biolinker. Như một lời chào mừng đến cộng đồng sáng tạo nội dung, tài khoản của bạn sẽ được miễn phí sử dụng Biolinker Pro trong 1 tháng."
  return (
    <div className="fixed inset-0 z-[9999] bg-black/25 backdrop-blur-[1px] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center gap-4 max-w-[560px] text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green1 to-green2 bg-clip-text text-transparent">
          Đến các Content Creator tại BioLinker!
        </h3>
        <span className="text-base text-start leading-6 text-gray-600">Cảm ơn bạn đã quan tâm đến BioLinker. Như một lời chào mừng đến cộng đồng sáng tạo nội dung, tài khoản của bạn sẽ được
            <span className="font-bold text-emerald-500 underline"> giảm giá khi mua gói Standard từ 49000đ thành 19000đ </span></span>
        <p className="text-base text-start leading-6 text-gray-600">Hãy khám phá và tạo nên dấu ấn riêng của bạn cùng BioLinker. Tụi mình luôn sẵn sàng đồng hành trên mọi bước phát triển của bạn!</p>
        <button
          type="button"
          onClick={() => onClose()}
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#16C875] to-[#6CDFAB] opacity-70 cursor-pointer w-[50%]"
        >
          Đóng
        </button>
      </div>
      
    </div>
  );
};
