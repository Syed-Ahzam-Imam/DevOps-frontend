import {
    Box,
    Button,
    ChakraProvider,
    CircularProgress,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Stack,
    Text,
    VStack,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = ({ sideBarWidth }) => {
    const bgColor = useColorModeValue("white", "gray.700");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsSubmitting(true);

        setTimeout(() => {
            toast({
                title: "Form Submitted",
                description: "The form has been submitted successfully.",
                status: "success",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
            navigate('/dashboard');
        }, 3000);
    };
    return (
        <Box bg={bgColor} py={8} w="auto" minH="100vh">
            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading as="h1" size="xl" mb={4}>
                        Form
                    </Heading>
                    <Heading as="h2" size="md" mb={10}>
                        Please enter the following details as well as we didnot find it in your resume.
                    </Heading>
                    <Box p={4}>
                        <VStack align="start" spacing={4}>
                            <Stack direction={['column', 'row']} spacing={4} w="100%">
                                {/* First Name */}
                                <FormControl>
                                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                                    <Input type="text" id="firstName" placeholder="Enter your first name" />
                                </FormControl>

                                {/* Last Name */}
                                <FormControl>
                                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                                    <Input type="text" id="lastName" placeholder="Enter your last name" />
                                </FormControl>

                                {/* Email */}
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input type="email" id="email" placeholder="Enter your email" />
                                </FormControl>

                                {/* Phone */}
                                <FormControl>
                                    <FormLabel htmlFor="phone">Phone</FormLabel>
                                    <Input type="tel" id="phone" placeholder="Enter your phone number" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="position">Position Applying For</FormLabel>
                                    <Select id="position" placeholder="Select position">
                                        <option value="developer">Developer</option>
                                        <option value="designer">Designer</option>
                                        <option value="manager">Manager</option>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction={['column', 'row']} spacing={4} w="100%">
                                <FormControl>
                                    <FormLabel htmlFor="experience">Years of Experience</FormLabel>
                                    <Input type="number" id="experience" placeholder="Enter your experience" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="Certificates">Certificates</FormLabel>
                                    <Input type="number" id="Certificates" placeholder="Enter your certificates" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="experience">Graduation Year</FormLabel>
                                    <Input type="number" id="experience" placeholder="Enter your Graduation Year" />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="experience">University</FormLabel>
                                    <Input type="number" id="experience" placeholder="Enter your university name" />
                                </FormControl>

                                {/* LinkedIn Profile */}
                                <FormControl>
                                    <FormLabel htmlFor="linkedin">LinkedIn Profile</FormLabel>
                                    <Input type="text" id="linkedin" placeholder="Enter your Linkedin Profile" />
                                </FormControl>
                            </Stack>

                            <Button
                                onClick={handleSubmit}
                                minW="140px"
                                variant="solid"
                                colorScheme="teal"
                                fontWeight="500"
                                isSubmitting={isSubmitting}
                                loadingText="Submitting"
                                isDisabled={isSubmitting}
                            >
                                {isSubmitting ? <Spinner size="sm" color="white" mr={2} /> : null}
                                Submit Application
                            </Button>
                        </VStack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Form;
