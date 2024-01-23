import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderTags from './RenderTag'

const hotQuestions = [
    {
        _id: '1', title: 'How do I use express as a custom server in NextJS?'
    },
    {
        _id: '2', title: 'Cascading Deletes in SQL Alchemy?'
    },
    {
        _id: '3', title: 'How to Perfectly Center a Div with Tailwind CSS?'
    },
    {
        _id: '4', title: 'Best practices for data fetching in a NextJS application with Server-Side Rendering (SSR)?'
    },
    {
        _id: '5', title: 'Redux Toolkit Not Updating State as Expected?'
    },
]

const popularTags = [
    {
        _id: '1', name: 'JavaScript', totalQuestions: 5
    },
    {
        _id: '2', name: 'React', totalQuestions: 7
    },
    {
        _id: '3', name: 'Next', totalQuestions: 9
    },
    {
        _id: '4' , name: 'Vue', totalQuestions: 5
    },
    {
        _id: '5', name: 'Redux', totalQuestions: 4
    },
]

const RightSidebar = () => {

  return (
    <section className='background-light900_dark200 light-border sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden w-[350px] custom-scrollbar'>
        <div className=''>
            <h3 className='h3-bold text-dark200_light900'>
                Top Questions
            </h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                {hotQuestions.map((question) => (
                    <Link
                        href={`/question/${question._id}`}
                        key={question._id}
                        className='flex cursor-pointer items-center justify-between gap-7'
                    >
                        <p className='body-medium text-dark500_light700'>
                            {question.title}
                        </p>
                        <Image
                            src='/assets/icons/chevron-right.svg'
                            alt='chevron right'
                            width={20}
                            height={20}
                            className='invert-colors'
                        />
                    </Link>
                ))}
            </div>
        </div>
        <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>
                Popular Tags
            </h3>
            <div className='mt-7 flex flex-col gap-4'>
                {popularTags.map((tag) => (
                    <RenderTags
                    key={tag._id}
                    _id={tag._id}
                    name={tag.name}
                    totalQuestions={tag.totalQuestions}
                    showCount
                    />
                ))}
            </div>
        </div>
    </section>
  )
}

export default RightSidebar