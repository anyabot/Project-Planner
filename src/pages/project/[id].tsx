// Import Components
import { Text } from "@chakra-ui/react";

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
  return (
    <Text>
      Select or Create Board {id} if {activeProject}
    </Text>
  );
}
