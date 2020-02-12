import React from 'react'
import { Form, Input, Table, Select } from 'antd'
import useStore from '../store/useStore'
import { SET_IS_EDITING, SET_SUBJECTS } from '../store/actions'
import { gradeDict } from '../helpers/gradeDict'

const GradeSelect = props => {
  const { Option } = Select
  return (
    <>
      <Select style={{ width: 80 }} {...props}>
        <Option value={null}>--</Option>
        {Object.keys(gradeDict).map(key => {
          return (
            <Option key={key} value={gradeDict[key]}>
              {key}
            </Option>
          )
        })}
      </Select>
    </>
  )
}

export default ({ columns }) => {
  const { state, dispatch } = useStore()

  const handleOk = () => {
    console.log(state.selectedSubjectKeys)
  }

  const handleCancel = () => {
    dispatch(SET_IS_EDITING, false)
  }

  const handleGradeChange = subjectCode => {
    return newGrade => {
      const newSubjects = state.subjects.map(subj => {
        if (subj.code === subjectCode)
          return {
            ...subj,
            grade: newGrade
          }
        return subj
      })
      dispatch(SET_SUBJECTS, newSubjects)
    }
  }

  const selectedSubject = state.subjects
    .filter(item => state.selectedSubjectKeys.includes(item.code))
    .map(item => ({
      key: item.code,
      ...item,
      grade: (
        <GradeSelect
          subjectCode={item.code}
          onChange={handleGradeChange(item.code)}
          defaultValue={item.grade}
        />
      )
    }))

  return (
    <div>
      <Form>
        <Table
          columns={columns}
          dataSource={selectedSubject}
          pagination={false}
        />
      </Form>
    </div>
  )
}
