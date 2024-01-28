import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { QuestionFilters } from '@/constants/filters';
import { IQuestion } from '@/database/question.model';
import { getQuestionsByTagId } from '@/lib/actions/tag.action';
import { URLProps } from '@/types';
import React from 'react'

const Page = async ({ params, searchParams }: URLProps) => {

    const result = await getQuestionsByTagId({
        tagId: params.id,
        page: 1,
        searchQuery: searchParams.q
    });


  return (
    <>
        <h1 className="h1-bold text-dark100_light900">
            {result.tagTitle}
        </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar 
          route='/'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search Tag Question'
          otherClasses=''
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? 
        result.questions.map((question: any) => (
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
          title="Woah...there aren't any tagged questions yet!"
          description='🚀 Go Tag Some Questions! 🔥'
          link='/'
          linkTitle='Tag a Question'
        />}
      </div>
    </>
  )
}

export default Page