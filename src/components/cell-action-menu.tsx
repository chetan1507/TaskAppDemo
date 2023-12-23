interface CellActionMenuItem {
  name: string;
  icon: () => JSX.Element;
  onClick: () => void;
}

interface CellActionMenuProps {
  items: CellActionMenuItem[];
}

function CellActionMenu({ items }: CellActionMenuProps) {
  return (
    <td className="whitespace-nowrap px-0 py-2">
      <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
        {items.map((item, idx) => (
          <button
            key={`${item.name}-${idx}`}
            className="inline-block border-e p-2 text-gray-700 hover:bg-gray-50 focus:relative"
            title={item.name}
            onClick={() => {
              item.onClick();
            }}
          >
            {item.icon()}
          </button>
        ))}
      </span>
    </td>
  );
}

export { CellActionMenu };
export type { CellActionMenuItem };

