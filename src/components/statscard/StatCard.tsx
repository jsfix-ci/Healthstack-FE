import React from 'react';

interface StatProps {
  count: any;
  name: string;
  range: string;
  icon: string;
}

const StatCard: React.FC<StatProps> = ({
  count = 14,
  name = 'Appointments',
  icon = 'bi bi-calendar',
  range = 'month',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '16px',
        background: '#f8f8f8',
        borderRadius: '8px',
        width: '100%',
        margin: '0 20px 0 0 ',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: '#33415C',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            margin: '0 20px 0 0',
          }}
        >
          <i className={icon}></i>
        </div>
        <div>
          <h1>{count}</h1>
          <h4>{name}</h4>
          <small>This {range}</small>
        </div>
      </div>

      <span
        style={{
          padding: '6px 10px',
          borderRadius: '4px',
          background: '#C2F5DF',
        }}
      >
        2%
      </span>
    </div>
  );
};

export default StatCard;
