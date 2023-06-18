import './App.css';
import FeedLinkInput from './FeedLinkInput';
import ExampleButton from './ExampleButton';
import { useState, useEffect } from 'react';
import { Feeds } from './Feeds';
import $, { ajaxPrefilter } from 'jquery';

function App() {
  // Hook for feeds
  const [feed, setFeed] = useState([]);

  // Variables
  var myData = [];
  let Link = "";
  var max_feeds = 30;

  // Array of dictionarys for test-buttons
  var myButtons = [
    {name: "UN - Africa", link: "https://news.un.org/feed/subscribe/en/news/region/africa/feed/rss.xml"},
    {name: "UN - America", link: "https://news.un.org/feed/subscribe/en/news/region/americas/feed/rss.xml"},
    {name: "NYT - The Daily", link: "https://feeds.simplecast.com/54nAGcIl"},
    {name: "Crime Junkie", link: "https://feeds.simplecast.com/qm_9xx0g"},
    {name: "Morbid: A True Crime Podcast", link: "https://rss.art19.com/morbid-a-true-crime-podcast"}
  ]

  // Function to set the link value
  function SetLink (newLink) {
    Link = newLink;
    GetData();
  }

  // Get the actual data
  async function GetData()
  {
      var myData = []; 
      // Do the call   
      $.get(Link, function (data) 
      {
        var counter = 0;

        // If we got 404 error, or there are no items in the response, display an error to user
        if(data == "404 Not Found." || $(data).find('item').length == 0)
        {
          // Error Object
          var errorDic = {
            title: "Error",
            author: "Admin",
            description: "Something went wrong. Please retry and make sure, your link is actually valid.",
            link: "#",
            date: ""
          }
          // Push error to data and send it to the state
          myData.push(errorDic);
          setFeed(myData);
        }
        // If we had no error
        else
        {
          // Go through and look for 'item' objects
          $(data).find("item").each(function () 
          { 
            // If we have not more then max
            if(counter < max_feeds)
            {
              // Variables
              var tempDic = {};
              var el = $(this);
              
              // Fill the dictionary with data from 'item' object that we want, remove all HTML tags
              tempDic['title'] = el.find("title").text().replaceAll(/<\/?[^>]+(>|$)/gi, "");
              tempDic['author'] = el.find("author").text().replaceAll(/<\/?[^>]+(>|$)/gi, "");
              tempDic['description'] = el.find("description").text().replaceAll(/<\/?[^>]+(>|$)/gi, "");
              tempDic['link'] = el.find("link").text().replaceAll(/<\/?[^>]+(>|$)/gi, "");
              tempDic['date'] = el.find("pubDate").text().replaceAll(/<\/?[^>]+(>|$)/gi, "");
              counter++;
              // Push to myData (return data)
              myData.push(tempDic);
            }
              
          });
          // Send all data to state
          setFeed(myData);
        }       
        // If something else went wrong, console.log an error
    }).fail((err) => 
    {
      console.log("Something went wrong. No critical error!")
    });
    }   
    
  // Render everything
  return (
    <div className="App">
      <FeedLinkInput SetLink = {SetLink} />    
      <ExampleButton SetLink={SetLink} myButtons={myButtons} />           
      <Feeds feeds = {feed}/>
    </div>
  );
};

export default App;
