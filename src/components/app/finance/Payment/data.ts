import { TableColumn } from 'react-data-table-component';
export interface DataProps {
  id: any;
  name: any;
  date: string;
  description: string;
  status: string;
  amount: string;
}
export const rowData = [
  {
    id: 1,
    name: "Simpa",
    date: "2022-01-20 19:45",
    description: "lorem",
    status: "unpaid",
    amount: "5000",
  },
  {
    id: 2,
    name: "Simpa",
    date: "2022-01-20 19:45",
    description: "lorem",
    status: "unpaid",
    amount: "5000",
  },
  {
    id: 3,
    name: "Simpa",
    date: "2022-01-20 19:45",
    description: "lorem",
    status: "unpaid",
    amount: "5000",
  },
];

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: "S/N",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
];
