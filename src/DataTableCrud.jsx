import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const DataTableCrud = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    nationality: "",
    nationalityFl: "",
    nationalityCode: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    // Fetch data from a mock API or your backend
    axios
      .get("http://localhost:8003/nationality")
      .then((response) => setData(response.data));
  }, []);

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (editId) {
      // Update logic
      axios
        .put(`http://localhost:8003/nationality/${editId}`, formData)
        .then(() => {
          setData((prev) =>
            prev.map((item) =>
              item.id === editId ? { ...formData, id: editId } : item
            )
          );
          setEditId(null);
          setFormData({
            nationality: "",
            nationalityFl: "",
            nationalityCode: "",
          });
        });
    } else {
      // Create logic
      axios
        .post("http://localhost:8003/nationality", formData)
        .then((response) => {
          setData((prev) => [...prev, response.data]);
          setFormData({
            nationality: "",
            nationalityFl: "",
            nationalityCode: "",
          });
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8003/nationality/${id}`).then(() => {
      setData((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
  };

  return (
    <div>
      <h1>CRUD App with React DataTable</h1>
      <form onSubmit={handleCreateOrUpdate}>
        <input
          type="text"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={(e) =>
            setFormData({ ...formData, nationality: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Nationality (FL)"
          value={formData.nationalityFl}
          onChange={(e) =>
            setFormData({ ...formData, nationalityFl: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Nationality Code"
          value={formData.nationalityCode}
          onChange={(e) =>
            setFormData({ ...formData, nationalityCode: e.target.value })
          }
        />
        <button type="submit">{editId ? "Update" : "Create"}</button>
      </form>
      <DataTable
        columns={[
          { name: "Nationality", selector: (row) => row.nationality },
          { name: "Nationality (FL)", selector: (row) => row.nationalityFl },
          { name: "Nationality Code", selector: (row) => row.nationalityCode },
          {
            cell: (row) => (
              <>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row.id)}>Delete</button>
              </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ]}
        data={data}
      />
    </div>
  );
};

export default DataTableCrud;
