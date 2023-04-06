import React, { useState, useEffect } from "react";
import jsonFile from "./assets/testData.json"

let jsonData = jsonFile;

const MyComponent = () => {
  const [updatedData, setUpdatedData] = useState(() => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : jsonData;
  });

    useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(updatedData));
  }, [updatedData]);

  const handleInputChange = (e, itemId, dataIndex) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => {
      const updatedItem = prevData.find((item) => item.id === itemId);
      updatedItem.data[dataIndex][name] = value;
      return [...prevData];
    });
  };

  return (
    <div className="bg-slate-400 w-fit">
      {updatedData.map((item) => (
        <div key={item.id} className="kontener--jednej--podwojnej--tabeli h-screen mb-20 shadow-lg shadow-black">
          {/* TABELA NAGLOWEK */}
          <table className="h-[calc(100%-30%)] w-fit text-center bg-white">
            <tbody className=""  >
              <tr className="[&>*]:border [&>*]:border-black w-fit">
                <th >ID</th>
                <td>{item.id}</td>
              </tr>
              <tr className="[&>*]:border [&>*]:border-black w-fit">
                <th >Name</th>
                <td>{item.name}</td>
              </tr>
              <tr className="[&>*]:border [&>*]:border-black w-fit">
                <th >Email</th>
                <td>{item.email}</td>
              </tr>
              <tr className="[&>*]:border [&>*]:border-black w-fit">
                <th >Registered</th>
                <td>{item.registered}</td>
              </tr>
              <tr className="[&>*]:border [&>*]:border-black">
                <th >About</th>
                <div className="overflow-scroll overflow-x-hidden h-full">
                  <td>{item.about}</td>
                </div>
              </tr>
            </tbody>
          </table>
          {/* TABELA DATA */}
          <table className="m-auto min-w-full h-[calc(100%-70%)] text-center bg-white">
            <thead>
              <tr className="[&>*]:border [&>*]:border-black">
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
              </tr>
            </thead>
            <tbody>
              {item.data.map((dataItem, dataIndex) => (
                <tr key={dataItem.id} className="[&>*]:border [&>*]:border-black">
                  <td>{dataItem.id}</td>
                  <td>
                    <input
                      className="w-full bg-blue-200 border border-black p-1.5 shadow-inner shadow-gray-500"
                      type="text"
                      name="name"
                      value={dataItem.name}
                      onChange={(e) => handleInputChange(e, item.id, dataIndex)}
                    />
                  </td>
                  <td>
                    <input
                      className="w-full bg-blue-200 border border-black p-1.5 shadow-inner shadow-gray-500"
                      type="text"
                      name="surname"
                      value={dataItem.surname}
                      onChange={(e) => handleInputChange(e, item.id, dataIndex)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
