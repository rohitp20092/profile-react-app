import { ErrorMessage, FieldArray, Formik } from 'formik'
import { Field, Form } from 'formik-antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { value } from '../action/action'
import {Button} from 'react-bootstrap'

function EditProfile() {
  const dispatch = useDispatch()
  const profile_data = useSelector(state => state)
  const Navigate = useNavigate()

  console.log(profile_data)
  return (
    <div className="edit-profile container mt-5">
      <Formik
        initialValues={{
          firstname: profile_data[0].firstname,
          lastname: profile_data[0].lastname,
          skills: profile_data[0].skills,
          experience: profile_data[0].experience
        }}
        onSubmit={values => {
          localStorage.setItem('profiledata', JSON.stringify(values))
          dispatch(value(values))
          Navigate('/view-profile')
        }
        }>
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <h1>Basic Details</h1>
            <label>First Name:</label>
            <Field type="text" name="firstname" value={values.firstname} onChange={handleChange} />
            <label>Last Name:</label>
            <Field type="text" name="firstname" value={values.lastname} onChange={handleChange} />
            <h1>Experience</h1>
            <FieldArray
              name="experience">
              {arrayHelpers => (
                <div>
                  {values.experience && values.experience.length > 0 ? (
                    values.experience.map((friend, index) => (
                      <div key={index}>
                        <div>
                          <label>Company Name</label>
                          <Field name={`experience[${index}].company`} type="text" />
                        </div>
                        <div>
                          <label>Title</label>
                          <Field name={`experience[${index}].title`} type="text" />
                        </div>

                        <div>
                          <label>Start Date</label>
                          <Field name={`experience[${index}].start_date`} type="date" />
                        </div>
                        <div>
                          <label>End Date</label>
                          <Field name={`experience[${index}].end_date`} type="date" />
                        </div>
                        <div>
                          <label>Desctiption</label>
                          <Field name={`experience[${index}].description`} type="text" />
                          <p style={{ color: "red" }}><ErrorMessage name={`experience[${index}].description`} /></p>

                        </div>


                        <Button
                          type="buttfriendson"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </Button>
                        <Button
                          type="Button"
                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                        >
                          +
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button type="Button" onClick={() => arrayHelpers.push('')} variant="primary">
                      {/* show this when user has removed all friends from the list */}
                      Add Experience
                    </Button>
                  )}
                  <div>
                  </div>
                </div>
              )}
            </FieldArray>

            <h1>Skills</h1>

            <FieldArray
              name="skills">
              {arrayHelpers => (
                <div>
                  {values.skills && values.skills.length > 0 ? (
                    values.skills.map((skill, index) => (
                      <div key={index}>
                        <Field name={`skills.${index}`} />
                        <Button
                          type="Button"
                          onClick={() => arrayHelpers.remove(index)} // remove a skill from the list
                        >
                          -
                        </Button>
                        <Button
                          type="Button"
                          onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                        >
                          +
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Button type="Button" onClick={() => arrayHelpers.push('')} className="primary">
                      {/* show this when user has removed all skills from the list */}
                      Add a skill
                    </Button>
                  )}

                </div>
              )}
            </FieldArray>

            <Button className="mt-5" type="submit" variant="success">submit</Button>
          </Form>
        )}


      </Formik>

    </div>
  )
}

export default EditProfile
