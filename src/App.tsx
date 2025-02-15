import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Data from './Data';
import Thoughts from './Thoughts';
import loadJsonFiles from "./loadJson";
import awards from "./assets/awards.json";
import AllTime from './AllTime';
import LastSeason from './LastSeason';
import Formula from './Formula';

const App = () => {
  const [jsonData, setJsonData] = useState([]);
  const firstDivRef = useRef(null);
  const tableRef = useRef(null);
  const allTimeRef = useRef(null);
  const lastSeasonRef = useRef(null);
  const thoughtsRef = useRef(null);
  const formulaRef = useRef(null);
  const [scrolledToTable, setScrolledToTable] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);

  const { ref: firstDivInViewRef, inView: firstDivInView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchJsonData = async () => {
      const data = await loadJsonFiles();
      setJsonData(data);
    };
    fetchJsonData();
  }, []);

  useEffect(() => {
    const handleUserScroll = () => {
      setUserScrolled(true);
    };

    window.addEventListener('scroll', handleUserScroll);

    const timeoutId = setTimeout(() => {
      if (!userScrolled && !scrolledToTable) {
        tableRef.current.scrollIntoView({ behavior: 'smooth' });
        setScrolledToTable(true);
      }
    }, 3000); // Wait for 3 seconds before auto-scrolling

    return () => {
      window.removeEventListener('scroll', handleUserScroll);
      clearTimeout(timeoutId);
    };
  }, [userScrolled, scrolledToTable]);

  useEffect(() => {
    if (firstDivInView && scrolledToTable) {
      setScrolledToTable(false);
    }
  }, [firstDivInView, scrolledToTable]);

  const handleClick = () => {
    window.open('https://shouldntyoubeworking.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className='menu'>
        <div className='logo' onClick={handleClick}></div>
        <nav>
          <div onClick={() => tableRef.current.scrollIntoView({ behavior: 'smooth' })}>Data</div>
          <div onClick={() => allTimeRef.current.scrollIntoView({ behavior: 'smooth' })}>All Time Winners</div>
          <div onClick={() => lastSeasonRef.current.scrollIntoView({ behavior: 'smooth' })}>Last Season</div>
          <div onClick={() => thoughtsRef.current.scrollIntoView({ behavior: 'smooth' })}>My Thoughts</div>
          <div onClick={() => formulaRef.current.scrollIntoView({ behavior: 'smooth' })}>Formula</div>
        </nav>
      </div>
      <div ref={firstDivInViewRef} className="landing">
        <div className='explaination'>
          <p>
            From 1984 to 2002, the NBA used to <a href="https://en.wikipedia.org/wiki/IBM_Award" target='_blank'>award a trophy sponsored by tech company, IBM, using a rudimentary formula</a> similar to PER.
            <br />
            <strong>I'm convinced that the league tweaked the formula starting in 1986-87 once IBM became the sponsor of the trophy, rather than Schick.</strong>
            <br />
            To provide evidence of that, I've marked the winner of the award each year and marked the MVP in the same season for fun.
            <br />
            Have fun and happy start to the 2024-25 NBA Season
          </p>
        </div>
      </div>
      <div ref={tableRef} className="data page">
        {<Data jsonData={jsonData} awards={awards} />}
      </div>
      <div ref={allTimeRef} className='alltimewinners page'>
        {<AllTime jsonData={jsonData} awards={awards} />}
      </div>
      <div ref={lastSeasonRef} className='lastseason page'>
        {<LastSeason jsonData={jsonData} awards={awards} />}
      </div>
      <div ref={thoughtsRef} className='mythoughts page'>
        <Thoughts />
      </div>
      <div ref={formulaRef} className='formula page'>
        <Formula />
      </div>
    </div>
  );
};

export default App;