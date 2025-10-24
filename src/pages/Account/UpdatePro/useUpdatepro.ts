import { fetcherWithParams } from "../../../api/fetchers";
import { useEffect, useState } from "react";

const useUpdatePro = () => {
  const description =
    "Chọn gói Biolinker phù hợp nhất với nhu cầu và quy mô doanh nghiệp của bạn — tất cả các gói đều bao gồm tính năng theo dõi liên kết nâng cao và phân tích hiệu suất.";
  const plan = [
    {
      title: "Free",
      price: 0,
      description: "Gói cơ bản",
      action: "Đăng kí",
      features: [
        "Mẫu cơ bản dành riêng cho ngành",
        "Tùy chỉnh ảnh đại diện và tiểu sử",
        // "Phân tích cơ bản"
      ],
    },
    {
      title: "Standard",
      price: 49000,
      description: "Lựa chọn tiết kiệm cho cá nhân và doanh nghiệp nhỏ.",
      action: "Đăng kí",
      features: [
        "Tất cả tính năng của gói miễn phí",
        "Tùy chỉnh ảnh đại diện và tiểu sử nâng cao",
        "Một lần thay đổi tên miền miễn phí",
        "Một lần tạo mã QR miễn phí",
        "Không bao gồm watermark",
        "Theo dõi các mẫu ưa thích",
        "Theo dõi và phân tích lượt truy cập",
        "Tạo bảng collection riêng",
        //"Gợi ý tiểu sử do AI tạo ra"
      ],
    },
    {
      title: "Bussiness",
      price: 199000,
      description:
        "Chọn gói Bussiness để nâng cấp tính năng và khả năng của bạn.",
      action: "Đăng kí",
      features: [
        "Tất cả tính năng của gói tiêu chuẩn",
        "Năm lần thay đổi tên miền miễn phí",
        "Năm lần tạo mã QR miễn phí",
        "Xuất template",
        "Đăng kí và xem bio của người khác",
        "AI phân tích thông số của bio của bạn",
      ],
    },
  ];
  const [userPlan, setUserPlan] = useState("Free");
  const checkUserData = async () => {
    const userId = localStorage.getItem("userId");
    const user = await fetcherWithParams(`Auth/${userId}`, { userId: userId });
    console.log(user)
    setUserPlan(user?.role);
  };
  useEffect(() => {
    checkUserData();
    console.log(userPlan);
  }, []);

  const checkPlan = (userPlan: string, title: string) => {
    if (userPlan === "FreeUser" && title === "Free") return "Gói hiện tại";
    else if (userPlan === "ProUser" && title === "Standard")
      return "Gói hiện tại";
    else if (userPlan === "BussinessUser" && title === "Bussiness")
      return "Gói hiện tại";
    else return "Đăng ký"
  };
  return {
    description,
    plan,
    userPlan,
    checkPlan
  };
};
export default useUpdatePro;
