interface TableHeader<T> {
  name: string;
  key: string;
  component?: React.FC<{ item: T }>;
}

interface TableViewProps<T> {
  headers: TableHeader<T>[];
  items: T[];
}

function TableView<T extends Document>({ headers, items }: TableViewProps<T>) {
  return (
    <div className="p-4 min-h-max">
      <div className="">
        <table className="min-w-full divide-y-2 divide-gray-300 bg-gray-100 text-sm rounded shadow">
          <thead className="ltr:text-left">
            <tr>
              {headers.map((header, idx) => {
                return (
                  <th
                    key={header.key}
                    className="text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                  >
                    {header.name}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {items.map((item: T, idx) => {
              return (
                <tr key={`row-item-${idx}`} className="hover:bg-gray-50">
                  {headers.map((header, idx) => {
                    const Component =
                      header.component ??
                      (({ item }: any) => <>{item[header.key]}</>);

                    return (
                      <td
                        key={header.key}
                        className="whitespace-nowrap px-4 py-2 font-normal text-gray-900"
                      >
                        <Component item={item} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { TableView };
export type { TableHeader, TableViewProps };
