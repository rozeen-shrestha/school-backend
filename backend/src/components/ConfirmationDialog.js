
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";

export const ConfirmationDialog = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
          <Dialog.Title className="text-lg font-semibold">Confirm Action</Dialog.Title>
          <Dialog.Description className="mt-2">
            {message}
          </Dialog.Description>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={onConfirm}>Confirm</Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
