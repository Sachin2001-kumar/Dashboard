import React from 'react';
import '../Style/Widget.css';
import { FaChartLine } from 'react-icons/fa';

const Widget = ({ widget, onRemove, onAddWidget }) => {
  const renderWidgetContent = () => {
    if (widget.type === 'progress') {
      const total = (widget.data?.connected || 0) + (widget.data?.notConnected || 0);
      const connectedPercentage = total ? (widget.data?.connected / total) * 100 : 0;
      const notConnectedPercentage = total ? (widget.data?.notConnected / total) * 100 : 0;

      return (
        <div className="progress-widget">
          <div className="widget-header">
            <span className="widget-name">{widget.name}</span>
          </div>
          <div className="widget-body">
            <div className="circular-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <circle className="circle-bg" cx="18" cy="18" r="15.9155" />
                <circle
                  className="circle connected"
                  style={{ strokeDasharray: `${connectedPercentage} 100`, stroke: '#00aaff' }} 
                  cx="18" cy="18" r="15.9155"
                />
                <circle
                  className="circle not-connected"
                  style={{ strokeDasharray: `${notConnectedPercentage} 100`, stroke: '#aabbee' }} 
                  cx="18" cy="18" r="15.9155"
                />
                <text x="18" y="20.35" className="percentage">
                  {total} Total
                </text>
              </svg>
            </div>
            <div className="progress-details">
              <div className="progress-item">
                <div className="progress-box connected"></div>
                <span>Connected ({widget.data?.connected || 0})</span>
              </div>
              <div className="progress-item">
                <div className="progress-box not-connected"></div>
                <span>Not Connected ({widget.data?.notConnected || 0})</span>
              </div>
            </div>
          </div>
          <button className="remove-button" onClick={onRemove}>×</button>
        </div>
      );
    } else if (widget.type === 'risk') {
      const total = (widget.data?.passed || 0) + (widget.data?.failed || 0) + (widget.data?.warning || 0) + (widget.data?.notAvailable || 0);

      return (
        <div className="risk-widget">
          <div className="widget-header">
            <span className="widget-name">{widget.name}</span>
          </div>
          <div className="widget-body">
            <div className="circular-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <circle className="circle-bg" cx="18" cy="18" r="15.9155" />
                <circle
                  className="circle passed"
                  style={{ strokeDasharray: `${(widget.data?.passed / total) * 100} 100`, stroke: '#4caf50' }} 
                  cx="18" cy="18" r="15.9155"
                />
                <circle
                  className="circle failed"
                  style={{ strokeDasharray: `${(widget.data?.failed / total) * 100} 100`, stroke: '#f44336' }} 
                  cx="18" cy="18" r="15.9155"
                />
                <circle
                  className="circle warning"
                  style={{ strokeDasharray: `${(widget.data?.warning / total) * 100} 100`, stroke: '#ffeb3b' }} 
                  cx="18" cy="18" r="15.9155"
                />
                <circle
                  className="circle not-available"
                  style={{ strokeDasharray: `${(widget.data?.notAvailable / total) * 100} 100`, stroke: '#9e9e9e' }} 
                  cx="18" cy="18" r="15.9155"
                />
                <text x="18" y="20.35" className="percentage">
                  {total} Total
                </text>
              </svg>
            </div>
            <div className="risk-details">
              <div className="risk-item">
                <div className="risk-box passed"></div>
                <span>Passed: {widget.data?.passed || 0}</span>
              </div>
              <div className="risk-item">
                <div className="risk-box not-available"></div>
                <span>Not Available: {widget.data?.notAvailable || 0}</span>
              </div>
              <div className="risk-item">
                <div className="risk-box warning"></div>
                <span>Warning: {widget.data?.warning || 0}</span>
              </div>
              <div className="risk-item">
                <div className="risk-box failed"></div>
                <span>Failed: {widget.data?.failed || 0}</span>
              </div>
            </div>
          </div>
          <button className="remove-button" onClick={onRemove}>×</button>
        </div>
      );
    } else if (widget.type === 'addWidget') {
      return (
        <div className="add-widget">
          <button className="add-widget-button" onClick={onAddWidget}>
            + Add Widget
          </button>
        </div>
      );
    } else {
      return (
        <div className="default-widget">
          <div className="widget-header">
            <span className="widget-name">{widget.name}</span>
          </div>
          <div className="no-data">
            <FaChartLine size={40} />
            <p>No graph data available!</p>
          </div>
          <button className="remove-button" onClick={onRemove}>×</button>
        </div>
      );
    }
  };

  return (
    <div className="widget">
      {renderWidgetContent()}
    </div>
  );
};

export default Widget;
