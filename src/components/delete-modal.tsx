import { Modal } from "@/components/modal";

export const DeleteConfirmModal = ({onClose, confirmDelete }: any) => {
  return Modal({
    content: () => {
      return (
        <div className="p-4 text-gray-800">
          <h2 className="text-lg font-semibold">Delete Task</h2>
          <p className="text-sm">Are you sure you want to delete this task?</p>
          <div className="flex flex-row justify-end space-x-2">
            <button
              className="p-2 px-4 text-sm font-semibold rounded bg-gray-200 text-gray-800"
              onClick={() => {
                confirmDelete();
              }}
            >
              Yes
            </button>
            <button
              className="p-2 px-4 text-sm font-semibold rounded bg-gray-200 text-gray-800"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      );
    },
  });
};
