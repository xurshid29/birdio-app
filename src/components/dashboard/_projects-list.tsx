import React from "react";
import { ThemeIcon, Title, Box, Menu, Text, Group, Stack } from "@mantine/core";
import { Plus, ThreeDotsVertical, Trash, Pencil } from "react-bootstrap-icons";
import { gql, useQuery } from "@apollo/client";
import { Project } from "../../types";
import styled from "styled-components";

const StyledGroup = styled(Group)`
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ALL_PROJECTS = gql`
  query allProjects {
    allProjects {
      id
      name
    }
  }
`;

const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <StyledGroup position="apart" px={20} py={5}>
      <Text color="gray.4">{project.name}</Text>
      <Menu shadow="md" width={120} closeOnClickOutside closeOnItemClick>
        <Menu.Target>
          <ThreeDotsVertical color="#ADB5BD" />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item icon={<Pencil size={14} />}>Edit</Menu.Item>
          <Menu.Item icon={<Trash size={14} />}>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </StyledGroup>
  );
};

const ProjectsList: React.FC = () => {
  const { data, loading } = useQuery<{ allProjects: Project[] }>(ALL_PROJECTS);

  return (
    <Stack spacing={10} align="stretch" className="mt-4">
      <Group px={10} position="apart">
        <Title size={20} color="gray.4">
          Projects
        </Title>
        <ThemeIcon
          className="cursor-pointer"
          onClick={() => {
            console.log("asd");
          }}
        >
          <Plus />
        </ThemeIcon>
      </Group>

      <Box sx={{ marginTop: "15px" }}>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: "7px" }}>
            {data?.allProjects.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ProjectsList;
