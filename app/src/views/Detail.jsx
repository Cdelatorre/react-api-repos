import React, { useEffect, useRef, useState } from 'react';
import { getStudent, updateStudent } from '../services/student-service';
import { Link, useParams } from 'react-router-dom';
import { createLike, deleteLike } from '../services/like-service';

const Detail = () => {
  const [student, setStudent] = useState(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { id } = useParams()

  const buttonRef = useRef(null)

  const handleChange = (ev) => {
    const key = ev.target.name;
    const value = ev.target.value;

    setStudent({
      ...student,
      [key]: value
    })
  }

  const handleOnBlur = () => {
    updateStudent(student._id, student)
      .then(apiStudent => {
        setStudent(apiStudent)
        setIsEditing(false)
      })
  }

  const handleEdit = () => {

  }

  const handleLike = () => {
    if (student && !isLiked) {
      createLike(student._id)
        .then(res => {
          setIsLiked(true)
        })
    } else {
      deleteLike(student._id)
        .then(res => {
          setIsLiked(false)
        })
    }
  }

  useEffect(() => {
    getStudent(id)
      .then(apiStudent => {
        setIsLiked(!!apiStudent.like)
        setStudent(apiStudent)
      })
      .catch(err => console.log(err))
  }, [id])

  if (!student) return <p>Loading</p>

  return (
    <div>
      <h1>Detalle Usuario</h1>
      <div >
        {isEditing
          ? <input onBlur={handleOnBlur} name="name" value={student.name} onChange={handleChange}></input>
          : <h3 onClick={() => setIsEditing(!isEditing)}>{student.name}</h3>
        }
      </div>


      <h2>{student.age}</h2>

      <button ref={buttonRef} style={{ backgroundColor: isLiked ? 'red' : 'black' }} onClick={handleLike}>
        LIKE
      </button>

      <Link to={`/student/${student._id}/edit`}>
        Edit
      </Link>
    </div >
  );
};

export default Detail;
