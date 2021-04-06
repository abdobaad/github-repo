import moment from 'moment';
import React from 'react';
import Link from "next/link"

const RepoCard = ({repo}) => {
    const {owner,name,description,stargazers_count,open_issues_count,created_at,html_url} = repo;
    return (
        <Link  href={`${html_url}`} >
            <a target="_blank">
            <div className="repo_card--container"> 
            <img className="creator_image" src={owner.avatar_url} alt={owner.login} />
            <div className="card_info">
              <h2>{name && name.length > 40 ? `${name.slice(0,50)}...` : name }</h2>
              <p className="description">{description && description.length > 120 ?  `${description.slice(0,120)}...` : description }</p>
              <div className="repo--data">
                  <span className="stars">Stars : {stargazers_count}</span>
                  <span className="issues">Issue{open_issues_count === 1 ? '':'s' } : {open_issues_count}</span>
                  <p className="created_date">{moment((created_at)).startOf('day').fromNow()}</p>
              </div>
            </div>
        </div>
        </a>
        </Link>
    );
};

export default RepoCard;