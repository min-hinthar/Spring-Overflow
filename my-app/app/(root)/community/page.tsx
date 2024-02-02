import UserCard from '@/components/cards/UserCard'
import Filter from '@/components/shared/Filter'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
// import { Button } from '@/components/ui/button'
import { UserFilters } from '@/constants/filters'
import { getAllUsers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import Link from 'next/link'

const Page = async ({ searchParams }: SearchParamsProps) => {

    const { users, isNext } = await getAllUsers({
        searchQuery: searchParams?.q,
        filter: searchParams?.filter,
        page: searchParams?.page ? +searchParams.page : 1,
    });


  return (
    <>
        <h1 className="h1-bold text-dark100_light900">
            Spring Community
        </h1>
    
    <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        {/* <Link href='/ask-question' className="flex justify-end max-sm:w-full">
            <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
            </Button>
        </Link> */}
    </div>

    <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar 
            route='/community'
            iconPosition='left'
            imgSrc='/assets/icons/search.svg'
            placeholder='Search for an awesome member!'
            otherClasses='flex-1'
        />

        <Filter 
            filters={UserFilters}
            otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
    </div>

    <section className='mt-12 flex flex-wrap gap-4'>
        {users.length > 0 ? (
            users.map((user) => (
                <UserCard 
                    key={user._id} 
                    user={user} 
                />
            ))
        ) : (
            <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
                <p>
                    Oh no...there are no users yet?!
                </p>
                <Link href='/sign-up' className='mt-4 font-bold text-accent-blue'>
                    <p>
                        Join the Spring Community
                        <br/>
                            and 
                        <br/>
                        Support the Burma Spring Revolution
                    </p>
                </Link>
            </div>
        )}
    </section>

    <div className="mt-10">
        <Pagination 
            pageNumber={searchParams?.page ? +searchParams.page: 1}
            isNext={isNext}
        />
    </div>

    </>
)}

export default Page