import Box from "../Box/Box"

const Gameboard = () => {
  return (
      <div className="gameboard">
      {Array(100).fill().map((item, index) => (
            <Box num={index + 1} />
          ))}
      </div>
  )
}

export default Gameboard