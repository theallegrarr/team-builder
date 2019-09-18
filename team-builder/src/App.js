import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import uuid from 'uuid';

const teamList = [
  { id: uuid(), name: 'John', age: 32, skill: 'Java' },
  { id: uuid(), name: 'Peter', age: 30, skill: 'C++' },
  { id: uuid(), name: 'Clarke', age: 27, skill: 'Node.js' }
]

const formData = {name: '', age: '', skill: ''}

function App() {
  const [ form, setForm ] = useState(formData);
  const [ team, setMembers ] = useState(teamList);
  const [ memberToEdit, modifyMember ] = useState();

  const onAgeChange = e => {
    setForm({ name: form.name, age: e.target.value, skill: form.skill });
    console.log(e.target, form);
  }

  const onNameChange = e => {
    setForm({ name: e.target.value, age: form.age, skill: form.skill });
    console.log(e.target, form);
  }

  const onSkillChange = e => {
    setForm({ name: form.name, age: form.age, skill: e.target.value });
    console.log(e.target, form);
  }

  const onFormSubmit = e => {
    e.preventDefault();
    
    const newMember = {
      id: uuid(),
      name: form.name,
      age: form.age,
      skill: form.skill,
    };

    const newTeamList = team.concat(newMember);

    setMembers(newTeamList);
    setForm(formData);
  }

  const onEdit = (e) => {
    e.preventDefault();
    const newList = team.filter(member => member.id !== e.target.id);
    const newFormData = team.filter(member => member.id === e.target.id);

    //console.log(e.target.id, ' ', newList, ' ', newFormData);
    setMembers(newList);
    setForm(newFormData[0]);
  }

  return (
    <div className="App">
      <header className="App-header">
      
        <Form 
          onChange = {onAgeChange}
          onSkillChange = {onSkillChange}
          onNameChange = {onNameChange}
          onSubmit = {onFormSubmit}
          form = {form}
        />
        {
        team.map(member => (
          <h5 key={member.id}>
            {member.name} is {member.age} years old and codes {member.skill}  
          <a
            onClick = {onEdit} 
            id = {member.id}
          >  EDIT</a>
          </h5>
        ))
      }
      </header>
    </div>
  );
}

function Form(props) {
  // what data does the form need to populate itself?
  // what callbacks does the form need to perform
  // its basic functions of updating fields and submitting?
  const { onNameChange, onSkillChange, onChange, onSubmit, form } = props;
  const isDisabled = () => {
    if (!form.name || !form.age || !form.skill) {
      return true;
    }
    return false;
  }

  return (
    <form>
      <label htmlFor='nameInput'>Name: </label>
      <input onChange={onNameChange} id='nameInput' type='text' value={form.name} /><br></br>

      <label htmlFor='ageInput'>Age: </label>
      <input onChange={onChange} id='ageInput' type='text' value={form.age}/><br></br>

      <label htmlFor='skillInput'>Skill: </label>
      <input onChange={onSkillChange} id='skillInput' type='text' value={form.skill} /><br></br>

      <button
        disabled={isDisabled()}
        onClick={onSubmit}
      >
        Add
        </button>
    </form>
  );
}

export default App;
