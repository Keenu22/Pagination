import { useEffect, useState } from "react";
import Api from "./Api"; // Ensure the correct path
import "./Pagtable.css";


export default function Pagtable() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null); // State to store error
  const [currentPage,setCurrentPage]=useState(1);
  const itemsPerPage=10;
  const indexLast=currentPage*itemsPerPage;
  const indexFirst=indexLast-itemsPerPage;
  const membersPart=members.slice(indexFirst,indexLast);
  const totalPage=Math.ceil(members.length/itemsPerPage);
  const handlePrevious=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }
  const handleNext=()=>{
    if(currentPage<totalPage){
      setCurrentPage(currentPage+1);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchValues = await Api(); // Call the Api function
        setMembers(fetchValues);
        console.log(fetchValues); // Log fetched data to console
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err); // Set error state
      }
    };
    fetchData();
  }, []);

  if (error) {
    return alert("Failed to fetch data"); // Display error message if present
  }

  return (
    <>
    <div>
      <h1>Employee Data Table</h1>
      {/* Render members or loading state */}
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
  {membersPart.map((item)=>(<tr className="border-row" key={item.id}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.role}</td>
  </tr>))}
  </tbody>
  </table>
      ) : (
        <p>Loading...</p>
      )}
  <button onClick={handlePrevious} disabled={currentPage===1} className="prev">Previous</button>
  <span className="pageClr">{currentPage}</span>
  <button onClick={handleNext} disabled={currentPage===totalPage} className="next">Next</button>
    </div>
    </>
  );
}
