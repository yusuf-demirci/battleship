

const Box = ({id, num, func}) => {
  return (
      <div id={id} className="box" onMouseEnter={func} ></div>
  )
}

export default Box