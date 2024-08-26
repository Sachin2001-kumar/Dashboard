import React from 'react';
import Widget from './Widget';
import '../Style/Category.css';

const Category = ({ title, widgets, onRemoveWidget, onAddWidget }) => {
  return (
    <div className="category">
      <h2>{title}</h2>
      <div className="widget-row">
        {widgets.map((widget, index) => (
          <Widget
            key={widget.id || index}
            widget={widget}
            onRemove={() => onRemoveWidget(widget.id)}
            onAddWidget={onAddWidget}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
