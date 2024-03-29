import React, { useEffect, useState } from 'react';
import "./InfiniteScroll.scss";

export const InfiniteScroll = ({ itemsLength, handler, finalMessage, seenAll, loader, children }) => {
  
    const [loading, setLoading] = useState(true);
    
    const handleScroll = (ev) => {

        if(!seenAll) {

            let footer = document.querySelector(".lazyload-threshold").getBoundingClientRect();

            if(footer.top <= window.innerHeight) {
                if(!loading && !seenAll) {
                    setLoading(true);
                    handler();  
                }
            }
        }
    };

    useEffect(() => {
        setLoading(false);
    }, [itemsLength]);

    useEffect(() => {
        if(seenAll) 
            setLoading(false);
    }, [seenAll]);


    return (  
        <div className="lazyload__container" onScrollCapture={handleScroll}>
            {children}
            {
                seenAll ? (
                    <p className="lazyload__container__end">{finalMessage}</p>
                ) : null
            }
            {loading ? loader : null}
            <div 
              className="lazyload-threshold"
              style={
                {
                  width: "100%",
                  height: "50px",
                  marginTop: "70px"
                }
              }
            ></div>
        </div>
    )
}
