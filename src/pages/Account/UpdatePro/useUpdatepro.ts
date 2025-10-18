 const useUpdatePro = () => {
    const description = "Chọn gói Biolinker phù hợp nhất với nhu cầu và quy mô doanh nghiệp của bạn — tất cả các gói đều bao gồm tính năng theo dõi liên kết nâng cao và phân tích hiệu suất."
    const plan = [
        {
            title: "Free",
            price: 0,
            description: "Gói cơ bản",
            action: "Đăng kí",
            features: [
                "Mẫu cơ bản dành riêng cho ngành",
                "Tùy chỉnh ảnh đại diện và tiểu sử",
                "Phân tích cơ bản"
            ]
        },
        {
            title: "Standard",
            price: 30000,
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
                //"Gợi ý tiểu sử do AI tạo ra"
            ]
        },
        {
            title: "Premium",
            price: 200000,
            description: "Chọn gói Premium để nâng cấp tính năng và khả năng của bạn.",
            action: "Đăng kí",
            features: [
                "Tất cả tính năng của gói tiêu chuẩn",
                "Năm lần thay đổi tên miền miễn phí",
                "Năm lần tạo mã QR miễn phí",
                "Xuất template",
                "Tạo bảng collection riêng",
                "Đăng kí và xem bio của người khác",
                "AI phân tích thông số của bio của bạn",
            ]
        }
    ]
    return {
        description,
        plan,
    }
}
export default useUpdatePro;