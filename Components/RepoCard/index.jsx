import moment from 'moment';
import React from 'react';
import Link from "next/link";
import { TextMaxLength } from '../../helpers';

const RepoCard = ({repo}) => {
    const {owner,name,description,stargazers_count,open_issues_count,created_at,html_url} = repo;
    return (
       
        <div className="repo_card--container"> 
            <img className="creator_image" src={owner.avatar_url} alt={owner.login} />
            <div className="card_info">
                <Link  href={`${html_url}`} >
                  <a target="_blank">
                    <h2>{TextMaxLength(name,50)}</h2>
                  </a>
                </Link>
                <p className="description">{description && TextMaxLength(description,120)}</p>
                <div className="repo--data">
                    <span className="stars">Stars : {stargazers_count}<img src="/star.svg" alt="star" className="icon"/> </span>
                    <span className="issues">Issue{open_issues_count === 1 ? '':'s' } : {open_issues_count}</span>
                    <p className="created_date">{moment((created_at)).startOf('day').fromNow()}</p>
                </div>
            </div>
        </div>
      
    );
};

export default RepoCard;