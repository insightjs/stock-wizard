import '../app.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <h1>You clicked {count} times</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

// import React, { Component } from 'react';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [0, 1, 2]
//     }
//   }

//   render() {
//     return(
//       <div>
//         <h1>{this.state.data}</h1>
//       </div>
//     )
//   }
// }

