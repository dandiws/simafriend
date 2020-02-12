import React, { useState, useEffect } from 'react'
import './App.css'
import { findSubjectsFromHTML } from './helpers/helpers'
import Simulation from './components/Simulation'
import localStorageService from './helpers/localStorageService.js'
import { Layout, Row, Col, Button, Input } from 'antd'

import useStore, { StoreProvider } from './store/useStore.js'
import {
  SET_SOURCE_HTML,
  SET_IS_SIMULATION,
  SET_SUBJECTS
} from './store/actions'

function App() {
  const { state, dispatch } = useStore()

  useEffect(() => {
    const mataKuliah = localStorageService().getMataKuliah()
    if (mataKuliah) {
      dispatch(SET_IS_SIMULATION, true)
      dispatch(SET_SUBJECTS, mataKuliah)
    }
  }, [])

  const handleClick = () => {
    const subjects = findSubjectsFromHTML(state.sourceHTML)
    localStorageService().setMataKuliah(subjects)
    dispatch(SET_IS_SIMULATION, true)
    dispatch(SET_SUBJECTS, subjects)
  }

  return (
    <div>
      <Layout>
        <Layout.Header
          style={{
            backgroundColor: '#ffffff00'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1>Simafriend</h1>
          </div>
        </Layout.Header>
        <Layout.Content style={{ padding: '1em 5em' }}>
          {!state.isSimulation ? (
            <Row type="flex" justify="center">
              <Col span={24}>
                <div className="source-code" style={{ marginTop: 30 }}>
                  <fieldset>
                    <Input.TextArea
                      id="rekap-nilai"
                      rows={15}
                      placeholder="Masukan source code disini"
                      className="code-area"
                      onChange={e => dispatch(SET_SOURCE_HTML, e.target.value)}
                    />
                    <Button
                      style={{ marginTop: 20 }}
                      onClick={handleClick}
                      type="primary"
                    >
                      Start simulation
                    </Button>
                  </fieldset>
                </div>
              </Col>
            </Row>
          ) : (
            <div>
              <Simulation />
            </div>
          )}
        </Layout.Content>
        <Layout.Footer>
          <div style={{ textAlign: 'center' }}>
            &copy; Copyright 2019 &bull; Dandi Wiratsangka S
          </div>
        </Layout.Footer>
      </Layout>
    </div>
  )
}

export default () => {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  )
}
