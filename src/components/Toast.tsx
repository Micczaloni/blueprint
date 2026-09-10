type ToastProps = {
  message: string;
};

const Toast = ({ message }: ToastProps) => {
  return (
    <div className="fixed bottom-4 right-4 p-4 rounded shadow bg-green-300">
      {message}
    </div>
  );
};

export default Toast;
