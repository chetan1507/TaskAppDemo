export function Modal({
    content,
    contentProps
}: any){
  const Content = content;
  return (
    <div className="fixed pt-20 inset-x-0 w-full bg-slate-50/75">
      <div className="container flex flex-col w-1/3 grow m-auto p-6 rounded-md shadow-md bg-gray-50 text-gray-800">
        <section className="flex-1 text-gray-600">
          <Content {...contentProps} />
        </section>
      </div>
    </div>
  );
};
