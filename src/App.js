import logo from './logo.svg';
import './App.css';

import * as React from "react";
import { Admin, useResetStore, Resource, EditGuesser, ListGuesser, ShowGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import users from './pages/users'
import ballEvent from './pages/ballEvent'

import resources from './resources/'

import Dashboard from './Dashboard';

import authProvider from './provider/authProvider';
import dataProvider from './provider/dataProvider';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const checkRole = (roles, permissions) => {
  if (!permissions) return false;
  if (permissions.includes("__super_admin__")) return true;
  if (permissions.includes("admin")) return true;

  let found = false;
  roles.some(role => {
    if (permissions.includes(role)) {
      found = true;
    }
    return found;
  });
  return found;
};

const App = () => (
<Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
{/* {permissions => (
        <>
           <Resource name="users" {...users} />
            <Resource name="ballEvent" {...ballEvent} />
  
  {permissions && permissions.includes('Admin')
                ? <Resource name="venue" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
                : null}
        </>
    )} */}



{(permissions) => {
        return resources.map(({name, options, ...otherProps}) => {
          let newOtherProps = {...otherProps};
          let newOptions = {...options};
          if (options) {
            if (options.roles) {
              if (options.roles.list) {
                let found =
                  options.roles.list.length === 0
                    ? true
                    : checkRole(options.roles.list, permissions);
                newOtherProps.list = found ? otherProps.list : null;
                newOtherProps.show = found ? otherProps.show : null;
                newOptions.disabled = !found;
              }
              if (options.roles.edit) {
                let found =
                  options.roles.edit.length === 0
                    ? true
                    : checkRole(options.roles.edit, permissions);
                newOtherProps.edit = found ? otherProps.edit : null;
              }
              if (options.roles.create) {
                let found =
                  options.roles.create.length === 0
                    ? true
                    : checkRole(options.roles.create, permissions);
                newOtherProps.create = found ? otherProps.create : null;
              }
            }
          }
          return (
            <Resource
              key={name}
              name={name}
              options={newOptions}
              {...newOtherProps}
            />
          );
        });
      }}    
  
</Admin>
)

;

export default App;
