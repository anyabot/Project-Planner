import { ReactNode } from 'react'

//Import Components
import { Container, Box } from '@chakra-ui/react'
import Navbar from './navbar'
import TaskModal from '../modal/taskModal'

//Import Redux States
import { selectActiveProject } from '@/store/projectSlice'

//Import Hooks
import { useAppSelector } from '@/hooks';

// TS type for prop
interface Props {
  children: ReactNode
}

export default function Layout({children}: Props) {
  const activeProject = useAppSelector(selectActiveProject);
  return (
    <>
      <Navbar />
      <TaskModal/>
      <Container w="100%" minW="100%" minH="100%" p={0} display="flex" flexDirection="row" height={activeProject ? "calc(100vh - 82px)" : "calc(100vh - 62px)"}>
        <Box w="100%" height="100%" overflow="scroll"   className='scroller fill' bg="gray.300">
          {children}
          </Box>
        </Container>
    </>
  )
}