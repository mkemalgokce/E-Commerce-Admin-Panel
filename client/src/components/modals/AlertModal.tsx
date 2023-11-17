import { FC } from "react"
import { Modal } from "@/components/ui/modal.tsx"
import { Button } from "../ui/button"

interface AlertModalProps {
  isOpen: boolean
  title?: string
  description?: string
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export const AlertModal: FC<AlertModalProps> = ({
  isOpen,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onClose,
  onConfirm,
  loading
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button loading={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button loading={loading} variant="destructive" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}
