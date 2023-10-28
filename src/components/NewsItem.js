import React from 'react'

export default function NewsItem(props) {
  let {author, title, description, imageUrl, newsUrl, publishedAt, source} = props;
  return (
      <div className='my-3'>
          <div className="card">
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }}>
              <span className="badge rounded-pill bg-danger" >{source.name}</span>
            </div>
              <img src={imageUrl} className="card-img-top" alt='' />
              <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}...</p>
                  <p className="card-text"><small className="text-body-secondary">{author} on {new Date(publishedAt).toGMTString()}</small></p>
                  <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
              </div>
          </div>
      </div>
  )
}