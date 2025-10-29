"use client";

import { useEffect, useRef, useState } from "react";
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
  const [job, setJob] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  const [background, setBackground] = useState("");
  const [avatar, setAvatar] = useState("");
  const [previewImage, setPreviewImage] = useState<string>("");

  const previewRef = useRef<HTMLDivElement>(null);

  const jobOptions = [
    "Nghệ sĩ",
    "Thiết kế",
    "Lập trình viên",
    "Cá nhân",
    "Nhà sản xuất âm nhạc",
    "Nhà sáng tạo nội dung",
    "Chủ doanh nghiệp",
    "Khác",
  ];

  // 📸 Tạo preview PNG
  const handleGeneratePreview = async () => {
    const node = previewRef.current;
    if (!node) return;

    try {
      const canvas = await html2canvas(node, {
        backgroundColor: null,
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      setPreviewImage(dataUrl);
    } catch (err) {
      console.error("Lỗi khi tạo preview:", err);
      alert("Không thể tạo preview!");
    }
  };

  // 📦 Lấy dữ liệu session.profileData
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("profileData") || "{}");
    if (session && session.elements) {
      const bg = session.elements.find((el: any) => el.type === "background");
      if (bg) setBackground(bg.content.value);

      const av = session.elements.find((el: any) => el.type === "avatar");
      if (av) setAvatar(av.content.value);
    }

    handleGeneratePreview();
  }, []);

  // 📤 Lưu template
  const handleSaveTemplate = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const createdBy = user?.userId || user?.id || "";

    if (!createdBy) {
      alert("Không tìm thấy userId trong localStorage!");
      return;
    }

    if (!name.trim() || !description.trim() || !category.trim() || !job.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (!previewImage) {
      alert("Vui lòng tạo preview trước khi lưu!");
      return;
    }

    try {
      setLoading(true);

      const body = {
        name,
        description,
        category,
        isPremium,
        createdBy,
        job,
        previewImage,
      };

      const res = await axios.post("https://biolinker.onrender.com/api/Template", body);

      const templateId = res.data?.templateId || res.data?.id;
      if (templateId) {
        alert("Tạo template thành công!");
        onTemplateCreated(templateId);
        onClose();
      } else {
        alert("Không nhận được templateId từ server!");
      }
    } catch (error) {
      console.error("Lỗi khi tạo template:", error);
      alert("Tạo template thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="
          bg-white rounded-2xl shadow-xl 
          w-full max-w-[900px]
          flex flex-col md:flex-row 
          overflow-hidden
        "
      >
        {/* Cột trái: Preview */}
        <div className="w-full md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r relative">
          <div
            ref={previewRef}
            className="
              relative rounded-xl overflow-hidden flex flex-col items-center justify-center 
              shadow-md border bg-white
              w-[220px] h-[300px] sm:w-[280px] sm:h-[380px] md:w-[300px] md:h-[400px]
            "
            style={{
              background: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={avatar}
              alt="Avatar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg mb-3"
            />
          </div>
        </div>

        {/* Cột phải: Form */}
        <div className="w-full md:w-1/2 p-5 flex flex-col gap-3">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-center md:text-left">
            Tạo Template mới
          </h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tên Template</label>
            <input
              type="text"
              className="border rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên template..."
            />

            <label className="text-sm font-medium">Mô tả</label>
            <textarea
              className="border rounded-md p-2 h-20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả chi tiết..."
            />

            <label className="text-sm font-medium">Thể loại</label>
            <input
              type="text"
              className="border rounded-md p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ví dụ: Portfolio, Business..."
            />

            <label className="text-sm font-medium">Nghề nghiệp</label>
            <select
              className="border rounded-md p-2 bg-white"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            >
              <option value="">-- Chọn nghề nghiệp --</option>
              {jobOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label className="inline-flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
              />
              <span className="text-sm">Template Premium?</span>
            </label>
          </div>

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
