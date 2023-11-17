"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./CellAction.tsx"

export type SizeColumn = {
  id: string
  label: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "value",
    header: "Value"
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
