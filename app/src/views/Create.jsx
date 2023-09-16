import React, { useEffect, useState } from 'react';
import { createStudent, getStudent, updateStudent } from '../services/student-service';
import { useNavigate, useParams } from 'react-router-dom';

const Create = ({ isEditing }) => {
  const [student, setStudent] = useState({ name: '', age: 0 })
  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      getStudent(id)
        .then(apiStudent => {
          setStudent(apiStudent)
        })
        .catch(err => console.error(err))
    }
  }, [])

  const handleChange = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setStudent({
      ...student,
      [key]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (isEditing) {
      updateStudent(student._id, student)
        .then(student => {
          navigate(`/student/${student._id}`)
        })
        .catch(err => console.error(err))
    } else {
      createStudent(student)
        .then(res => {
          navigate('/')
        })
        .catch(err => console.error(err))
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>NAME</label>
        <input onChange={handleChange} type="text" name="name" value={student.name} id="name-input" />
        <label>AGE</label>
        <input onChange={handleChange} type="number" name="age" value={student.age} id="age-input" />
        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
};

export default Create;
