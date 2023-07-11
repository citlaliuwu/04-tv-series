const Personajes = ({ person, character }) => {
  return (
    <div>
      <h5>{person.name}</h5>
      <p>As {character.name}</p>
    </div>
  )
}

export default Personajes
