import React, { useContext, useEffect, useState } from 'react';
import { getHelloWorld } from '../services/student-service';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../contexts/theme-context';

const Home = () => {
  const [students, setStudents] = useState([])
  const { theme, handleColorTheme } = useContext(ThemeContext);
  console.log(theme)

  useEffect(() => {
    getHelloWorld()
      .then(apiStudents => {
        setStudents(apiStudents)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div className={`d-flex align-items-center flex-column justify-content-center vw-100 vh-100 bg-${theme}`}>
      <h1 className={`text-${theme === 'light' ? 'dark' : 'light'}`}>STUDENTS:</h1>

      {students.map(student => {
        return (
          <div key={student.name}>
            <Link to={`/student/${student._id}`}>
              {student.name} | {student.age}
            </Link>
          </div>
        )
      })}

      <div className="mt-4">
        <h3 className={`text-${theme === 'light' ? 'dark' : 'light'}`}> Change theme to:</h3>
        <button onClick={handleColorTheme} className={`mt-2 btn btn-${theme}`}>{theme === 'light' ? 'dark' : 'light'}</button>
      </div>

    </div>
  );
};

export default Home;
