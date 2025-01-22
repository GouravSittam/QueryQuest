import React, { useEffect, useState } from 'react';
import { Api } from './Api';

function App() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Api();
        console.log(data);
        setTests(data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Tests</h1>
      <ul>
        {tests.map(test => (
          <li key={test._id}>
            {test.type}
            <ul>
              {test.blocks?.map((block, index) => (
                <li key={index}>{block.text}</li>
              ))}
              <li>{test?.solution}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;