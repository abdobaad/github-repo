import { useEffect, useState,useRef,useCallback } from "react";

import RepoCard from "../Components/RepoCard"
import Loading from "../Components/Loading"


import axios from "axios";


export default function Home() {
  const [reposArr,setReposArr] = useState([]);
  const [page,setPage] = useState(1);
  const [isLoading,setIsLoading] = useState(true);
  const [hasMore,setHasMore] = useState(true);

  const observer = useRef();
  
  const lastRepo = useCallback(n=>{
    // the last repo of the previous page is not a ref anymore
    if(observer.current) observer.current.disconnect();


     observer.current = new IntersectionObserver(e=>{
       // the last repo appears on the screen
       if(e[0].isIntersecting){
         // add new page and fetch the repos
        setPage(prevpage=> prevpage + 1);
        setIsLoading(true)
       }
     })
    // set the last repo of the current page as reference
    if(n) observer.current.observe(n);
  },[])


  useEffect(()=>{
     const fetch = async () => {
      const url = `https://api.github.com/search/repositories?q=created:>2021-03-05&sort=stars&order=desc&page=${page}`;
      //fetching the data
      const repos = await axios.get(url);

      //check if there is more repos
      repos.total_count <= reposArr.length && setHasMore(false);

      //add the new repos to the state
      setReposArr((res)=>{
        return [...res,...repos.data.items]
      });

      //loading end
      setIsLoading(false) 
    }
    fetch();  
  },[page])
  
  return <div className="app">
     {reposArr.length > 0 && reposArr.map((repo,i) => {
        if(reposArr.length === i + 1){
        return <div  key={i} ref={lastRepo}>
          <RepoCard  repo={repo} />
        </div>
       }else{
        return <RepoCard key={i} repo={repo} />
       } 
     })}
     {isLoading && hasMore && <Loading />}
  </div>;
}
