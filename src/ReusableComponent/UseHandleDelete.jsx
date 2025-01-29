import axios from "axios";

export const handleDeleteItem = async ({
  id,
  url,
  data,
  setData,
  itemKey,
  confirmationMessage = "Are you sure you want to delete?",
}) => {
  const isConfirmed = window.confirm(confirmationMessage);
  if (isConfirmed) {
    try {
      const response = await axios.delete(`${url}/${id}`);
      console.log("Deleted successfully:", response.data);

      // Update the dataset by filtering out the deleted item
      const updatedData = data.filter((item) => item[itemKey] !== id);
      setData(updatedData);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
};
