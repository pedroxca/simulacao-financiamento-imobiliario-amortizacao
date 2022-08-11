import React from "react"

interface ParcelaProps{
  numeroDaParcela: number
  valorDaParcela?: string
}

const ParcelaCard: React.FC<ParcelaProps> = ({numeroDaParcela, valorDaParcela}) => {
  return (
    <tr>
      <td>{valorDaParcela} </td>
      <td>{numeroDaParcela}</td>
    </tr>
  )
}

export default ParcelaCard