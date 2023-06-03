// Import Components
import { Container, Grid, GridItem, Card } from '@chakra-ui/react'
import Link from 'next/link'

// Import Redux State 
import { selectProjects, setActiveProject } from '@/store/projectSlice';

// Import Hooks
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  useEffect(() => {
    dispatch(setActiveProject(null))
  }, []);
  return (
    <Container minW={['container.sm', 'container.md', 'container.lg', 'container.xl', 'container.xl']}>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        
          {Object.keys(projects).map(project => <GridItem key={project}><Card w="100%" as={Link} href={`project/${project}`}>{projects[project].name}</Card></GridItem>)}
        
        <GridItem>
          <Card w="100%">Add New Project</Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
