import RepoCard from "../Components/RepoCard"

import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [reposArr,setReposArr] = useState([]);
  useEffect(()=>{
    const fetch = async () => {
      const url = `https://api.github.com/search/repositories?q=created:>2021-03-05&sort=stars&order=desc`
      const repos = await axios.get(url);

      console.log(repos);
      setReposArr(repos.data.items)
    }

    fetch()
  },[])
  return <div className="app">
     {reposArr.length > 0 && reposArr.map(repo => <RepoCard key={repo.id} repo={repo} />)}
  </div>;
}
