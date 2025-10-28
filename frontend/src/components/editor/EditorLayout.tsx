import React from 'react';
import { motion } from 'framer-motion';
import { EditorToolbar } from './EditorToolbar';
import Editor from '../Editor';
import Preview from '../Preview';
import PDFExport from '../PDFExport';

export default function EditorLayout() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground transition-colors">
      <EditorToolbar />

      <motion.div
        className="flex flex-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full md:w-1/2 border-r border-border overflow-y-auto p-6">
          <Editor />
        </div>

        <div className="w-full md:w-1/2 overflow-y-auto p-6 bg-muted/30">
          <Preview />
          <div className="mt-4">
            <PDFExport />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
