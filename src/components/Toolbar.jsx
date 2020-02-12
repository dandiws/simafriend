import React from 'react'
import localStorageService from '../helpers/localStorageService'
import useStore from '../store/useStore'
import {
  SET_SOURCE_HTML,
  SET_IS_SIMULATION,
  SET_IS_EDITING,
  SET_SUBJECTS
} from '../store/actions'
import { Button, Input, Row, Col } from 'antd'

const Toolbar = ({ buttons, textbox, ...props }) => {
  return (
    <div {...props}>
      <Row>
        <Col span={textbox ? 16 : 24}>
          {buttons.map(({ text, ...btnProps }, i) => {
            return (
              <Button key={i} className="toolbar-btn" {...btnProps}>
                {text}
              </Button>
            )
          })}
        </Col>
        {textbox ? (
          <Col span={8}>
            <Input {...textbox} />
          </Col>
        ) : null}
      </Row>
    </div>
  )
}

export const SimulationToolbar = ({
  onDrop,
  onQueryChange,
  onReset,
  ...props
}) => {
  const { dispatch } = useStore()
  const handleStartOver = () => {
    localStorageService().clearMataKuliah()
    dispatch(SET_IS_SIMULATION, false)
    dispatch(SET_SOURCE_HTML, '')
  }

  return (
    <Toolbar
      {...props}
      buttons={[
        {
          text: 'Start Over',
          icon: 'reload',
          onClick: handleStartOver
        },
        {
          text: 'Edit',
          icon: 'edit',
          onClick: () => dispatch(SET_IS_EDITING, true)
        },
        {
          text: 'Drop',
          icon: 'delete',
          onClick: onDrop
        },
        {
          text: 'Reset',
          icon: 'fast-backward',
          onClick: onReset
        }
      ]}
      textbox={{
        placeholder: 'Search subject by code, name, etc',
        onChange: onQueryChange
      }}
    />
  )
}

export const EditToolbar = () => {
  const { dispatch } = useStore()
  return (
    <Toolbar
      buttons={[
        {
          text: 'Back',
          icon: 'arrow-left',
          onClick: () => dispatch(SET_IS_EDITING, false)
        }
      ]}
    />
  )
}
export default Toolbar
