import Head from "next/head";

// Import Components
import {
  Container,
  Grid,
  GridItem,
  Card,
  Text,
  Center,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverFooter,
  PopoverBody,
  PopoverCloseButton,
  PopoverHeader,
  Input,
  ButtonGroup,
  Portal,
} from "@chakra-ui/react";
import Link from "next/link";
import PopoverEdit from "@/components/utils/popoverEdit";

// Import Redux State
import { selectProjects, setActiveProject } from "@/store/projectSlice";
import { setActiveBoard } from "@/store/boardSlice";

// Import Hooks
import { useAppSelector, useAppDispatch } from "@/hooks";
import { useEffect, useState } from "react";
import { useQuickModify } from "@/utils";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";

//Import Icons
import { AddIcon } from "@chakra-ui/icons";

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const projects = useAppSelector(selectProjects);

  const { newProject } = useQuickModify();
  const createProject = function (e: string) {
    if (!e) return;
    const name = newProject(e);
    router.push(`/project/${name}`);
  };

  useEffect(() => {
    dispatch(setActiveProject(null));
    dispatch(setActiveBoard(null));
  }, []);
  return (
    <>
      <Head>
        <title>Kanban Demo</title>
      </Head>

      <Container
        minW={[
          "container.sm",
          "container.md",
          "container.lg",
          "container.xl",
          "container.xl",
        ]}
      >
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={6}
          position="relative"
          m={4}
        >
          {Object.keys(projects).map((project) => (
            <GridItem key={project}>
              <Card
                w="100%"
                h="150px"
                as={Link}
                href={`project/${project}`}
                bgColor="gray.400"
              >
                <Text position="absolute" bottom="0" fontSize="25px" p={6}>
                  {projects[project].name}
                </Text>
              </Card>
            </GridItem>
          ))}

          <GridItem>
            <PopoverEdit mode="create" obj="Project" createCallback={createProject}>
                <Card w="100%" h="150px" bgColor="gray.400" cursor="pointer">
                  <Center flexDirection="column" h="100%">
                    <AddIcon boxSize="40px" />
                    <Text fontSize="20px">Add New Project</Text>
                  </Center>
                </Card>
            </PopoverEdit>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
