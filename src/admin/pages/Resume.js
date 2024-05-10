import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    useColorModeValue,
    Button,
    InputGroup,
    InputLeftElement,
    Select,
    Flex,
    Input,
    useToast,
    Badge,
    ButtonGroup,
    Container,
    TableContainer,
    Heading,
    Progress,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Tooltip, // Add this import
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import {
    BiSearch,
    BiChevronLeft,
    BiChevronRight,
    BiShow,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import moment from "moment";
import { BsFiletypePdf } from "react-icons/bs";
import { MdCheck, MdClose } from "react-icons/md";

const customers = [
    {
        firstName: 'Syed Ahzam',
        lastName: 'Imam',
        address: 'Deluxe Bungalows,Scheme-33',
        phoneNumber: '03032485722',
        city: 'Karachi',
        experience: 90,
        branchName: 'Gulshan Head Office',
        position: '.Net Developer'
    },
    {
        firstName: 'Muhammad Uzair',
        lastName: 'Javed',
        address: 'Block-1,Gulshan-e-Iqbal',
        phoneNumber: '03042892094',
        city: 'Karachi',
        experience: 85,
        branchName: 'Gulshan Head Office',
        position: 'DevOps Engineer'

    },
    {
        firstName: 'Ahmed Raza',
        lastName: 'Siddiqui',
        address: 'Block-7,Gulshan-e-Iqbal',
        phoneNumber: '03341756754',
        city: 'Karachi',
        experience: 70,
        branchName: 'PECHS Office',
        position: 'Cloud Security Officer'


    },
    {
        firstName: 'Ali Haider',
        lastName: 'Kazmi',
        address: 'F-11 Markaz',
        phoneNumber: '03212348768',
        city: 'Islamabad',
        experience: 40,
        branchName: 'F7 Office',
        position: 'React Developer'

    },
    {
        firstName: 'Muhammad Ali',
        address: 'F-9 Street',
        lastName: 'Sheikh',
        phoneNumber: '03042788765',
        city: 'Islamabad',
        experience: 45,
        branchName: 'Islamabad Head Office',
        position: 'AI Engineer'
    },
];


const Resume = ({ sideBarWidth }) => {

    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [searchTerm, setSearchTerm] = useState("");
    const bgColor = useColorModeValue("white", "gray.700");
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("");
    const [selectedExperience, setSelectedExperience] = useState("");

    let pdfUrl;
    const handleRowClick = (name) => {
        if (name === "Syed Ahzam") {
            pdfUrl = '/Ahzam_CV.pdf';
        }
        else if (name == "Muhammad Uzair") {
            pdfUrl = '/Uzair_CV.pdf';
        }
        else {
            pdfUrl = '/Ahmed_CV.pdf';

        }

        const newWindow = window.open(pdfUrl, '_blank');
        if (newWindow) {
            newWindow.opener = null; // Set opener to null to prevent access to the parent window
        } else {
            console.error('Unable to open PDF in a new window.');
        }
    };


    const handleBranchChange = (event) => {
        const branch = event.target.value;
        setSelectedBranch(branch);
    };
    const handlePositionChange = (event) => {
        const position = event.target.value;
        setSelectedPosition(position);
    };
    const handleExperienceChange = (event) => {
        const experience = event.target.value;
        setSelectedExperience(experience);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event) => {
        const searchText = event.target.value?.toLowerCase();
        setSearchTerm(searchText);
    };


    const filteredItems = customers.filter(
        (item) =>
            (item.firstName +
                " " +
                item.lastName?.toLowerCase().includes(searchTerm) ||
                item.address?.toLowerCase().includes(searchTerm) ||
                item.phoneNumber?.toLowerCase().includes(searchTerm)) &&
            (selectedBranch === "" || item.branchName === selectedBranch) &&
            (selectedPosition === "" || item.position === selectedPosition) &&
            (selectedExperience === "" || item.experience === selectedExperience)
    );


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <Box bg={bgColor} py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading as="h1" size="xl" mb={10}>
                        Resume Management
                    </Heading>
                    <Box
                        bg={bgColor}
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                        p={4}
                        shadow="md"
                        mx="auto"
                    >
                        <Flex align="center" mb={4} justify="space-between">
                            <Flex align="center" w="50%">
                                <InputGroup w="100%" size={"sm"}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        color="gray.400"
                                        fontSize="1.2em"
                                        ml={2}
                                    >
                                        <BiSearch />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Search by name of the Employee"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        borderRadius="0.3rem"
                                        py={2}
                                        pl={10}
                                        pr={3}
                                        fontSize="md"
                                        mr={4}
                                        _placeholder={{ color: "gray.400" }}
                                    />
                                </InputGroup>
                            </Flex>
                            <Flex align="center">
                                <Select
                                    placeholder="All Branches"
                                    value={selectedBranch}
                                    onChange={handleBranchChange}
                                    borderRadius="0.3rem"
                                    py={2}
                                    fontSize="md"
                                    mr={4}
                                >
                                    {[...new Set(customers.map((branch) => branch.branchName))].map(
                                        (branchName) => (
                                            <option key={branchName} value={branchName}>
                                                {branchName}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </Flex>
                            <Flex align="center">
                                <Select
                                    placeholder="All Positions"
                                    value={selectedPosition}
                                    onChange={handlePositionChange}
                                    borderRadius="0.3rem"
                                    py={2}
                                    fontSize="md"
                                    mr={4}
                                >
                                    {[...new Set(customers.map((branch) => branch.position))].map(
                                        (position) => (
                                            <option key={position} value={position}>
                                                {position}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </Flex>
                            <Flex align="center">
                                <Select
                                    placeholder="Experience"
                                    value={selectedExperience}
                                    onChange={handleExperienceChange}
                                    borderRadius="0.3rem"
                                    py={2}
                                    fontSize="md"
                                    mr={4}
                                >
                                    {[...new Set(customers.map((branch) => branch.experience))].map(
                                        (experience) => (
                                            <option key={experience} value={experience}>
                                                {experience}
                                            </option>
                                        )
                                    )}
                                </Select>
                            </Flex>
                        </Flex>

                        <Table variant="simple" size={"lg"} >
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Address</Th>
                                    <Th>Contact</Th>
                                    <Th>City</Th>
                                    <Th>Experience/yrs</Th>
                                    <Th>Applied At</Th>
                                    <Th>Position</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentItems.map((item) => (
                                    <Tr key={item.customerId}>
                                        <Td
                                            onClick={() => handleRowClick(item.firstName)}
                                            cursor="pointer"
                                            _hover={{ fontWeight: "bold" }}
                                            color="gray.600"  // Set the font color to gray.600
                                        >
                                            {item.firstName + " " + item.lastName}
                                        </Td>
                                        <Td color="gray.600">{item.address}</Td>
                                        <Td color="gray.600">{item.phoneNumber}</Td>
                                        <Td color="gray.600">{item.city}</Td>
                                        <Td>
                                            <Tooltip label={`Experience: ${item.experience/10}`} placement="top" hasArrow>
                                                <Progress
                                                    value={item.experience}
                                                    size="md"
                                                    colorScheme={item.experience > 80 ? 'green' : item.experience > 50 ? 'yellow' : 'red'}
                                                />
                                            </Tooltip>
                                        </Td>
                                        <Td color="gray.600">{item.branchName}</Td>
                                        <Td color="gray.600">{item.position}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <Flex justify="space-between" mt={4} align="center">
                            <Box>
                                <IconButton
                                    icon={<BiChevronLeft />}
                                    isDisabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    aria-label="Previous Page"
                                />
                                <IconButton
                                    icon={<BiChevronRight />}
                                    isDisabled={indexOfLastItem >= filteredItems.length}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    ml={2}
                                    aria-label="Next Page"
                                />
                            </Box>
                            <Text fontSize="smaller">
                                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                            </Text>
                        </Flex>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Resume;
