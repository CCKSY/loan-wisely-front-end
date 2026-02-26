// 입력 폼 카드 컨테이너
import { levelMeta, type Level } from "@/components/user/constants";

type FormCardProps = {
  level: Level;
  children: React.ReactNode;
};

const FormCard = ({ level, children }: FormCardProps) => (
  <div className="mt-4 rounded-3xl border border-stone-200 bg-white px-4 py-5 sm:mt-6 sm:px-6 sm:py-6">
    <h1 className="text-xl font-semibold text-stone-900 sm:text-2xl">정보 입력</h1>
    <p className="mt-2 text-sm text-stone-600">{levelMeta[level].description}</p>
    {children}
  </div>
);

export default FormCard;
