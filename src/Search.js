import React from 'react'
import { useGlobalContext } from './context';

const Search = () => {
  const { query, setQury, isError } = useGlobalContext();
  return (
    <>
      <section className='search-section'>
        <h2>Search Your Favourite Movie</h2>
        <form action="%" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input type="text"
              placeholder='search here'
              value={query}
              onChange={(e) => setQury(e.target.value)}
            />
          </div>
        </form>
        <div className='card-error'>
          <p>{isError.show && isError.msg}</p>
        </div>
      </section>
    </>
  );
}

export default Search
