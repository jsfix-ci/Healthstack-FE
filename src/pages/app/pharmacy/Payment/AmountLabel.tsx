const AmountLabel = ({ children }) => (
  <div>
    <label
      style={{
        padding: '14px 20px',
        background: '#ffb3bd',
        color: '#ED0423',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {children}
    </label>
  </div>
);

export default AmountLabel;
