import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./CellAction.tsx"

export type ColorColumn = {
  id: string
  label: string
  hexCode: string
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "hexCode",
    header: "Code",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.hexCode}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.hexCode }}
        />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
