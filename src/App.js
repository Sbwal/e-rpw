import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import { Highlight, Footer } from './Extra';
import Card from './Card';

function App() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    return fetch("https://anchor.fm/s/3b257d18/podcast/rss")
          .then((response) => response.text())
          .then((d) => {
            const parser = new DOMParser();
            const parseData = parser.parseFromString(d, 'text/xml');
            const nd = parseData.getElementsByTagName('item');
            const md = [];
            for(let i = 0; i < nd.length; i++){
              md[0] = {
                title: nd[i].childNodes[1]
              }
            }
            console.log(parseData, nd, md)
            setData(d)
          });
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div>
      <Highlight />
      <div className="scroll-container">
        <Card qc={{d: 'f'}} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
