import React, { useState, useEffect } from "react";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";

import Spinner from "./Spinner";
import PropTypes from "prop-types";
//import { computeHeadingLevel } from "@testing-library/react";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // document.title = `${this.capitalizeFirstLetter(
  //   props.category
  // )} - NewsMonkey`;

  const updateNews = async () => {
    const { apiKey, pageSize,country,category } = props;
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
  
    // try {
      setLoading(true);
      let data = await fetch(url);
      props.setProgress(50);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setLoading(false);
      setTotalResults(parsedData.totalResults);
      props.setProgress(100);
    // } catch (error) {
    //   console.error("Fetch error:", error);
    //   // Handle the error, such as showing an error message to the user
    // }
  };
  useEffect(() => {
    console.log("API Key:", props.apiKey); // Check if apiKey is correct
    console.log("API Key:", props.pageSize); // Check if apiKey is correct
    console.log("API Key:", props.category); // Check if apiKey is correct
    console.log("API Key:", props.country); // Check if apiKey is correct
    async function fetchData() {
      await updateNews();
    }
    fetchData();
  }, [props.apiKey]);
  

  

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };
  // const handlePrevClick = async () => {
  //   setPage(page - 1);
  //   updateNews();
  // };
  const fetchMoreData = async () => {
    const { apiKey, pageSize,country,category } = props;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
    // this.setState({ page: this.state.page + 1 });
    
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    // this.setState({
    //   articles:  this.state.articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults
    // });
  };

  return (
    <div>
      <h1 className="text-center" style={{ marginTop: "80px"  }}>
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      
      {articles && <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row my-3">
            {articles?.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imgUrl={
                      !element.urlToImage
                        ? "https://c.ndtvimg.com/2023-08/8a6eua4g_cheese-_625x300_09_August_23.jpg"
                        : element.urlToImage
                    }
                    newsUrl={element.url}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>}

      {/* <div className="container my-3 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark mx-2"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / props.pageSize)
            }
            type="button"
            class="btn btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  loading: PropTypes.bool,
  category: PropTypes.string,
  totalResults: PropTypes.number,
};

export default News;
