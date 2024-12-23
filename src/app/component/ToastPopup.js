import { useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';

export default function ToastPopup({ message, severity }) {
  const toast = useRef(null);

  // Ensure the toast shows only after component is mounted
  useEffect(() => {
    if (toast.current && message && severity) {
      toast.current.show({
        severity: severity,
        summary: 'Notification',
        detail: message,
        life: 3000, // Optional: auto hide after 3 seconds
      });
    }
  }, [message, severity]); // This will run whenever `message` or `severity` change

  return <Toast ref={toast} position="bottom-right" />;
}
