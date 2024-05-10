import React, { useState } from "react";
import {
  Text,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Button,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DataTable = ({ data, title, buttonLabel, to }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [serialNumber] = useState(1);
  return (
    <TableContainer
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      pt={6}
      pb={10}
      shadow="md"
      textAlign="center"
    >
      <SimpleGrid columns={2} justifyContent="space-between" mb={4} px={4}>
        <Text fontSize="xl" fontWeight="semibold" mb={2} align={"left"}>
          {title}
        </Text>
        <GridItem colSpan={1 / 3} style={{ justifySelf: "end" }}>
          <Link to={to}>
            <Button variant="solid" colorScheme="blue" size={{ base: "sm" }}>
              {buttonLabel}
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>

      <Table variant="simple" >
        <Thead>
          <Tr bg="gray.100" color="white">
            <Th>Project</Th>
            <Th>Task</Th>
            <Th>Logs</Th>
            <Th>Due Date</Th>
          </Tr>

        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.projectname}</Td>
              <Td>{item.taskname}</Td>
              <Td>{item.worklog}</Td>
              <Td>{item.duedate}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
