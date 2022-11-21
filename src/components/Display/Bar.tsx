import './Style-Display.scss'

type BarProps = {
  color: string
  enabled: boolean
  type: 'line' | 'column'
}

export function Bar({ color, enabled, type }: BarProps) {
  return (
    <div
      className={`${type} ${enabled ? 'enabled' : 'disabled'}`}
      style={enabled ? { background: color, color: color } : {}}
    />
  )
}
