"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./CellAction.tsx"

export type CategoryColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "label",
    header: "Label"
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
