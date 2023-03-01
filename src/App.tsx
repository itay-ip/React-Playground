import { CustomFlow } from "./react-flow/custom-flow";


function App() {
  return ( 
    <>
      <div>
        Hello, world!
      </div>
      <div style={{backgroundColor: 'gray', position: 'fixed',width: '100%', height: '90%'}}>
        <CustomFlow />
      </div>
      <div style={{position: 'fixed', bottom: 0}}>
        End
      </div>
    </> 
  );
}

export default App;
