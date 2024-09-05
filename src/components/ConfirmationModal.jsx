import React from 'react'
import Modal from './Modal'
import CustomButton from './Button'


export const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  content,
  onAccept,
  onCancel,
}) => {
  const handleCancel = () => {
    onCancel()
    onClose()
  }

  const handleAccept = () => {
    onAccept()
    onClose()
  }

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{content}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <CustomButton variant="outline" onClick={handleCancel}>
          Cancel
        </CustomButton>
        <CustomButton color="green" onClick={handleAccept}>
          Confirm
        </CustomButton>
      </div>
    </Modal>
  )
}