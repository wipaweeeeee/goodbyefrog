import React, { useState } from 'react'
import styles from './styles.module.css'
import '@exa/system/src/components/exa-base-elements/exa-base-element.js'
import '@exa/system/src/components/exa-base-elements/exa-dialog-base-element.js'
import '@exa/system/src/components/exa-dialog/exa-dialog-element.js'
const ExaDialogReact = (props) => {
  
  const [open, setOpen] = useState()
  const hasBackdrop = props.hasBackdrop || true
  const isModal = props.isModal || true
  return (
    <exa-dialog data-backdrop={hasBackdrop} data-modal={isModal}>
      {props.header && (
        <header className='exa-dialog__header'>{props.header}</header>
      )}
      <div className='exa-dialog__body'>{props.children}</div>
      {props.footer && (
        <footer className='exa-dialog__footer'>{props.footer}</footer>
      )}
    </exa-dialog>
  )
}
export default ExaDialogReact;
