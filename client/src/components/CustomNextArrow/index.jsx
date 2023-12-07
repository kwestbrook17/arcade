const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, right: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      Next
    </div>
  );
};

export default CustomNextArrow;