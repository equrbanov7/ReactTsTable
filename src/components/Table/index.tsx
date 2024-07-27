import "./index.scss";

interface TableProps {
  tableColumns: string[];
  tableItems: Student[];
  emptyTableMessage: string;
  deleteFunction: (id: number, name: string) => void;
}

type Student = {
  id: number;
  name: string;
  email: string;
  gpa: number;
};
const Table = ({
  tableColumns,
  tableItems,
  emptyTableMessage,
  deleteFunction,
}: TableProps) => {
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            {tableColumns?.map((tableColumn, index) => (
              <th key={index}>{tableColumn} </th>
            ))}
          </tr>
        </thead>
        {tableItems?.length > 0 ? (
          <tbody>
            {tableItems?.map((tableItem) => (
              <tr key={tableItem.id}>
                <td>{tableItem.id}</td>
                <td>{tableItem.name}</td>
                <td>{tableItem.email}</td>
                <td>{tableItem.gpa}</td>
                <td>
                  <button
                    onClick={() => deleteFunction(tableItem.id, tableItem.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={5}>
                <div className="TableEmptyInfo">
                  <h3>{emptyTableMessage} </h3>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
