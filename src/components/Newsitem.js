import React from "react";
const Newsitem = (props) => {
    let { title, description, imgUrl, newsUrl, author, publishedAt,source } = props;
    return (
      
      <div>
        <div className="card my-2">
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute' , right:0}}>
          <span class=" badge rounded-pill bg-danger" >{source}
          
  </span>
  </div>
          <img
            src={
              imgUrl
            }
            className="card-img-top"
            alt="..."
          />
          
          <div className="card-body">
          
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">By {!author?"Unknown" : author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }

export default Newsitem;
