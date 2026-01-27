import React, { useState } from 'react';
import { FiEye, FiCode } from 'react-icons/fi';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = 'Écrivez votre contenu en Markdown...',
  height = 300,
}) => {
  const [viewMode, setViewMode] = useState<'write' | 'preview'>('write');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const renderPreview = () => {
    // Simple markdown preview (you might want to use a library for more complex rendering)
    const html = value
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');

    return { __html: html };
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-gray-50 border-b px-4 py-2">
        <div className="flex space-x-1">
          <button
            type="button"
            onClick={() => setViewMode('write')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'write'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiCode className="w-4 h-4 inline mr-1" />
            Écrire
          </button>
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'preview'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FiEye className="w-4 h-4 inline mr-1" />
            Aperçu
          </button>
        </div>
        <div className="text-xs text-gray-500">
          Supporte Markdown et LaTeX ($$formule$$)
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="bg-white" style={{ height: `${height}px` }}>
        {viewMode === 'write' ? (
          <textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none"
            style={{ height: `${height - 40}px` }}
          />
        ) : (
          <div
            className="h-full overflow-y-auto p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={renderPreview()}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;