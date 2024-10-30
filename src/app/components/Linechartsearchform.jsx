import { useState } from 'react';



const Linechartsearchform = ({ onSearch }) => {
    const [date_start, setDate_Start] = useState('');
    const [date_end, setDate_End] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(date_start,date_end);
    }
    return(
        <form onSubmit={handleSubmit} className="mb-5">
            <input 
              type="date"
              value={date_start}
              onChange={(e) => setDate_Start(e.target.value)}
              min="2020-01-01" max="2023-3-30"
              className="narrow-input my-2"
            />
            <input 
              type="date"
              value={date_end}
              onChange={(e) => setDate_End(e.target.value)}
              min="2020-01-01" max="2023-3-30"
              className="narrow-input my-2"
          />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Search</button>
        </form>
    );
      
};
export default Linechartsearchform;