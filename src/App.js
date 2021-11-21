import {useState, useEffect} from 'react'
import './App.css';
import {Button, Form, Container, Header, Table} from 'semantic-ui-react'
import axios from 'axios'

function App() {

    const [code, setCode] = useState('');
    const [subject, setSubject] = useState('');
    const [section, setSection] = useState('');
    const [capacity, setCapacity] = useState('');
    const [student, setStudent] = useState('');
    const [lecturer, setLecturer] = useState('');
    const [classroom, setClassroom] = useState('');
    const [day, setDay] = useState('');
    const [time, setTime] = useState('');
    const [data, setData] =  useState(null);

    const userData = {
      code,
      subject,
      section,
      capacity,
      student,
      lecturer,
      classroom,
      day,
      time
    }

  /* useEffect(() => {
      getSheet()
    },[]);
    useEffect(() => {
      getSheet()
    },[data]); */

    const submitHandler = (e) => {
      e.preventDefault();
      console.log(code, subject, section, capacity, student, lecturer, classroom, day, time);

      axios.post('https://sheet.best/api/sheets/3ed01875-5031-40d2-9cf1-d41fe00161aa', userData)
            .then(res => {
              console.log(res);
              alert('successfully');
              window.location.reload();
            })
            setCode('');
            setSubject('');
            setSection('');
            setCapacity('');
            setStudent('');
            setLecturer('');
            setClassroom('');
            setDay('');
            setTime('');     
    }

    useEffect(() => {
      axios.get('https://sheet.best/api/sheets/3ed01875-5031-40d2-9cf1-d41fe00161aa')
        .then(res => setData(res))
        console.log(data);
    }, []);

    if (!data) {
      return <div />;
    }

    console.log(data);

    
    // const getSheet = () => {
    //   axios.get('https://sheet.best/api/sheets/3ed01875-5031-40d2-9cf1-d41fe00161aa')
    //         .then(res => {

    //           console.log(res);
    //            setData(res.data)
    //         })
          
    // }
    
    

  return (
    <Container className="container">
      <br />
        <Header as="h2">
          Manage Class Schedule
        </Header>
        <Form onSubmit={submitHandler} className="form">
          {/* {JSON.stringify(data)} */}
          <Form.Field>
            <label htmlFor="name">Subject Code</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder = "Enter your Subject Code" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder = "Enter your Subject" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Section</label>
            <input type="text" value={section} onChange={(e) => setSection(e.target.value)} placeholder = "Enter your Section" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Capacity</label>
            <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder = "Enter your Capacity" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Student Group</label>
            <input type="text" value={student} onChange={(e) => setStudent(e.target.value)} placeholder = "Enter your Student Group" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Lecturer</label>
            <input type="text" value={lecturer} onChange={(e) => setLecturer(e.target.value)} placeholder = "Enter your Lecturer" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Classroom</label>
            <input type="text" value={classroom} onChange={(e) => setClassroom(e.target.value)} placeholder = "Enter your Classroom" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Days</label>
            <input type="text" value={day} onChange={(e) => setDay(e.target.value)} placeholder = "Enter your Days" /> 
          </Form.Field>
          <Form.Field>
            <label htmlFor="name">Times</label>
            <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder = "Enter your Times" /> 
          </Form.Field>

          <Button color="blue" type="submit"> Submit </Button>
        </Form>

        <hr />
        <Table celled>
          <Table.Header>
            <Table.HeaderCell>Subject Code</Table.HeaderCell>
            <Table.HeaderCell>Subject</Table.HeaderCell>
            <Table.HeaderCell>Section</Table.HeaderCell>
            <Table.HeaderCell>Capacity</Table.HeaderCell>
            <Table.HeaderCell>Student Group</Table.HeaderCell>
            <Table.HeaderCell>Lecturer</Table.HeaderCell>
            <Table.HeaderCell>Classroom</Table.HeaderCell>
            <Table.HeaderCell>Days</Table.HeaderCell>
            <Table.HeaderCell>Times</Table.HeaderCell>
          </Table.Header>

          <Table.Body>
            {data.data.map((val, idx) => (
              <Table.Row key={idx}>
                  <Table.Cell>{val.code}</Table.Cell>
                  <Table.Cell>{val.subject}</Table.Cell>
                  <Table.Cell>{val.section}</Table.Cell>
                  <Table.Cell>{val.capacity}</Table.Cell>
                  <Table.Cell>{val.student}</Table.Cell>
                  <Table.Cell>{val.lecturer}</Table.Cell>
                  <Table.Cell>{val.classroom}</Table.Cell>
                  <Table.Cell>{val.day}</Table.Cell>
                  <Table.Cell>{val.time}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

    </Container>
  );
}

export default App;