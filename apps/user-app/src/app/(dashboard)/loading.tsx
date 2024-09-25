import { NextPage } from 'next'
import Loader from '../../components/loader'

interface Props {}

const Loading: NextPage<Props> = ({}) => {
  return <Loader />
}

export default Loading