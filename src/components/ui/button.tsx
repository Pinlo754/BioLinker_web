// Button.tsx
type ButtonProps = {
  text: string;
  onClick: () => void;
  width?: string;
  height?: string;
  disabled?: boolean;
};

const Button = ({ text, onClick, width = "138px", height = "44px", disabled = false }: ButtonProps) => {
  return (
    <button
      className={`rounded-[60px] px-[40px] py-[18px] bg-gradient-to-r from-[#16C875] to-[#6CDFAB] text-white font-helvetica font-bold text-[14px] leading-[14px] flex justify-center items-center`}
      style={{ width, height }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
