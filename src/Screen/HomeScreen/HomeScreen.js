import { FlexColumn, InnerSection, SpinnerContainer } from "../../Global.Styles";
import {
  CardsContainer,
  Description,
  HeroSection,
  InnerHeroSection,
  LoadMore,
  MoviesTitle,
  Title,
} from "./HomeScreen.Styles";
import Card from "../../Components/Card/Card";
import CRUDRequests from "../../API";
import {useState,useCallback,useEffect} from 'react'


function HomeScreen(props) {
const[movieslist,setMoviesList]=useState([])
const[isLoading,setIsLoading]=useState([])
const[pageNumber,setPageNumber]=useState(1)
const fetchData=useCallback(async ()=>{
  setIsLoading(true);
const response= await CRUDRequests.get(`/movie/popular?api_key=8cfed0c375662126cd3b73326a7d3151&page=${pageNumber}`)
setMoviesList(prevState=>[...prevState,...response.data.results]);
setIsLoading(false);
},[pageNumber])

const handelLoadMore =()=>{
  setPageNumber(prevState=>prevState+1)
}
  useEffect(()=>{
    fetchData()

  },[fetchData,pageNumber])


  return (
 isLoading?  <SpinnerContainer/>:
    <FlexColumn>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500"+movieslist[0].backdrop_path}
      >
        <InnerHeroSection>
          <Title>{movieslist[0].title}</Title>
          <Description>
          {movieslist[0].overview}
          </Description>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Popular Movies</MoviesTitle>
        <CardsContainer>
      { movieslist.map(item =>     <Card
            key={item.id}
            id={item.id}
            name={item.title}
            img={
              "https://image.tmdb.org/t/p/w500"+item.poster_path
            }
          />)}
         
        </CardsContainer>
        <LoadMore isLoading={isLoading} onClick={handelLoadMore}>Load more...</LoadMore>
      </InnerSection>
    </FlexColumn>
   );
}

export default HomeScreen;
