import { FieldArray, Formik, ErrorMessage } from 'formik'
import { Field } from 'formik-antd';
import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as Yup from 'yup'

function EditProfile() {
  const Navigate = useNavigate()
  var profileData = JSON.parse(localStorage.getItem('profiledata'))
  const state1 = useSelector(state => state)

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Firstname is required"),

    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Lastname is required"),
  });

  return (
    <>
      {
        profileData ?
          <div className="inputprofile">
            < Formik
              initialValues={{
                firstname: profileData.firstname,
                lastname: [profileData.lastname],
                experience: state1[0]?.experience,
                skills: state1[0]?.skills,
                tagline: profileData.tagline
              }
              }

              validationSchema={validationSchema}
              onSubmit={values => {
                localStorage.setItem('profileData', values)
                Navigate('/view-profile')
              }
              }>
              {(props) => {
                const {
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit
                } = props;
                localStorage.setItem('profiledata', JSON.stringify(values))

                return (
                  <form onSubmit={handleSubmit} className="profile-input-form container mt-5">
                    <h1>Basic Details</h1>
                    <label>firstname:</label>
                    <input
                      type="text"
                      name="firstname"
                      placeholder={values.firstname}
                      value={values.firstname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p style={{ color: "red" }}><ErrorMessage name="firstname" /></p>

                    <label>Last Name:</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder={values.lastname}
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p style={{ color: "red" }}><ErrorMessage name="lastname" /></p>

                    <label>Tagline:</label>
                    <input
                      type="text"
                      name="lastname"
                      placeholder={values.tagline}
                      value={values.tagline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <p style={{ color: "red" }}><ErrorMessage name="lastname" /></p>

                    <h1>Experience</h1>
                    <FieldArray
                      name="experience">
                      {arrayHelpers => (
                        <div>
                          {values.experience && values.experience.length > 0 ? (
                            values.experience.map((friend, index) => (
                              <div key={index}>
                                <div>
                                  <label>company name</label>
                                  <Field name={`experience[${index}].company`} type="text" placeholder={values.experience[index].company} onChange={handleChange} />
                                </div>
                                <div>
                                  <label>title</label>
                                  <Field name={`experience[${index}].title`} type="text" onChange={handleChange} />
                                </div>

                                <div>
                                  <label>start date</label>
                                  <Field name={`experience[${index}].start_date`} type="date" onChange={handleChange} />
                                </div>
                                <div>
                                  <label>end_date</label>
                                  <Field name={`experience[${index}].end_date`} type="date" onChange={handleChange} />
                                </div>

                                <div>
                                  <label>desctiption</label>
                                  <Field name={`experience[${index}].description`} type="text" onChange={handleChange} />
                                  <p style={{ color: "red" }}><ErrorMessage name="description" /></p>

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
                            <Button type="button" onClick={() => arrayHelpers.push('')} className="success">
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
                                <Field name={`skills[${index}]`} />
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
                    <Button type="submit" className=" mt-5" variant="success">Edit Submit</Button>
                  </form>
                );
              }}
            </Formik >

          </div > : <h1>No data found</h1>}
    </>

  )
}

export default EditProfile
