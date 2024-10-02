import React, { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tronai.io/v1/m_news', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: ''
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>News</h1>
      <div className="news-container">
            <div id="news-link">
              <a href="${result.data[0].link}" target="_blank">
                {/* <div class="time">${formattedDate}</div> */}
                <div className="headline">${result.data[0].title}</div>
                <div className="news">${result.data[0].subtitle}</div>          
              </a>
            </div>
          </div>    </div>
  );
};

export default Test;