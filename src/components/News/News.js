import React, { useEffect, useState} from 'react';
import '../../styles/news.css';

const News = () => {
    const [currentDate] = useState(new Date());
    const [news, setNews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Start with 0 to show the first 3 items
    const itemsPerPage = 3;
  
    // Format the current date
    const formatCurrentDate = () => {
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
      const dayNumber = currentDate.getDate();
      let daySuffix;
  
      switch (dayNumber) {
        case 1:
        case 21:
        case 31:
          daySuffix = 'st';
          break;
        case 2:
        case 22:
          daySuffix = 'nd';
          break;
        case 3:
        case 23:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
          break;
      }
  
      const formattedDay = `${dayNumber}${daySuffix}`;
      const year = currentDate.getFullYear();
  
      return `${monthName} ${formattedDay} ${year}`;
    };
  
    // Load news function
    const loadNews = () => {
      fetch('https://tronai.io/v1/m_news', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: ''
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setNews(data.data); // Set all news data initially
        })
        .catch(error => {
          console.error('Error loading data:', error);
        });
    };
  
    useEffect(() => {
      loadNews();
    }, []);
  
    const handleSeeMore = () => {
      setCurrentIndex(prevIndex => {
        const newIndex = prevIndex + itemsPerPage;
        return newIndex < news.length ? newIndex : prevIndex; // Ensure it doesn't go out of bounds
      });
    };
  
    const displayedNews = news.slice(currentIndex, currentIndex + itemsPerPage); // Get the news to display
  
    return (
      <div>
        <div className="box-container">
          <div className="rounded-box">
            <div className="month-year">{formatCurrentDate()}</div>
          </div>
        </div>
        <div id="news">
          {displayedNews.length > 0 ? (
            displayedNews.map((item, index) => {
              const date = new Date(item.first_published_at);
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              return (
                <div className="news-container" key={index}>
                  <div id="news-link">
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <div className="time">{formattedDate}</div>
                      <div className="headline">{item.title}</div>
                      <div className="news">{item.subtitle}</div>
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No news available.</p>
          )}
          {currentIndex + itemsPerPage < news.length && (
            <button id="seeMoreBtn" onClick={handleSeeMore}>
              See More
            </button>
          )}
        </div>
      </div>
    );
  };
  
 
export default News;