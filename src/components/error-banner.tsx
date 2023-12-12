export const ErrorBanner = ({ error, onClose }: any) => {
  return (
    <div className="px-4 flex flex-row mb-2">
          <div className="rounded border-s-4 border-red-500 bg-red-50 p-2 flex grow">{error}</div>
          <button className="text-gray-500 transition hover:text-gray-600 bg-red-50" onClick={onClose}>
            <span className="sr-only">Dismiss popup</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  );
}