import { ButtonHTMLAttributes } from 'react'
import './Style-button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(buttonProps: ButtonProps) {
  return (
    <div className="style-button">
      <button className="Button" {...buttonProps} />
    </div>
  )
}
