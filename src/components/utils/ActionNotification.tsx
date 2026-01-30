import React, { Fragment } from 'react';
import { notification, Modal, message } from 'antd';
import { 
  CheckCircleOutlined, 
  ExclamationCircleOutlined, 
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

type ActionType = 'Delete' | 'Create' | 'Edit' | 'Error' | 'Success' | 'Warning' | 'Info';

interface ActionNotificationProps {
  type: ActionType;
  message: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showAs?: 'notification' | 'modal' | 'message';
}

const ActionNotification = ({ 
  type, 
  message, 
  description, 
  onConfirm, 
  onCancel,
  showAs = 'notification' 
}: ActionNotificationProps) => {
  
  const getConfig = () => {
    switch (type) {
      case 'Delete':
        return {
          icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
          color: '#ff4d4f',
          title: 'Delete Confirmation',
          confirmText: 'Delete',
          cancelText: 'Cancel',
        };
      case 'Create':
        return {
          icon: <PlusCircleOutlined style={{ color: '#52c41a' }} />,
          color: '#52c41a',
          title: 'Create Successful',
        };
      case 'Edit':
        return {
          icon: <EditOutlined style={{ color: '#1890ff' }} />,
          color: '#1890ff',
          title: 'Edit Successful',
        };
      case 'Error':
        return {
          icon: <CloseCircleOutlined style={{ color: '#ff4d4f' }} />,
          color: '#ff4d4f',
          title: 'Error',
        };
      case 'Success':
        return {
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          color: '#52c41a',
          title: 'Success',
        };
      case 'Warning':
        return {
          icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
          color: '#faad14',
          title: 'Warning',
        };
      case 'Info':
        return {
          icon: <ExclamationCircleOutlined style={{ color: '#1890ff' }} />,
          color: '#1890ff',
          title: 'Information',
        };
      default:
        return {
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          color: '#52c41a',
          title: 'Notification',
        };
    }
  };

  const config = getConfig();
  
  const showNotification = () => {
    const notifType = type.toLowerCase() as 'success' | 'error' | 'warning' | 'info';
    
    notification[notifType]({
      message: message || config.title,
      description: description,
      icon: config.icon,
      style: { borderLeft: `4px solid ${config.color}` },
      duration: 4.5,
    });
  };

  const showModal = () => {
    if (type === 'Delete') {
      Modal.confirm({
        title: message || config.title,
        icon: config.icon,
        content: description,
        okText: config.confirmText || 'OK',
        cancelText: config.cancelText || 'Cancel',
        okButtonProps: { danger: true },
        onOk: onConfirm,
        onCancel: onCancel,
        centered: true,
      });
    } else {
      Modal.info({
        title: message || config.title,
        icon: config.icon,
        content: description,
        onOk: onConfirm,
        centered: true,
      });
    }
  };

  const showMessage = () => {
    const msgType = type.toLowerCase() as 'success' | 'error' | 'warning' | 'info';
    message[msgType](description || message);
  };

  // Trigger the appropriate notification based on showAs prop
  React.useEffect(() => {
    if (showAs === 'notification') {
      showNotification();
    } else if (showAs === 'modal' && (type === 'Delete' || onConfirm)) {
      showModal();
    } else if (showAs === 'message') {
      showMessage();
    }
  }, []);

  return <Fragment />;
};

export default ActionNotification;