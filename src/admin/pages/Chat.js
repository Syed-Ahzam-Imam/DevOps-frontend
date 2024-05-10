import React, { useState, useEffect, useRef } from 'react';

import {
    Box,
    Flex,
    Text,
    VStack,
    HStack,
    Divider,
    Input,
    Button,
    Avatar,
    Textarea,
    IconButton,
    useToast,
    CloseButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Heading,
    Container,
    useColorModeValue,
    Spacer,
    Icon,
} from '@chakra-ui/react';
import { BsDownload, BsSend } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { PiChatsFill } from "react-icons/pi";
import { BiDotsHorizontalRounded } from 'react-icons/bi';

const Chat = ({ sideBarWidth, handleSidebarWidth }) => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const [selectedChat, setSelectedChat] = useState(0);
    const [message, setMessage] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isChatSelected, setChatSelected] = useState(true);
    const [selectedTab, setSelectedTab] = useState('Chat');

    const handleChatSelected = () => {
        setChatSelected(true);
    }
    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };


    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const [chats, setChats] = useState([
        {
            id: 1,
            name: 'Syed Ahzam Imam',
            messages: [
                { id: 1, text: 'Hi there!', sender: 'user' },
                { id: 2, text: 'How are you?', sender: 'you' },
                { id: 1, text: 'Hi there!', sender: 'user' },
            ],
            time: '12:01 AM',
            avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
        },
        {
            id: 2,
            name: 'Uzair Javed',
            messages: [
                { id: 1, text: 'Hello!', sender: 'user' },
                { id: 2, text: "I'm good, thanks!", sender: 'user' },
            ],
            time: '1:12 AM',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
        },
        {
            id: 3,
            name: 'Ahmed Raza',
            messages: [
                { id: 1, text: 'Hello!', sender: 'user' },
                { id: 2, text: "I'm good, thanks!", sender: 'user' },
            ],
            time: '2:12 AM',
            avatar: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80'
            // Add more chat data here
        }
    ]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    const toast = useToast();

    const handleFileSelect = function (event) {
        const newFiles = event.target.files;

        // Filter out files that have invalid types
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg', // Example image types
            'image/png',
            // Add more image types as needed
        ];

        const validFiles = Array.from(newFiles).filter((file) => {
            const fileType = file.type.toLowerCase();
            return validTypes.some((validType) => fileType === validType);
        });

        if (validFiles.length > 0) {
            setSelectedFiles([...selectedFiles, ...validFiles]);
        } else {
            // Display an error message for invalid file types
            toast({
                title: "Invalid File Type",
                description: "Please select valid PDF or Word files.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
                // size: { base: "xs" },
            });
        }
    };

    const handleAttachmentClick = function () {
        fileInputRef.current.click();
    };

    const messageBoxRef = useRef(null);

    useEffect(function () {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    }, [chats, selectedChat]);

    const handleChatClick = function (chatId) {
        setSelectedChat(chatId);
        handleChatSelected(true);
        handleDrawerClose();
    };
    const handleTabClick = function (tab) {
        setSelectedTab(tab);

    };

    const handleSendMessage = function () {
        if (message.trim() === '' && selectedFiles.length === 0) {
            return;
        }

        // Create new messages for both text and files
        const newMessages = [];

        if (message.trim() !== '') {
            newMessages.push({ id: chats[selectedChat].messages.length + 1, text: message, sender: 'you' });
        }

        if (selectedFiles.length > 0) {
            for (const file of selectedFiles) {
                newMessages.push({ id: chats[selectedChat].messages.length + 1, file: file, sender: 'you' });
            }
        }

        const updatedChats = [...chats];
        updatedChats[selectedChat].messages.push(...newMessages);
        setChats(updatedChats);

        // Clear the message and selected files
        setMessage('');
        setSelectedFiles([]);
    };

    const handleEnterPress = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const removeSelectedFile = (fileIndex) => {
        const newSelectedFiles = [...selectedFiles];
        newSelectedFiles.splice(fileIndex, 1);
        setSelectedFiles(newSelectedFiles);
    };

    return (
        <>
            <Box bg={'white'} py={8} w="auto" minH="100vh">
                <Container maxW="container.xxl" justifySelf="center">
                    <Box
                        ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                        transition="margin 0.3s ease-in-out"
                    >
                        <Flex minH="80vh"  bg="white">
                            <Box
                                maxH="100vh"
                                w="auto"
                                maxW="20rem"
                                p={4}
                                borderRight="1px"
                                borderTop="1px"
                                borderBottom="1px"
                                borderColor="gray.200"
                                display={isChatSelected ? { base: "none", md: "block" } : 'none'}
                                bg={'gray.100'}
                            >
                                <Text fontSize={{ base: "sm", md: "xl" }} fontWeight="bold" mb={4}>
                                    Chat
                                </Text>
                                <VStack align="start" spacing={2}>
                                    {chats.map(function (chat, index) {
                                        return (
                                            <HStack
                                                width={'18rem'}
                                                key={chat.id}
                                                py={3}
                                                borderRadius="lg"
                                                cursor="pointer"
                                                color="black"
                                                justify="space-between"
                                                onClick={function () {
                                                    handleChatClick(index);
                                                }}
                                            >

                                                <Flex align="center">
                                                    <Avatar
                                                        src={chat.avatar}
                                                        size="sm"
                                                        name={chat.name}
                                                    />
                                                    <Text
                                                        fontWeight={selectedChat === index ? 'semibold' : 'normal'}
                                                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                                                        ml={3}
                                                    >
                                                        {chat.name}
                                                    </Text>
                                                </Flex>
                                                <Text
                                                    fontSize={{ base: "xs", md: "sm", lg: "md" }}
                                                >
                                                    {chat.time}
                                                </Text>

                                            </HStack>
                                        );
                                    })}
                                </VStack>
                            </Box>
                            <Flex flex={1} direction="column" px={4}>
                                {selectedChat !== null && (
                                    <>
                                        <Flex align="center" mb={2}>
                                            <Avatar
                                                src={chats[selectedChat].avatar}
                                                size="sm"
                                                name={chats[selectedChat].name}
                                                mr={2}
                                            />
                                            <HStack spacing={5}>
                                                <Text
                                                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                                                    fontWeight="bold"
                                                >
                                                    {chats[selectedChat].name}
                                                </Text>
                                                <Button
                                                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                                                    fontWeight={selectedTab === 'Chat' ? 'bold' : 'semi-bold'}
                                                    color="gray.700"
                                                    variant="unstyled"
                                                    _hover={{ textDecoration: 'underline' }}
                                                    _focus={{ boxShadow: 'none' }}
                                                    onClick={() => handleTabClick('Chat')}
                                                    borderBottom={selectedTab === 'Chat' ? '2px' : 'none'}
                                                >
                                                    Chat
                                                </Button>
                                                <Button
                                                    fontSize={{ base: "sm", md: "md", lg: "md" }}
                                                    fontWeight={selectedTab === 'Files' ? 'bold' : 'semi-bold'}
                                                    color="gray.700"
                                                    variant="unstyled"
                                                    onClick={() => handleTabClick('Files')}
                                                    borderBottom={selectedTab === 'Files' ? '2px' : 'none'}
                                                >
                                                    Files
                                                </Button>
                                                <Icon as={BiDotsHorizontalRounded} boxSize={5} color="gray.500" />
                                            </HStack>
                                        </Flex>



                                        <Box
                                            flex={1}
                                            p={4}
                                            borderWidth="1px"
                                            borderColor="gray.200"
                                            borderRadius="md"
                                            bg="white"
                                            overflowY="auto"
                                            ref={messageBoxRef}
                                        >
                                            {chats[selectedChat].messages.map(function (message, index) {
                                                return (
                                                    <Flex
                                                        key={message.id}
                                                        mb={2}
                                                        justify={message.sender === 'user' ? 'start' : 'end'}
                                                    >
                                                        {message.file ? (
                                                            <Box
                                                                bg={message.sender === 'user' ? 'gray.200' : 'blue.200'}
                                                                p={2}
                                                                borderRadius={message.sender === 'user' ? "10px 10px 10px 0px" : "10px 10px 0px 10px"}
                                                                fontWeight="semibold"
                                                                display="flex"
                                                                alignItems="center"
                                                            >
                                                                <a href={URL.createObjectURL(message.file)} download={message.file.name}>
                                                                    {message.file.name}
                                                                </a>
                                                                <IconButton
                                                                    icon={<BsDownload />}
                                                                    size="xs"
                                                                    ml={2}
                                                                // onClick={() => downloadFile(message.file.name)}
                                                                />
                                                            </Box>
                                                        ) : (
                                                            <Text
                                                                bg={message.sender === 'user' ? 'gray.200' : 'blue.200'}
                                                                p={2}
                                                                borderRadius={message.sender === 'user' ? "10px 10px 10px 0px" : "10px 10px 0px 10px"}
                                                                whiteSpace="pre-line"
                                                                textAlign={message.sender === 'user' ? "start" : "end"}
                                                            >
                                                                {message.text}
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                );
                                            })}
                                        </Box>
                                        <Divider my={4} />
                                        <HStack>
                                            {selectedFiles.length > 0 ? (
                                                <HStack
                                                    // bg="blue.200"
                                                    flex={1}
                                                    minH="100px"
                                                    justify="center"
                                                    align="center"
                                                    border="1px solid gray"
                                                    borderRadius="lg"
                                                >
                                                    {selectedFiles.map((file, index) => (
                                                        <Box
                                                            key={index}
                                                            // h="90px"
                                                            my={4}
                                                            bg="gray.200"
                                                            borderRadius="lg"
                                                            position="relative"
                                                            // border="1px solid gray"
                                                            boxShadow="md"
                                                            maxW="8rem"

                                                        >
                                                            <CloseButton
                                                                size="sm"
                                                                colorScheme='red'
                                                                color="red"
                                                                justifySelf="end"
                                                                alignSelf="end"
                                                                _hover={{
                                                                    bg: "red.100"
                                                                }}
                                                                onClick={() => removeSelectedFile(index)}
                                                            />
                                                            <Text
                                                                p={2}
                                                                borderRadius="10px"
                                                                whiteSpace="pre-line"
                                                                textAlign="start"
                                                                maxW={{ base: "5rem", md: "8rem" }}
                                                                maxH={{ base: "40px", md: "60px" }}
                                                                overflow="hidden"
                                                                fontSize={{ base: "xs", md: "md" }}
                                                            >
                                                                {file.name}
                                                            </Text>
                                                        </Box>
                                                    ))}
                                                </HStack>
                                            ) : (
                                                <Textarea
                                                    flex={1}
                                                    value={message}
                                                    onChange={function (e) {
                                                        setMessage(e.target.value);
                                                    }}
                                                    onKeyPress={handleEnterPress}
                                                    placeholder="Enter Message"
                                                    minHeight="100px"
                                                    resize="none"
                                                />
                                            )}

                                            <VStack>
                                                <Input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                    onChange={handleFileSelect}
                                                    multiple  // Allow selecting multiple files
                                                />
                                                <IconButton
                                                    colorScheme="blue"
                                                    textColor="white"
                                                    onClick={handleAttachmentClick}
                                                    icon={<ImAttachment />}
                                                />
                                                <IconButton
                                                    colorScheme="blue"
                                                    onClick={handleSendMessage}
                                                    disabled={!message && selectedFiles.length === 0}
                                                    icon={<BsSend />}
                                                />
                                            </VStack>
                                        </HStack>
                                    </>
                                )}
                            </Flex>
                        </Flex>
                        <Drawer
                            isOpen={isDrawerOpen}
                            placement="left"
                            onClose={handleDrawerClose}
                        >
                            <DrawerOverlay>
                                <DrawerContent>
                                    <DrawerCloseButton />
                                    <DrawerHeader>All Chats</DrawerHeader>
                                    <DrawerBody >
                                        <VStack align="start" spacing={2}>
                                            {chats.map(function (chat, index) {
                                                return (
                                                    <HStack
                                                        key={chat.id}
                                                        p={2}
                                                        borderRadius="lg"
                                                        cursor="pointer"
                                                        color="black"
                                                        justify="center"
                                                        align="center"
                                                        onClick={function () {
                                                            handleChatClick(index);
                                                        }}
                                                    >
                                                        <Avatar
                                                            size="sm"
                                                            name={chat.name}
                                                        />
                                                        <Text
                                                            fontWeight={selectedChat === index ? 'semibold' : 'normal'}
                                                            mt={3}
                                                            fontSize={{ base: "xs", md: "md" }}
                                                        >
                                                            {chat.name}
                                                        </Text>
                                                    </HStack>
                                                );
                                            })}
                                        </VStack>
                                    </DrawerBody>
                                </DrawerContent>
                            </DrawerOverlay>
                        </Drawer>
                    </Box>
                </Container>
            </Box>
        </>

    );
};

export default Chat;
