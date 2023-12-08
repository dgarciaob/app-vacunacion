import React, { useState, createContext } from "react";

// creamos el contexto para usar el USER a través de toda el App. Básicamente crearemos un contexto que, mediante un componente
// abarque toda el App.

const UserContext = createContext(); // a partir de este contexto creado, puedo usar el hook useContext en otra screen
// con cualquiera de los values que estoy pasando en el Provider

// creamos el Provider que wrappeará toda el App. Debemos agregar como props a children, pq todos los hijos dentro del
// Provider podran consumir el contexto.

export function UserProvider({ children }) {
  const [profiles, setProfiles] = useState([]);
  const [nextId, setNextId] = useState(1); // Contador para los IDs de perfil, este será el reconocedor de perfiles
  const [dateOfBirth, setDateOfBirth] = useState(null); // Nuevo estado para la fecha de nacimiento
  const [activeProfileId, setActiveProfileId] = useState(null);

  const addProfile = (profile) => {
    setProfiles([...profiles, { ...profile, id: nextId }]);
    setDateOfBirth(profile.date); // Actualiza la fecha de nacimiento al agregar un perfil
    setNextId(nextId + 1); // Incrementar el ID para el próximo perfil creado
  };

  const setActiveProfile = (id) => {
    setActiveProfileId(id); // para identificar el ID correspondiente al perfil activo
  };

  // Función para editar un perfil

  const editProfile = (updatedProfile) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
  };

  // Función para eliminar un perfil

  const removeProfile = (profileId) => {
    setProfiles(profiles.filter((profile) => profile.id !== profileId));
  };

  // Devolvemos el Provider con el contexto creado y los valores que queremos pasar a los hijos. En este caso el "hijo" es toda el app (ver navigation.js).

  return (
    <UserContext.Provider
      value={{
        profiles,
        addProfile,
        setProfiles,
        editProfile,
        removeProfile,
        dateOfBirth,
        activeProfileId,
        setActiveProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
