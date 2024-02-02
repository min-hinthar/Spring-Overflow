import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamsProps) {

  const result = await getQuestions({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  //Fetch Recommended

  // const isLoading = true;

  // if(isLoading) {
  //   return <Loading/>
  // }

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">
          All Questions
        </h1>
        <Link href='/ask-question' className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar 
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for a Question'
          otherClasses=''
        />
  
        <Filter 
          filters={HomePageFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
          containerClasses='hidden max-md:flex'
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? 
        result.questions.map((question) => (
          <QuestionCard 
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))
        : <NoResult 
          title="Woah...there aren't any questions yet!"
          description='🚀 You can be the first to break the silence! 🥳 Ask a Question and Kickstart the discussion. 🎯 Your query could be the next big thing others learn from!  Fire Away! 🔥'
          link='/ask-question'
          linkTitle='Ask a Question'
        />}
      </div>
      
      <div className="mt-10">
        <Pagination 
          pageNumber={searchParams?.page ? +searchParams.page: 1}
          isNext={result.isNext}
        />
      </div>
    </>
  )
}