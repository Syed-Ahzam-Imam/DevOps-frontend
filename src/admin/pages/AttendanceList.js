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
    Text,
    useColorModeValue,
    Button,
    InputGroup,
    InputLeftElement,
    Select,
    Flex,
    Input,
    useToast,
    Container,
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
import { useNavigate } from 'react-router-dom';
import {
    BiSearch,
    BiChevronLeft,
    BiChevronRight,
} from "react-icons/bi";
import { MdCheck, MdClose } from "react-icons/md";
import { getAllAttendance } from "../../API/attendance";
import Loading from "../../components/Loading/Loading";



const AttendanceList = ({ sideBarWidth }) => {

    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [searchTerm, setSearchTerm] = useState("");
    const bgColor = useColorModeValue("white", "gray.700");
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [attendanceData, setAttendanceData] = useState([]);

    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllAttendance();
                console.log("response", response); // Assuming the endpoint for fetching attendance data is "/api/attendance"
                if (response.success) {
                    setAttendanceData(response.attendance);
                } else {
                    toast({
                        title: "Error",
                        description: response.message || "Failed to fetch attendance data",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: error.message || "Failed to fetch attendance data",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchData();
    }, [toast]);

    const handleApproveRequest = () => {
        toast({
            title: "Leave Approved",
            description: "The Leave has been approved successfully.",
            status: "success",
            duration: 3000,
            position: "top-right",
            isClosable: true,
        });
        setIsApproveOpen(false)
        setTimeout(() => {
            window.location.reload()
        }, 2000);

    };
    const handleRejectRequest = () => {
        toast({
            title: "Leave Rejected",
            description: "The Leave has been rejected successfully.",
            status: "error",  // Change "success" to "error"
            duration: 3000,
            position: "top-right",
            isClosable: true,
        });
        setIsRejectOpen(false)
        setTimeout(() => {
            window.location.reload()
        }, 2000);

    };


    const [customerName, setCustomerName] = useState("");
    const navigate = useNavigate();

    const handleRowClick = (userId) => {
        navigate(`/attendance/user/${userId}`);
    };
    const handleBranchChange = (event) => {
        const department = event.target.value;
        setSelectedDepartment(department);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event) => {
        const searchText = event.target.value?.toLowerCase();
        setSearchTerm(searchText);
    };


    const filteredItems = attendanceData.filter(
        (item) =>
            (item.User.firstName?.toLowerCase().includes(searchTerm) ||
                item.User.address?.toLowerCase().includes(searchTerm) ||
                item.User.phoneNumber?.toLowerCase().includes(searchTerm)) &&
            (selectedDepartment == "" || item.User.department == selectedDepartment)
    );


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    if (!attendanceData) {
        return (<Loading />)
    }
    return (
        <Box bg={bgColor} py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading as="h1" size="xl" mb={10}>
                        Attendance Management
                    </Heading>
                    <Tabs
                        variant="soft-rounded"
                        isFitted
                    >
                        <TabList>
                            <Tab>Employee Attendance</Tab>
                            <Tab>
                                Leave Requests
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
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
                                                placeholder="All Departments"
                                                value={selectedDepartment}
                                                onChange={handleBranchChange}
                                                borderRadius="0.3rem"
                                                py={2}
                                                fontSize="md"
                                                mr={4}
                                            >
                                                {[...new Set(attendanceData.map((employee) => employee.User.department))].map(
                                                    (department) => (
                                                        <option key={department} value={department}>
                                                            {department}
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
                                                <Th>Designation</Th>
                                                <Th>Attendance</Th>
                                                <Th>Department</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {currentItems.map((item) => (
                                                <Tr key={item.User.userId}>
                                                    <Td
                                                        onClick={() => handleRowClick(item.User.userId)}
                                                        cursor="pointer"
                                                        _hover={{ fontWeight: "bold" }}
                                                        color="gray.600"  // Set the font color to gray.600
                                                    >
                                                        {item.User.fname}
                                                    </Td>
                                                    <Td color="gray.600">{item.User.address}</Td>
                                                    <Td color="gray.600">{item.User.phoneNumber}</Td>
                                                    <Td color="gray.600">{item.User.designation}</Td>
                                                    {/* <Td>
                                                        <Tooltip label={`Attendance: ${item.User.attendance}`} placement="top" hasArrow>
                                                            <Progress
                                                                value={item.User.attendance}
                                                                size="md"
                                                                colorScheme={item.User.attendance > 80 ? 'green' : item.User.attendance > 50 ? 'yellow' : 'red'}
                                                            />
                                                        </Tooltip>
                                                    </Td> */}
                                                    <Td></Td>
                                                    <Td color="gray.600">{item.User.department}</Td>
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
                            </TabPanel>
                            <TabPanel>
                                <Box
                                    bg={bgColor}
                                    borderWidth="1px"
                                    borderColor={borderColor}
                                    borderRadius="md"
                                    p={4}
                                    shadow="md"
                                    mx="auto"
                                >
                                    <Table variant="simple" size={"lg"} >
                                        <Thead>
                                            <Tr>
                                                <Th>Name</Th>
                                                <Th>Address</Th>
                                                <Th>Contact</Th>
                                                <Th>City</Th>
                                                <Th>Attendance</Th>
                                                <Th>Branch</Th>
                                                <Th>Approve Request</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {currentItems.map((item) => (
                                                <Tr key={item.customerId}>
                                                    <Td
                                                        onClick={handleRowClick}
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
                                                        <Tooltip label={`Attendance: ${item.attendance}`} placement="top" hasArrow>
                                                            <Progress
                                                                value={item.attendance}
                                                                size="md"
                                                                colorScheme={item.attendance > 80 ? 'green' : item.attendance > 50 ? 'yellow' : 'red'}
                                                            />
                                                        </Tooltip>
                                                    </Td>
                                                    <Td color="gray.600">{item.department}</Td>
                                                    <Td>
                                                        <Flex gap={2}>
                                                            {/* Open Reject Modal */}
                                                            <IconButton
                                                                icon={<MdClose />}
                                                                colorScheme="red"
                                                                variant="solid"
                                                                size="sm"
                                                                onClick={() => setIsRejectOpen(true)}
                                                            />
                                                            {/* Open Approve Modal */}
                                                            <IconButton
                                                                icon={<MdCheck />}
                                                                colorScheme="green"
                                                                variant="solid"
                                                                size="sm"
                                                                onClick={() => {

                                                                    setIsApproveOpen(true);
                                                                }}
                                                            />
                                                        </Flex>
                                                    </Td>
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
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <Modal
                        isOpen={isRejectOpen}
                        onClose={() => setIsRejectOpen(false)}
                        isCentered
                    >
                        <ModalOverlay bg="rgba(0,0,0,0.05)" />
                        <ModalContent>
                            <ModalHeader>Reject Tranfer</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to reject this request?
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme="red"
                                    mr={3}
                                    onClick={handleRejectRequest}
                                >
                                    Reject
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsRejectOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Modal
                        isOpen={isApproveOpen}
                        onClose={() => setIsApproveOpen(false)}
                        isCentered
                    >
                        <ModalOverlay bg="rgba(0,0,0,0.05)" />
                        <ModalContent>
                            <ModalHeader>Approve Leave Request</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text fontWeight="semibold">
                                    {`Requestor: Syed Ahzam Imam`}
                                </Text>
                                <Text fontWeight="semibold" mb={5}>
                                    {`Leave Days: 7 Days`}
                                </Text>
                                Are you sure you want to approve this request?
                            </ModalBody>
                            <ModalFooter>
                                {/* Add actions buttons for Approve */}
                                <Button
                                    colorScheme="green"
                                    mr={3}
                                    onClick={handleApproveRequest}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsApproveOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            </Container>
        </Box>
    );
};

export default AttendanceList;
