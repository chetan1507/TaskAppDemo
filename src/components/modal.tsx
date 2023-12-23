export enum ModalSize {
  FULL = 'w-full',
  HALF = 'w-1/2',
  THIRD = 'w-1/3',
}

export function Modal({
    content,
    contentProps,
    size = ModalSize.THIRD
}: any){
  const Content = content;
  return (
    <div className="fixed pt-20 inset-x-0 w-full bg-slate-50/75 ">
      <div className={`container flex flex-col ${size} grow shrink m-auto p-6 rounded-md shadow-md bg-gray-50 text-gray-800`}>
        <section className="flex-1 text-gray-600 z-50">
          <Content {...contentProps} />
        </section>
      </div>
    </div>
  );
};
