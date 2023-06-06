// Import Components
import { Text, Center } from "@chakra-ui/react";
import Error from "next/error";
import Head from "next/head";

// Import Redux States
import {
  selectProjects,
  setActiveProject,
  selectActiveProject,
} from "@/store/projectSlice";

// Import Hooks
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";

// Import Icons
import { BsHandIndex } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";

export default function Home() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const activeProject = useAppSelector(selectActiveProject);
  const [id, setId] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    let temp = router.query.id as string;
    setId(temp);
    if (temp in projects) dispatch(setActiveProject(temp));
  }, [router.isReady, router.query.id]);
  if (!activeProject || !(activeProject in projects))
  return (
    <>
      <Error statusCode={404} />
    </>
  );
  return (
    <>
      <Head>
        <title>{projects[activeProject].name}</title>
      </Head>
      <Center flexDirection="column">
        <Icon as={BsHandIndex} boxSize="100px" />
        <Text fontSize="50px">Select or Create a Board</Text>
      </Center>
    </>
  );
}
