import { ButtonProps } from "@/utils/interfaces/ButtonProps";

export default function Button({ title, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} py-2 px-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 focus:ring-4 focus:ring-sky-200 focus:bg-sky-700`}
    >
      <span>{title}</span>
    </button>
  );
}
