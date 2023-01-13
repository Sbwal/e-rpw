import { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.min.css';
import Highlight from './Extra';
import Card from './Card';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(new Set());
  const [submit, setSubmit] = useState(false);
  const handleSelect = (id) => {
    setFilter(prev => new Set([...prev, id]));
  }
  const handleSubmit = () => {
    setSubmit(true);
    setData(prev => {
      const a = prev.filter(v => filter.has(v.id));
      a.forEach(v => v.disable = true);
      return a;
    })
  }
  const fetchData = () => {
    return fetch("https://anchor.fm/s/3b257d18/podcast/rss")
          .then((response) => response.text())
          .then((d) => {
            const parser = new DOMParser();
            const parseData = parser.parseFromString(d, 'text/xml');
            const parsedXML = parseData.getElementsByTagName('item');
            const modifiedList = Array(parsedXML.length);
            for(let i = 0; i < parsedXML.length; i++){
              let title = parsedXML[i].childNodes[1].innerHTML;
              title = title.substring(title.lastIndexOf('[') + 1, title.indexOf(']'));
              let desc = parsedXML[i].childNodes[3].innerHTML;
              desc = desc.substring(desc.lastIndexOf('[') + 1, desc.indexOf(']'));
              let img = parsedXML[i].childNodes[21].outerHTML.split('href=')[1];
              img = img.substring(img.indexOf('"') + 1, img.lastIndexOf('"'));
              modifiedList[i] = {
                id: i,
                title: title,
                desc: desc,
                img: img,
                handleSelect,
                disable: false
              }
            }
            setData(modifiedList)
          });
  }

  useEffect(() => {
    fetchData();
  },[]);
  console.log(filter, submit, data)
  return (
    <div>
      <Highlight />
      <div className="card-columns">
        {data.map(Card)}
      </div>
      {!submit ? <button className="btn btn-primary" onClick={handleSubmit}>Submit</button> : null}
    </div>
  );
}

export default App;
