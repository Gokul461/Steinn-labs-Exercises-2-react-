import { addToast, ToastProvider, Button } from "@heroui/react";
import React from "react";

interface ToastProps {
  title: string;
  description: string;
}

const Toast: React.FC<ToastProps> = ({ title, description }) => {
  const showToast = () => {
    addToast({ title, description });
  };

  return (
    <>
      {/* Toast Provider for top-center placement */}
      <ToastProvider placement="top-center" toastOffset={60} />
      
      {/* Button to trigger toast */}
      <Button variant="flat" onPress={showToast}>
        Show Toast
      </Button>
    </>
  );
};

export default Toast;
