import React, { useState } from 'react';
import '../Style/AddWidget.css';

const AddWidgetSidebar = ({ onClose, addWidget }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddWidget = () => {
    if (selectedCategory && widgetName) {
      const newWidget = {
        id: Date.now(),
        name: widgetName,
        text: widgetText || '',
        type: 'custom',
      };
      addWidget(selectedCategory, newWidget);
      onClose();
    }
  };

  return (
    <div className="add-widget-sidebar">
      <h2>Add New Widget</h2>
      <label>
        Category:
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select a category</option>
          <option value="CSPM Executive Dashboard">CSPM Executive Dashboard</option>
          <option value="CWPP Dashboard">CWPP Dashboard</option>
          <option value="Registry Scans">Registry Scans</option>
          <option value="Image">Image</option>
        </select>
      </label>
      <label>
        Widget Name:
        <input type="text" value={widgetName} onChange={(e) => setWidgetName(e.target.value)} />
      </label>
      <label>
        Widget Text (Optional):
        <textarea value={widgetText} onChange={(e) => setWidgetText(e.target.value)} />
      </label>
      <div className="button-group">
        <button className="cancel-button" onClick={onClose}>Cancel</button>
        <button className="confirm-button" onClick={handleAddWidget}>Confirm</button>
      </div>
    </div>
  );
};

export default AddWidgetSidebar;
