import { SearchParamsProps } from '@/types'


interface Props extends SearchParamsProps {
    userId: string,
    clerkId?: string | null,
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {

  return (
    <div>AnswersTab</div>
  )
}

export default AnswersTab