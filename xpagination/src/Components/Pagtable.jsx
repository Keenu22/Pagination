import { useEffect, useState } from "react";
import Api from "./Api"; // Ensure the correct path
import "./Pagtable.css";

export default function Pagtable() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Calculate pagination indices
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const membersPart = members.slice(indexFirst, indexLast);
  const totalPage = Math.ceil(members.length / itemsPerPage);

const handleNext = () => {
  if (currentPage < totalPage) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

const handlePrevious = () => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchValues = await Api();
        if (Array.isArray(fetchValues)) {  // Ensure it's an array
          setMembers(fetchValues);
        } else {
          throw new Error("Data format incorrect, expected array");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };
    fetchData();
  }, []);

  // Log current page for debugging
  useEffect(() => {
    console.log("Current Page:", currentPage);
  }, [currentPage]);

  // Handle case when error occurs
  if (error) {
    return alert("Failed to fetch data");
  }

  return (
    <div>
      <h1>Employee Data Table</h1>
      {membersPart.length > 0 ? (
        <table className="layout">
          <thead>
            <tr className="heading">
              <th>ID</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {membersPart.map((item) => (
              <tr className="border-row" key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="pageClr">
       {currentPage}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
}
