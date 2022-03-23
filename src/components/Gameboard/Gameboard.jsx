import Box from "../Box/Box"
import GameContext from "../../context/GameContext"
import { useContext } from "react"

const Gameboard = () => {

  const {handleMouseOver} = useContext(GameContext)

  return (
      <div className="gameboard">
      {Array(100).fill().map((item, index) => (
            <Box key={index} id={index} num={index + 1} func={handleMouseOver} />
          ))}
      </div>
  )
}

export default Gameboard