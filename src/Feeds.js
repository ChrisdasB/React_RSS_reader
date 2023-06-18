export function Feeds({feeds}) {  
    if(feeds.length != 0)
    {
        return (
            <div className="feedsContainer">
                    {feeds.map((currentFeed) => {
                        return(
                        <div className='feedContainer w-75 mx-auto mb-5'>
                            <div className="feed-date">{currentFeed.date}</div>
                            <div className="feed-header">
                                <h1>{currentFeed.title}</h1>
                            </div>
                            <div className="devider mb-3"></div>
                            <div className="feed-content">
                                <h4>{currentFeed.description}</h4>
                            </div>
                            <div className="feed-footer mb-3">
                                <a target='_blank' href={currentFeed.link}>Learn more!</a>
                            </div>
                            <div className="large-devider mt-4"></div>
                        </div>
                        
                        )
                    })}
              </div>
        )
    }
    else {
        return (<h1 className="text-center">No Feeds</h1>);
    }

   
}