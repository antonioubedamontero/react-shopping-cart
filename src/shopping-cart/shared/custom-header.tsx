interface Props {
  name: string;
}

export const CustomHeader = ({ name }: Props) => {
  return (
    <div className="bg-slate-500 text-xl text-center py-4 mb-4">
      <h1 className="text-white">{name}</h1>
    </div>
  );
};
