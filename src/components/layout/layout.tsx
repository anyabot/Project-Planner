import { ReactNode } from 'react'
import { Container, Box } from '@chakra-ui/react'
// import EnemyModal from './enemyTab/enemyModal';
import Navbar from './navbar'
interface Props {
  children: ReactNode
}
import TaskModal from '../taskModal'
import RightBar from './rightbar'

export default function Layout({children}: Props) {
  return (
    <>
      <Navbar />
      <TaskModal/>
      <Container w="100%" minW="100%" minH="100%" p={0} display="flex" flexDirection="row">
        <Box w="100%" overflow="scroll"   __css={{
              '&::-webkit-scrollbar': {
                w: '2',
              },
              '&::-webkit-scrollbar-track': {
                w: '3',
              },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '5',
                bg: `gray.100`,
              },
            }}>
          {children}
          </Box>
          <RightBar/>
        </Container>
    </>
  )
}