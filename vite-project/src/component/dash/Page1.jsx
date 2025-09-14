import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./p1.css";

export default function Page1() {
  const [editingLand, setEditingLand] = useState(null);
  const [editValues, setEditValues] = useState({});

  //  جلب الأراضي عند تحميل الصفحة
const [lands,setLands]=  useState([]);

useEffect (() => {
  const fetchLands = async () => {
    try {
      console.log('aaaayybbbbbbbvv') ;
      const res = await axios.get("/api/v1/lands/")
      console.log(res.data);
      setLands(res.data.data.lands) ; 
    }
    catch(error) {
      console.log("errorrrrrrrr") ; 
    }
  } ;

  fetchLands() ; 
},[]);

  //  حذف أرض
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this land?")) {
//       try {
//         await axios.delete(/api/v1/lands/${id});
//         setLands(lands.filter((l) => l.id !== id));
//       } catch (err) {
//         console.error("Error deleting land:", err);
//       }
//     }
//   };
// داخل الكومبوننت
const handleDelete = async (id) => {
  // تأكيد على الحذف
  if (!window.confirm("هل أنت متأكد أنك تريد حذف هذه الأرض؟")) return;

  try {
    console.log("Deleting id =", id);

    // استخدم هنا نفس الـ base (نفس اللي تستخدمه في GET)
    // لو على الاستضافة استخدم رابط كامل: `https://yourdomain.com/api/v1/lands/${id}`
    const res = await axios.delete(`/api/v1/lands/${id}`);

    console.log("Delete response:", res);

    // لو نجح الحذف حدّث الواجهة محلياً
    setLands(prev => prev.filter(l => l.id !== id));

    alert("تم الحذف بنجاح");
  } catch (err) {
    // طباعة الخطأ كامل للـ debugging
    console.error("Error deleting land:", err);
    // إذا كان هناك رد من السيرفر اعرضه
    // if (err.response) {
    //   alert(`خطأ من السيرفر: ${err.response.status} ${err.response.statusText}\n${JSON.stringify(err.response.data)}`);
    // } else {
      alert(`حدث خطأ: ${err.message}`);
    // }
  }
};



  //  عرض تفاصيل أرض
  const handleView = (l) => {
    alert(
      ` تفاصيل الأرض:
      - المدينة: ${l.city}
      - المنطقة: ${l.village}
      - المساحة: ${l.area} م²
      - السعر: ${l.price} $`
    );
  };

  //  فتح وضع التعديل
  const handleEdit = (land) => {
    setEditingLand(land.id);
    setEditValues(land);
  };

  //  تعديل القيم
  const handleChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  //  حفظ التعديلات
  const handleSave = async (id) => {
    try {
      await axios.put(`/api/v1/lands/${id}`, editValues);
      setLands(lands.map((l) => (l.id === id ? editValues : l)));
      setEditingLand(null);
    } catch (err) {
      console.error("Error updating land:", err.message);
    }
  };

return (
    <div className="table-container">
      <h2>Lands Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
{/*             <th>Owner ID</th> */}
            <th>Owner Name</th>
            <th>City</th>
            <th>Region</th>
            <th>Total Area</th>
            <th>Price</th>
            <th>State</th>
            <th>Procedures</th>
          </tr>
        </thead>
        <tbody>
          {lands.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
{/*               <td>{l.firstName}{l.lastName}</td> */}
              <td>
                {editingLand === l.id ? (
                  <input
                    type="text"
                    name="ownerName"
                    value={editValues.ownerName}
                    onChange={handleChange}
                  />
                ) : (
                     l.firstName+" "+ l.lastName
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="text"
                    name="city"
                    value={editValues.city}
                    onChange={handleChange}
                  />
                ) : (
                      l.city
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="text"
                    name="region"
                    value={editValues.location.village}
                    onChange={handleChange}
                  />
                ) : (
                     l.location.village
                )}
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="number"
                    name="area"
                    value={editValues.area}
                    onChange={handleChange}
                  />
                ) : (
                  l.area
                )}
   dunams
              </td>
              <td>
                {editingLand === l.id ? (
                  <input
                    type="number"
                    name="price"
                    value={editValues.price}
                    onChange={handleChange}
                  />
                ) : (
                       l.price
                )} $
              </td>
              <td>{l.status}</td>
              <td className="action-buttons">
                {editingLand === l.id ? (
                  <button className="btn btn-edit" onClick={() => handleSave(l.id)}>
                    حفظ
                  </button>
                ) : (
                  <>
                    <button className="btn btn-view" onClick={() => handleView(l)}>
                      <FontAwesomeIcon icon={faEye} /> show
                    </button>
                    <button className="btn btn-edit" onClick={() => handleEdit(l)}>
                      <FontAwesomeIcon icon={faEdit} /> amendment
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(l.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> delete
                    </button>
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
