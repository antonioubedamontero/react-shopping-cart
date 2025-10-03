import { FaCartShopping } from "react-icons/fa6";
interface Props {
  name: string;
}

export const CustomHeader = ({ name }: Props) => {
  return (
    <header className="flex items-center gap-5 bg-slate-500 text-xl p-4 mb-4">
      <FaCartShopping className="text-white" />
      <h1 className="text-white">{name}</h1>
    </header>
  );
};
