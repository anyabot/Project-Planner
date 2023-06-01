import { ReactNode } from 'react'
import { Container, Box } from '@chakra-ui/react'
// import EnemyModal from './enemyTab/enemyModal';
import Navbar from './navbar'
interface Props {
  children: ReactNode
}
import TaskModal from '../modal/taskModal'

export default function Layout({children}: Props) {
  return (
    <>
      <Navbar />
      <TaskModal/>
      <Container w="100%" minW="100%" minH="100%" p={0} display="flex" flexDirection="row" height="calc(100vh - 72px)">
        <Box w="100%" height="100%" overflow="scroll"   className='scroller fill'>
          {children}
          </Box>
        </Container>
    </>
  )
}