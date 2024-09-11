import React, { useEffect, useState, useCallback} from 'react';
import '../styles/news.css';
import data from "../assets/JSON/data.json";

const News = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const [newsItems, setNewsItems] = useState([]);
    const [dateInfo, setDateInfo] = useState({ month: '', day: '', year: '' });

    // Load date info
    useEffect(() => {
        const newDate = new Date();
        const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate);
        const currentDayNumber = newDate.getDate();
        const currentDay = currentDayNumber + (currentDayNumber === 1 || currentDayNumber === 21 || currentDayNumber === 31 ? 'st' :
            currentDayNumber === 2 || currentDayNumber === 22 ? 'nd' :
            currentDayNumber === 3 || currentDayNumber === 23 ? 'rd' : 'th');
        const currentYear = newDate.getFullYear();

        setDateInfo({ month: monthName, day: currentDay, year: currentYear });
    }, []);

    const loadNews = useCallback(() => {
      const newItems = data.slice(currentIndex, currentIndex + itemsPerPage);
      if (newItems.length) {
          setNewsItems(newItems); // Replace current items with the new items
          setCurrentIndex(prevIndex => prevIndex + itemsPerPage);
      } else {
          // Optionally handle no more news items
          setNewsItems([{ headline: "No more news to load." }]); // Example message
      }
  }, [currentIndex, itemsPerPage]);

  const handleClick = () => {
      console.log("This button is being clicked");
      loadNews();
  };


    useEffect(() => {
        loadNews(); // Load initial news items when the component mounts
    }, []);

    return (
        <div>
            <div id="Top-title">
                <div className="box-container">  
                    <div className="rounded-box">
                        <div className="month-year">{dateInfo.month} {dateInfo.day}</div>
                        <div className="year">{dateInfo.year}</div>
                    </div>
                </div>
            </div>

            <div id="news">
                {newsItems.map((item, index) => (
                    <div key={index} className="news-container">
                        <div id="news-link">
                          <a href="https://coinmarketcap.com/" target="_blank" rel="noopener noreferrer">
                            <div className="time">{item.time}</div>
                            <div className="headline">{item.headline}</div>
                            <div className="news">{item.subheadline}</div>
                          </a>
                        </div>
                    </div>
                ))}
            </div>
            {currentIndex < data.length && (
                <div className="see-more">
                    <button id="seeMoreBtn" onClick={handleClick}>See More</button>
                </div>
            )}
        </div>
    );
};

export default News;