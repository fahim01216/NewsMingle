import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {
    
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      props.setProgress(20);
      let data = await fetch(url);
      props.setProgress(70);
      let parsedData = await data.json();
      props.setProgress(90);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(() => {  
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMingle`;
      updateNews();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchMoreData = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalResults(parsedData.totalResults);
    };

  return (
    <>
      <h1 className='text-center' style={{margin: '30px'}}>NewsMingle - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return <div key={element.url} className="col-md-4">
                  <NewsItem author={element.author ? element.author : 'Unknown'}
                    title={element.title != null ? element.title : 'Title'}
                    description={element.description != null ? element.description.slice(0, 115) : 'Click below to know more'}
                    imageUrl={element.urlToImage != null ? element.urlToImage : 'https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg'}
                    newsUrl={element.url}
                    publishedAt={element.publishedAt}
                    source={element.source} />
                </div>
                })}
            </div>
          </div>
      </InfiniteScroll>

      {/* removed button to load more news, instead using InfiniteScrolls
      <div className="container d-flex justify-content-between ">
        <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled={this.state.page <= 1}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)}>Next &rarr;</button>
      </div> */}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 6, 
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
