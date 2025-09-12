import React, { useEffect, useState } from "react";
import axios from "axios";
import "./p1.css";

export default function Page2() {
 const [users, setUsers] = useState([]);
 const [editUser, setEditUser] = useState(null);


  // useEffect(() => {
  //        loadUsers();
  //    }, []);
    
  //    const loadUsers = () => {
  //        fetch("/api/v1/users")
  //        .then(res => res.json())
  //       .then(data => setUsers(data))
  //    .catch(err => console.error(err));
  //    };

 useEffect (() => {
    const fetchLands = async () => {
      try {
        console.log('aaaayybbbbbbbvv') ;
        const res = await axios.get("/api/v1/users")
        console.log(res.data);
        setUsers(res.data.data.users) ; 
      }
      catch(error) {
        console.log("errorrrrrrrr") ; 
      }
    } ;
  
    fetchLands() ; 
  },[]);
 //  حذف
 const handleDelete = (id) => {
     fetch(`/api/users/${id}`, { method: "DELETE" })
      .then(() => loadUsers());
 };

//  //  حفظ تعديل
 const handleSave = (id) => {
     fetch(`/api/users/${id}`, {
         method: "PUT",
    headers: { "Content-Type": "application/json" },
     body: JSON.stringify(editUser)
     }).then(() => {
    setEditUser(null);
     loadUsers();
});
 };

        return (
            <div className="table-container">
            <h2>Users Table</h2>
            <table className="custom-table">
            <thead>
            <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>State</th>
            <th>Procedures</th>
            </tr>
            </thead>
            <tbody>
            {users.map(u => (
            <tr key={u.id}>
            <td>{u.id}</td>
            <td>
                 {/* {editUser?.id === u.id ? ( */}
                 <input
                 value={editUser.first_name}
                 onChange={e => setEditUser({ ...editUser, first_name: e.target.value })}
                 />
                 {/* ) */}
                  : u.first_name
                  {/* } */}
             </td>
             <td>
                 {editUser?.id === u.id ? (
               <input
                 value={editUser.last_name}
                    onChange={e => setEditUser({ ...editUser, last_name: e.target.value })}
                     />
                 ) : u.last_name}
                </td>
                 <td>
                 {editUser?.id === u.id ? (
                 <input
                 value={editUser.email}
                 onChange={e => setEditUser({ ...editUser, email: e.target.value })}
                 />
                 ) : u.email}
                 </td>
                 <td>
                {editUser?.id === u.id ? (
                 <input
                value={editUser.status}
                     onChange={e => setEditUser({ ...editUser, status: e.target.value })}
                 />
                 ) : u.status}
                 </td>
                 <td className="action-buttons">
                {editUser?.id === u.id ? (
                 <>
             <button className="btn btn-view" onClick={() => handleSave(u.id)}>save</button>
             <button className="btn btn-delete" onClick={() => setEditUser(null)}>cancel</button>
                 </>
             ) : (
                 <>
{/*                     <button className="btn btn-view" onClick={() => alert(User: ${u.first_name} ${u.last_name}\nEmail: ${u.email})}>show</button> */}
                 <button className="btn btn-edit" onClick={() => setEditUser(u)}>amendment</button>
                 <button className="btn btn-delete" onClick={() => handleDelete(u.id)}>delete</button>
                 </>
            )}
             </td>
              </tr>
             ))}
        </tbody>
      </table>
    </div>
 );
}
