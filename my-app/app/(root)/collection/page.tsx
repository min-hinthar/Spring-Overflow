import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { auth } from '@clerk/nextjs'

export default async function Home({ searchParams }: SearchParamsProps) {

    const { userId } = auth();

    if(!userId) return null;

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,

  });

  // console.log(result.questions)

  return (
    <>
        <h1 className="h1-bold text-dark100_light900">
            ⭐ Saved Questions
        </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar 
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for a Question'
          otherClasses=''
        />
  
        <Filter 
          filters={QuestionFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.question.length > 0 ? 
        result.question.map((question: any) => (
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
          title="Woah...there aren't saved questions yet!"
          description='🚀 Save Interesting Questions! 🔥'
          link='/'
          linkTitle='Save a Question'
        />}
      </div>
    </>
  )
}