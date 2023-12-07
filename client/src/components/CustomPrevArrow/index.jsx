const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, left: '10px', zIndex: 1 }}
      onClick={onClick}
    >
      Prev
    </div>
  );
};

export default CustomPrevArrow;