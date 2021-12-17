import React, { useState } from 'react'
import { Field, FieldArray, Formik, ErrorMessage } from 'formik'
import { Form } from 'formik-antd'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { value } from '../action/action';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'

function InputProfile() {
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
  }

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname is required"),

    lastname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is required"),

    description: Yup.string()
      .max(300, "too long keep under 300 words")

  });

  return (
    <Formik
      initialValues={{
        firstname: ""
        , lastname: "",
        tagline: "",
        skills: [],
        experience: [{
          company: "",
          title: "",
          start_date: "",
          end_date: "",
          description: ""
        }]
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        localStorage.setItem('profiledata', JSON.stringify(values))
        dispatch(value(values))
        Navigate('/view-profile')
      }
      }>
      {({ values }) => (
        <Form onSubmit={handleSubmit} className="profile-input-form container mt-5">
          <h1 className="my-2">Basic Details</h1>
          <label>First Name</label>
          <Field name="firstname" type="text" /><br />
          <p style={{ color: "red" }}><ErrorMessage name="firstname" /></p>

          <label>Last Name</label>
          <Field name="lastname" type="text" />
          <p style={{ color: "red" }}><ErrorMessage name="lastname" /></p>

          <label>Tagline</label>
          <Field name="tagline" type="text" />

          <h1 className="my-2">Experience</h1>
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


                      <button
                        type="buttfriendson"
                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <Button type="button" onClick={() => arrayHelpers.push('')} variant="primary">
                    {/* show this when user has removed all friends from the list */}
                    Add Experience
                  </Button>
                )}
                <div>
                </div>
              </div>
            )}
          </FieldArray>

          <h3 className="my-2 ">Skills</h3>
          <FieldArray
            name="skills">
            {arrayHelpers => (
              <div>
                {values.skills && values.skills.length > 0 ? (
                  values.skills.map((skill, index) => (
                    <div key={index}>
                      <Field name={`skills.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a skill from the list
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                      >
                        +
                      </button>
                    </div>
                  ))
                ) : (
                  <Button type="button" onClick={() => arrayHelpers.push('')} className="primary">
                    {/* show this when user has removed all skills from the list */}
                    Add a skill
                  </Button>
                )}

              </div>
            )}
          </FieldArray>
          <Button type="submit" className=" mt-5"  variant="success">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}

export default InputProfile
