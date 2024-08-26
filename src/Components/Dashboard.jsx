import React, { useEffect, useState } from 'react';
import Category from './Category';
import AddWidgetSidebar from './AddWidgetSidebar';
import '../Style/Dashboard.css';
import dashboardData from '../Dashboard.json';

const Dashboard = () => {
    const [categories, setCategories] = useState(dashboardData.categories);
    const [showSidebar, setShowSidebar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCategories(dashboardData.categories);
    }, []);
    const addWidget = (categoryName, newWidget) => {
        setCategories(categories.map(category => {
          if (category.name === categoryName) {
            const addWidgetIndex = category.widgets.findIndex(widget => widget.type === 'addWidget');
            if (addWidgetIndex > -1) {
              const updatedWidgets = [
                ...category.widgets.slice(0, addWidgetIndex),
                { ...newWidget, id: category.widgets[addWidgetIndex].id },
                ...category.widgets.slice(addWidgetIndex).map(widget => ({ ...widget, id: widget.id + 1 }))
              ];
              return { ...category, widgets: updatedWidgets };
            }
          }
          return category;
        }));
      };
    

    const removeWidget = (categoryName, widgetId) => {
        setCategories(categories.map(category => {
          if (category.name === categoryName) {
            const updatedWidgets = category.widgets
              .filter(widget => widget.id !== widgetId)
              .map(widget => widget.id > widgetId ? { ...widget, id: widget.id - 1 } : widget);
            return { ...category, widgets: updatedWidgets };
          }
          return category;
        }));
      };

    const handleReload = () => {
        console.log('Reloading data...');
        setCategories(dashboardData.categories);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredCategories = categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
            widget.name.toLowerCase().includes(searchTerm)
        )
    }));

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>CNAPP Dashboard</h1>
                <div className="dashboard-controls">
                    <button onClick={() => setShowSidebar(true)}>Add Widget</button>
                    <button onClick={handleReload} title="Reload">&#x21bb;</button>
                    <button title="Options">&#x22ee;</button>
                    <div className="history-dropdown-wrapper">
                        <i className="fa fa-clock-o"></i>
                        <select className="history-dropdown">
                            <option value="default">View History</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Widgets"
                        className="search-bar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="dashboard-content">
                {filteredCategories.map(category => (
                    <Category
                        key={category.id}
                        title={category.name}
                        widgets={category.widgets}
                        onRemoveWidget={(widgetId) => removeWidget(category.name, widgetId)}
                        onAddWidget={() => setShowSidebar(true)}
                    />
                ))}
            </div>
            {showSidebar && (
                <AddWidgetSidebar onClose={() => setShowSidebar(false)} addWidget={addWidget} />
            )}
        </div>
    );
};

export default Dashboard;
