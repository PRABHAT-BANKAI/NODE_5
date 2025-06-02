import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);

  async function show() {
    const result = await fetch(
      "http://localhost:8082/api/users/all?page=2&limit=2"
    );
    const response = await result.json();

    console.log(response);
  }

  useEffect(() => {
    show();
  }, []);
  return (
    <div>
      <h1>list</h1>
    </div>
  );
};

export default App;
