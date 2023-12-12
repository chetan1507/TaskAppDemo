import { TaskStatus } from "@/data-models/task-data-service/types";

export const FilterView = ({
  filter,
  setFilter,
}: any) => {

  return (
    <div className="inline-flex rounded-lg border border-gray-100 bg-gray-100 p-1">
      {
      ['',...Object.keys(TaskStatus)].map( key => {
        return <button
          key={key ?? 'ALL'}
          className={`inline-block rounded-md px-4 py-2 text-sm ${filter === key? 'bg-white text-blue-500 shadow-sm' : 'text-gray-500 hover:text-gray-700'}  focus:relative`}
          onClick={() => {
            setFilter(key ?? '');
          }}
        >
          {key==='' ? 'ALL' : key?.split('_').join(" ") ?? 'ALL'}
        </button>;
      })}
    </div>
  );
};
