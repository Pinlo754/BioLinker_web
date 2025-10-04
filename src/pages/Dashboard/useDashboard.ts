const useDasshboard = () => {    

   const templates: Template[] = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "Một mẫu website cá nhân để giới thiệu bản thân và dự án.",
    image: "/template1.png",
    author: "Nguyễn Văn A",
    authorAvatar: "/avatar.png",
  },
  {
    id: 2,
    name: "E-commerce Store",
    description: "Mẫu website thương mại điện tử với giỏ hàng và thanh toán.",
    image: "/template2.png",
    author: "Trần Thị B",
    authorAvatar: "https://example.com/avatars/author2.png",
  },
  {
    id: 3,
    name: "Blog Template",
    description: "Mẫu blog cá nhân hỗ trợ markdown và bình luận.",
    image: "/template3.png",
    author: "Lê Văn C",
    authorAvatar: "https://example.com/avatars/author3.png",
  },
  {
    id: 4,
    name: "Admin Dashboard",
    description: "Dashboard quản trị với biểu đồ thống kê và quản lý người dùng.",
    image: "/template4.png",
    author: "Phạm Thị D",
    authorAvatar: "https://example.com/avatars/author4.png",
  },
];


    return {
        templates,
    };
};
export interface Template {
        id: number;
        name: string;
        description: string;
        image: string;
        author: string;
        authorAvatar: string;
    }

export default useDasshboard;