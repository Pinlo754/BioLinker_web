// Button.tsx
type ButtonProps = {
  text: string;
  onClick: () => void;
  width?: string;
  height?: string;
};

const Button = ({ text, onClick, width = "138px", height = "44px" }: ButtonProps) => {
  return (
    <button
      className={`rounded-[60px] px-[40px] py-[18px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-helvetica font-bold text-[14px] leading-[14px] flex justify-center items-center`}
      style={{ width, height }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
