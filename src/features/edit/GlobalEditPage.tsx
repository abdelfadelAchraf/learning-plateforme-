import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Space, Divider, message, Spin } from 'antd';
import { useMutation } from '@apollo/client/react';
import {
  UPDATE_COURSE,
  UPDATE_EXAM,
  UPDATE_EXERCISE,
  UPDATE_USER,
  CREATE_COURSE,
  CREATE_EXAM,
  CREATE_EXERCISE,
  CREATE_USER,
} from '../../graphql';

const { TextArea } = Input;
const { Option } = Select;

type PageType = 'course' | 'exercise' | 'exam' | 'user';

interface GlobalEditPageProps {
  pageType: PageType;
  pageId?: string; // Optional for create mode
  courseId?: string;
  exerciseId?: string;
  examId?: string;
  initialData?: any;
  isCreateMode?: boolean;
  onSave?: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  error?: string;
  visible: boolean;
}

const GlobalEditPage: React.FC<GlobalEditPageProps> = ({
  pageType,
  pageId,
  initialData = {},
  isCreateMode = false,
  onSave,
  onCancel,
  isLoading = false,
  error,
  visible,
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | undefined>(error);

  // Define mutations based on pageType
  const getMutations = () => {
    switch (pageType) {
      case 'course':
        return { create: CREATE_COURSE, update: UPDATE_COURSE };
      case 'exam':
        return { create: CREATE_EXAM, update: UPDATE_EXAM };
      case 'exercise':
        return { create: CREATE_EXERCISE, update: UPDATE_EXERCISE };
      case 'user':
        return { create: CREATE_USER, update: UPDATE_USER };
      default:
        throw new Error(`Unsupported page type: ${pageType}`);
    }
  };

  const mutations = getMutations();
  
  const [createMutation] = useMutation(mutations.create);
  const [updateMutation] = useMutation(mutations.update);

  // Reset form when visible changes or initialData updates
  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue(initialData);
      setFormError(undefined);
    }
  }, [visible, initialData, form]);

  const getFormFields = () => {
    const commonFields = [
      {
        name: 'title',
        label: 'Title',
        rules: [{ required: true, message: 'Please enter a title' }],
        component: <Input placeholder="Enter title" />,
      },
      {
        name: 'description',
        label: 'Description',
        component: <TextArea rows={4} placeholder="Enter description" />,
      },
    ];

    switch (pageType) {
      case 'course':
        return [
          ...commonFields,
          {
            name: 'subject',
            label: 'Subject',
            rules: [{ required: true, message: 'Please select a subject' }],
            component: (
              <Select placeholder="Select subject">
                <Option value="mathematics">Mathematics</Option>
                <Option value="physics">Physics</Option>
                <Option value="chemistry">Chemistry</Option>
                <Option value="biology">Biology</Option>
                <Option value="computer_science">Computer Science</Option>
              </Select>
            ),
          },
        ];
      case 'exam':
        return [
          ...commonFields,
          {
            name: 'subject',
            label: 'Subject',
            rules: [{ required: true, message: 'Please select a subject' }],
            component: (
              <Select placeholder="Select subject">
                <Option value="mathematics">Mathematics</Option>
                <Option value="physics">Physics</Option>
                <Option value="chemistry">Chemistry</Option>
                <Option value="biology">Biology</Option>
                <Option value="computer_science">Computer Science</Option>
              </Select>
            ),
          },
          {
            name: 'duration',
            label: 'Duration (minutes)',
            component: <Input type="number" placeholder="Duration in minutes" />,
          },
        ];
      case 'exercise':
        return [
          ...commonFields,
          {
            name: 'question',
            label: 'Question',
            rules: [{ required: true, message: 'Please enter the question' }],
            component: <TextArea rows={6} placeholder="Enter question" />,
          },
          {
            name: 'explanation',
            label: 'Explanation',
            component: <TextArea rows={4} placeholder="Enter explanation" />,
          },
          {
            name: 'subject',
            label: 'Subject',
            rules: [{ required: true, message: 'Please select a subject' }],
            component: (
              <Select placeholder="Select subject">
                <Option value="mathematics">Mathematics</Option>
                <Option value="physics">Physics</Option>
                <Option value="chemistry">Chemistry</Option>
                <Option value="biology">Biology</Option>
                <Option value="computer_science">Computer Science</Option>
              </Select>
            ),
          },
        ];
      case 'user':
        return [
          {
            name: 'name',
            label: 'Name',
            rules: [{ required: true, message: 'Please enter a name' }],
            component: <Input placeholder="Enter name" />,
          },
          {
            name: 'email',
            label: 'Email',
            rules: [
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ],
            component: <Input placeholder="Enter email" />,
          },
          {
            name: 'preferredLanguage',
            label: 'Preferred Language',
            component: (
              <Select placeholder="Select language">
                <Option value="en">English</Option>
                <Option value="fr">French</Option>
                <Option value="es">Spanish</Option>
                <Option value="ar">Arabic</Option>
              </Select>
            ),
          },
        ];
      default:
        return commonFields;
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsSubmitting(true);
      setFormError(undefined);

      const mutationVariables = isCreateMode
        ? { input: values }
        : { id: pageId, input: values };

      const mutation = isCreateMode ? createMutation : updateMutation;
      
      const result = await mutation({
        variables: mutationVariables,
      });

      setIsSubmitting(false);
      
      if (result.data) {
        message.success(
          isCreateMode 
            ? `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} created successfully!`
            : `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} updated successfully!`
        );
        
        if (onSave) {
          const dataKey = isCreateMode ? `create${pageType.charAt(0).toUpperCase() + pageType.slice(1)}` : `update${pageType.charAt(0).toUpperCase() + pageType.slice(1)}`;
          onSave((result.data as Record<string, any>)[dataKey]);
        }
        
        form.resetFields();
      }
    } catch (error: any) {
      setIsSubmitting(false);
      setFormError(error.message || 'An error occurred');
      console.error('Mutation error:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFormError(undefined);
    if (onCancel) {
      onCancel();
    }
  };

  const getTitle = () => {
    const action = isCreateMode ? 'Create' : 'Edit';
    const type = pageType.charAt(0).toUpperCase() + pageType.slice(1);
    return `${action} ${type}`;
  };

  const formFields = getFormFields();

  return (
    <Modal
      title={getTitle()}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Spin spinning={isLoading || isSubmitting}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={isLoading || isSubmitting}
        >
          {formFields.map((field, index) => (
            <Form.Item
              key={field.name || index}
              name={field.name}
              label={field.label}
              rules={field.rules}
            >
              {field.component}
            </Form.Item>
          ))}

          {formError && (
            <div style={{ color: '#ff4d4f', marginBottom: 16 }}>
              {formError}
            </div>
          )}

          <Divider />
          
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                {isCreateMode ? 'Create' : 'Save'}
              </Button>
            </Space>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default GlobalEditPage;