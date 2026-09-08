import React from "react";
import Button from "./Button";
import { Project } from "../models/Project";

type ConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
  project: Project;
};

const ConfirmModal = ({ onCancel, onConfirm, project }: ConfirmModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 z-[9999]">
      <div className="relative bg-white p-6 rounded-md w-full max-w-[500px]">
        <p>Czy na pewno chcesz usunąć projekt „{project.title}”?</p>
        <div className="flex gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onCancel}>
            Anuluj
          </Button>
          <Button variant="danger" type="button" onClick={onConfirm}>
            Potwierdź
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
