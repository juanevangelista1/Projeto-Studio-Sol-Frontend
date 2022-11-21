import { Bar } from './Bar'
import './Style-Display.scss'

type DisplayProps = {
  digit: number
  color: string
}

export function Display({ digit, color }: DisplayProps) {
  const numbers = {
    0: [true, true, true, false, true, true, true],
    1: [false, false, true, false, false, true, false],
    2: [true, false, true, true, true, false, true],
    3: [true, false, true, true, false, true, true],
    4: [false, true, true, true, false, true, false],
    5: [true, true, false, true, false, true, true],
    6: [true, true, false, true, true, true, true],
    7: [true, false, true, false, false, true, false],
    8: [true, true, true, true, true, true, true],
    9: [true, true, true, true, false, true, true]
  }

  const selectedNumber = numbers[digit as keyof typeof numbers]

  return (
    <div>
      <Bar color={color} enabled={selectedNumber[0]} type="line" />
      <div className="group">
        <Bar color={color} enabled={selectedNumber[1]} type="column" />
        <Bar color={color} enabled={selectedNumber[2]} type="column" />
      </div>

      <Bar color={color} enabled={selectedNumber[3]} type="line" />

      <div className="group">
        <Bar color={color} enabled={selectedNumber[4]} type="column" />
        <Bar color={color} enabled={selectedNumber[5]} type="column" />
      </div>

      <Bar color={color} enabled={selectedNumber[6]} type="line" />
    </div>
  )
}
