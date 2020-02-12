import React, { useState, useEffect } from 'react'
import { calculateGPA, countByType, countByGrade } from './../helpers/helpers'
import { Row, Col, Table, Button, Card, Popover, Affix } from 'antd'
import useStore from '../store/useStore'
import { SET_SELECTED_SUBJECT_KEYS, SET_IS_EDITING } from '../store/actions'
import Edit from './Edit'
import { SimulationToolbar, EditToolbar } from './Toolbar'

const columns = [
  {
    title: 'Kode',
    dataIndex: 'code'
  },
  {
    title: 'Mata Kuliah',
    dataIndex: 'name'
  },
  {
    title: 'SKS',
    dataIndex: 'sks'
  },
  {
    title: 'Jenis',
    dataIndex: 'type'
  },
  {
    title: 'Kelompok',
    dataIndex: 'group'
  },
  {
    title: 'Ke',
    dataIndex: 'nth'
  },
  {
    title: 'Nilai',
    dataIndex: 'grade'
  }
]

const Simulation = () => {
  const { dispatch, state } = useStore()
  const [toolbarAffixed, setToolbarAffixed] = useState(false)
  const [tableData, setTableData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setTableData(state.subjects)
  }, [state.subjects])

  const onSelectChange = selectedRowKeys => {
    dispatch(SET_SELECTED_SUBJECT_KEYS, selectedRowKeys)
  }

  const handleSubjectDrop = () => {
    const selectedSubjectKeys = state.selectedSubjectKeys
    const remain = tableData.filter(subj => {
      return !selectedSubjectKeys.includes(subj.code)
    })

    setTableData(remain)
    dispatch(SET_SELECTED_SUBJECT_KEYS, [])
  }

  const handleQueryChange = e => {
    const query = e.target.value.toLowerCase()
    if (query) {
      const results = tableData.filter(subj => {
        return Object.values(subj)
          .join(' ')
          .toLowerCase()
          .includes(query)
      })

      setTableData(results)
    } else {
      setTableData(state.subjects)
    }
  }

  const handleSubjectReset = () => {
    setTableData(state.subjects)
  }

  const wajibSubject = countByType('Wajib', state.subjects)
  const pilihanSubject = countByType('Pilihan', state.subjects)
  const gradeCount = countByGrade(state.subjects)
  const countGradeStyle = {
    border: '1px solid rgba(0,0,0,0.1)',
    padding: 8,
    textAlign: 'center'
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Affix
            offsetTop={30}
            className={
              toolbarAffixed ? 'toolbar-affixed-true' : 'toolbar-affixed-false'
            }
            onChange={affixed => {
              setToolbarAffixed(affixed)
            }}
          >
            {state.isEditing ? (
              <EditToolbar />
            ) : (
              <SimulationToolbar
                onDrop={handleSubjectDrop}
                onQueryChange={handleQueryChange}
                onReset={handleSubjectReset}
              />
            )}
          </Affix>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          {state.isEditing ? (
            <>
              <Edit columns={columns} />
            </>
          ) : (
            <>
              <Table
                rowKey={row => row.code}
                rowSelection={{
                  selectedRowKeys: state.selectedSubjectKeys,
                  onChange: onSelectChange,
                  selections: true
                }}
                columns={columns}
                dataSource={tableData}
                pagination={false}
              />
              <div style={{ lineHeight: 1.7 }}>
                showing {tableData.length} of {state.subjects.length} subjects
              </div>
            </>
          )}
        </Col>
        <Col span={8}>
          <Affix offsetTop={80}>
            <Popover
              content="See real time changes here"
              visible={state.isEditing}
            >
              <Card className={state.isEditing ? 'card-highlighted' : ''}>
                <h4>GPA Index: {calculateGPA(tableData)}</h4>
                <h4>
                  Matkul Wajib: {wajibSubject.count} ({wajibSubject.sks} SKS)
                </h4>
                <h4>
                  Matkul pilihan: {pilihanSubject.count} ({pilihanSubject.sks}{' '}
                  SKS)
                </h4>
                <table>
                  <thead>
                    <tr>
                      <th style={countGradeStyle}>Grade</th>
                      {Object.keys(gradeCount).map((key, i) => {
                        if (key) {
                          return (
                            <th key={i} style={countGradeStyle}>
                              {key}
                            </th>
                          )
                        }
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th style={countGradeStyle}>Count</th>
                      {Object.values(gradeCount).map((value, i) => {
                        if (value >= 0) {
                          return (
                            <td key={i} style={countGradeStyle}>
                              {value}
                            </td>
                          )
                        }
                      })}
                    </tr>
                  </tbody>
                </table>
              </Card>
            </Popover>
          </Affix>
        </Col>
      </Row>
    </>
  )
}

export default Simulation
