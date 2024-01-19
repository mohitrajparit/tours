import { useEffect, useState } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [isLoading,setIsLoading]=useState(true);
  const [tours,setTours]=useState([]);

  const removeTour=(id)=>{
    const newTour=tours.filter((t)=>t.id!=id);
    setTours(newTour);
  }

  const fetchTours=async ()=>{
    setIsLoading(true);
    try {
      const response=await fetch(url);
      const tours=await  response.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }
  useEffect(()=>{
    fetchTours();
  },[]);
  
  if(isLoading){
    return <main>
      <Loading></Loading>
    </main>
  }
  if(tours.length==0){
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button type="button" className="btn" style={{marginTop:'2rem'}} onClick={()=>fetchTours()}>Refresh</button>
      </div>
    </main>
  }
  return <main>
    <Tours tours={tours}  removeTour={removeTour}/>
  </main>
};
export default App;
