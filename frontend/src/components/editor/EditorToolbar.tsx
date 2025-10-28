import Button from '../ui/Button';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Save, Download } from 'lucide-react';

export const EditorToolbar = () => {
  const handleSave = () => {
    toast.success('Resume saved successfully!');
  };

  const handleExport = () => {
    toast('Export started...', { icon: '📄' });
  };

  return (
    <motion.div
      className="sticky top-0 z-50 w-full border-b bg-card backdrop-blur flex items-center justify-between px-4 py-3 shadow-sm"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="font-semibold text-lg tracking-tight text-primary">Resume Editor</h1>

      <div className="flex items-center gap-3">
        <Button onClick={handleSave} icon={<Save size={16} />}>
          Save
        </Button>
        <Button onClick={handleExport} icon={<Download size={16} />}>
          Export
        </Button>
      </div>
    </motion.div>
  );
};
