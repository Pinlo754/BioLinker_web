"use client";

import { useRef, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import { Button } from "../../../components/ui/button";

interface TemplateModalProps {
  onClose: () => void;
  onTemplateCreated: (templateId: string) => void;
}

export default function TemplateModal({
  onClose,
  onTemplateCreated,
}: TemplateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  // Dữ liệu demo cho preview
  const [background, setBackground] = useState(
    "https://images.unsplash.com/photo-1503264116251-35a269479413?w=800"
  );
  const [avatar, setAvatar] = useState(
    "https://i.pravatar.cc/150?img=5"
  );
  const [socialLinks] = useState([
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Twitter", url: "https://twitter.com" },
  ]);

  const previewRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 📸 Hàm tạo ảnh PNG preview chỉ gồm background + avatar + social đầu tiên
  const handleGeneratePreview = async () => {
    const node = previewRef.current;
    if (!node) return;

    try {
      const canvas = await html2canvas(node, {
        backgroundColor: null, // Giữ nguyên trong suốt nếu có
        scale: 2, // Tăng độ phân giải ảnh
      });

      const dataUrl = canvas.toDataURL("image/png");
      setPreviewImage(dataUrl);

      // Nếu muốn tải về
      const link = document.createElement("a");
      link.download = "template-preview.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Lỗi khi tạo preview:", err);
    }
  };

  // 📤 Hàm lưu template vào server
  const handleSaveTemplate = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const createdBy = user?.userId || user?.id || "";

    if (!createdBy) {
      alert("Không tìm thấy userId trong localStorage!");
      return;
    }

    if (!name.trim() || !description.trim() || !category.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://biolinker.onrender.com/api/Template", {
        name,
        description,
        category,
        isPremium,
        createdBy,
      });

      const templateId = res.data?.templateId || res.data?.id;
      if (templateId) {
        alert("Tạo template thành công!");
        onTemplateCreated(templateId);
        onClose();
      } else {
        alert("Không nhận được templateId từ server!");
      }
    } catch (error: any) {
      console.error("Lỗi khi tạo template:", error);
      alert("Tạo template thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[900px] flex">
        {/* Preview bên trái */}
        <div className="w-1/2 bg-gray-100 p-4 flex flex-col items-center justify-center border-r relative">
          {/* Khung preview render ra PNG */}
          <div
            ref={previewRef}
            className="relative w-[300px] h-[400px] rounded-xl overflow-hidden flex flex-col items-center justify-center"
            style={{
              background: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Avatar */}
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4"
            />

            {/* Chỉ lấy link social đầu tiên */}
            {socialLinks.length > 0 && (
              <a
                href={socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/80 px-3 py-1 rounded-full text-sm font-medium"
              >
                {socialLinks[0].name}
              </a>
            )}
          </div>

          {/* Nút tạo preview */}
          <Button
            onClick={handleGeneratePreview}
            className="mt-4 bg-blue-600 text-white"
          >
            Tạo Preview PNG
          </Button>

          {/* Hiển thị ảnh preview đã tạo */}
          {previewImage && (
            <div className="mt-4">
              <h4 className="text-sm text-gray-600 mb-2 text-center">
                Ảnh Preview đã tạo:
              </h4>
              <img
                src={previewImage}
                alt="Preview PNG"
                className="w-[150px] rounded-md border shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Form bên phải */}
        <div className="w-1/2 p-6 flex flex-col gap-3">
          <h2 className="text-xl font-semibold mb-2">Tạo Template mới</h2>

          <label className="text-sm font-medium">Tên Template</label>
          <input
            type="text"
            className="border rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="text-sm font-medium">Mô tả</label>
          <textarea
            className="border rounded-md p-2 h-20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="text-sm font-medium">Thể loại</label>
          <input
            type="text"
            className="border rounded-md p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label className="inline-flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isPremium}
              onChange={(e) => setIsPremium(e.target.checked)}
            />
            <span className="text-sm">Template Premium?</span>
          </label>

          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              disabled={loading}
              onClick={handleSaveTemplate}
              className="bg-blue-600 text-white"
            >
              {loading ? "Đang lưu..." : "Lưu Template"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
