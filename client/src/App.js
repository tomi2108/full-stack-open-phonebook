import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Display from "./components/Display";
import Notification from "./components/Notification";
import PersonsServices from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setnewNumber] = useState("");
  const [searching, setSearching] = useState("");
  const [searchedArr, setSearchedArr] = useState([]);
  const [notiObj, setNotiObj] = useState({ message: "", flag: -1 });

  useEffect(() => {
    PersonsServices.getAll().then((resp) => {
      setPersons(resp);
      setSearchedArr(resp);
    });
  }, []);

  const nameChange = (e) => {
    setNewName(e.target.value);
  };
  const phoneChange = (e) => {
    setnewNumber(e.target.value);
  };

  const searchingChange = (e) => {
    const s = e.target.value.toLowerCase();
    setSearching(s);
    const regex = new RegExp(s, "g");
    const filtArr = persons.filter((person) => person.name.toLowerCase().match(regex) !== null);
    setSearchedArr(filtArr);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name.trim().toLowerCase() === newName.trim().toLowerCase());
    if (existingPerson) {
      const personObject = { name: newName, number: newNumber, id: existingPerson.id };
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        PersonsServices.update(existingPerson.id, personObject)
          .then((res) => {
            setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : res.data)));
            setSearchedArr(searchedArr.map((person) => (person.id !== existingPerson.id ? person : res.data)));
            setNotiObj({ message: `${personObject.name}'s phone number updated `, flag: 1 });
            setTimeout(() => setNotiObj({ message: "", flag: -1 }), 4000);
          })
          .catch((err) => {
            setPersons(persons.filter((person) => person.id !== existingPerson.id));
            setSearchedArr(searchedArr.filter((person) => person.id !== existingPerson.id));
            setNotiObj({ message: `${existingPerson.name} was already deleted from the phonebook`, flag: 0 });
            setTimeout(() => setNotiObj({ message: "", flag: -1 }), 4000);
          });
      } else return;
    } else {
      const personObject = { name: newName, number: newNumber };
      PersonsServices.create(personObject)
        .then((res) => {
          setPersons(persons.concat(res));
          setSearchedArr(persons.concat(res));
          setNotiObj({ message: `${personObject.name}'s phone number added to phonebook `, flag: 1 });
          setTimeout(() => setNotiObj({ message: "", flag: -1 }), 4000);
        })
        .catch((err) => {
          if (newName.length < 3 && newName !== "") {
            setNotiObj({ message: `Person validation error: Name must be at least three (3) characters long`, flag: 0 });
          } else if (!(newName && newNumber)) setNotiObj({ message: `Person validation eror: Name or number missing`, flag: 0 });
          setTimeout(() => setNotiObj({ message: "", flag: -1 }), 4000);
        });
    }
    setNewName("");
    setnewNumber("");
    setSearching("");
  };

  const handleDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      PersonsServices.erase(id).then((res) => {
        setPersons(persons.filter((person) => person.id !== id));
        setSearchedArr(searchedArr.filter((person) => person.id !== id));
        setNotiObj({ message: `${person.name}'s phone number deleted from phonebook `, flag: 1 });
        setTimeout(() => setNotiObj({ message: "", flag: -1 }), 4000);
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notiObj={notiObj} />
      <Filter onChange={searchingChange} searching={searching} />
      <h2>Add new person</h2>
      <p>Persons name must be at least 3 characters long</p>
      <p>Number must be at least 8 characters long and be of type "xxx-xxxxxx"</p>
      <PersonForm addPerson={addPerson} nameChange={nameChange} phoneChange={phoneChange} newName={newName} newPhone={newNumber} />
      <h2>Numbers</h2>
      <Display handleDelete={handleDelete} state={searchedArr} />
    </div>
  );
};

export default App;
