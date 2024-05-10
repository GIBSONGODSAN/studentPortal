/** @format */

//Student create page
import React, { useState, useEffect } from "react";
import axios from "axios";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Tr,
  Td,
  Input,
  useColorModeValue,
  Button,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Tooltip } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { server_URL, URL } from "controller/urls_config";
import { useToast } from '@chakra-ui/react'

function GeneralInformationdata() {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const history = useHistory();
  const emailid = localStorage.getItem('useremail');
  const isUser = localStorage.getItem('isUser');
  
  const [userData, setUserData] = useState(() => {
    const initialUserData = {};
    const fields = [
      "roll_no",
      "reg_no",
      "sname",
      "aadhar_no",
      "email",
      "licet_email",
      "batch",
      "dept",
      "quota",
      "gender",
      "dob",
      "nationality",
      "contact_no",
      "father_name",
      "mother_name",
      "father_mob_no",
      "mother_mob_no",
      "community",
      "religion",
      "if_catholic_parish",
      "dalit_catholic_yn",
      "present_address",
      "permanent_address",
      "blood_group",
      "mother_tongue",
      "lang_know",
      "pan",
      "father_qualification",
      "mother_qualification",
      "father_occupation",
      "mother_occupation",
      "father_office_address",
      "mother_office_address",
      "father_annual_income",
      "mother_annual_income",
      "father_email",
      "mother_email",
      "guardian_name",
      "guardian_qualification",
      "guardian_occupation",
      "guardian_office_address",
      "guardian_annual_income",
      "guardian_mob_no",
      "guardian_email",
      "no_of_siblings",
      "name_siblings",
      "qualification_siblings",
      "occupation_siblings",
      "alumni_licet_loyola_yn",
      "application_no",
      "date_of_ad",
      "regular_lateral_rl",
      "dayschl_hosteller_dh",
      "scholarship_name",
      "scholarship_amount",
      "first_graduate_yn",
      "eco_backward_yn",
      "programming_languages",
      "software_proficiency",
      "dept_rel_proficiency",
      "certifications",
      "other_skills",
      "aptitude_analytical_skills",
      "communication_skills",
      "social_media_exposure",
      "leadership_skills",
      "other_interpersonal_skills",
      "short_term_goal",
      "long_term_goal",
      "membership_name",
      "membership_no",
      "membership_duration",
      "hse_school_name",
      "hse_board",
      "hse_medium",
      "hse_sec_lang",
      "hse_group",
      "hse_marks",
      "hse_percentage",
      "hse_cutoff",
      "hse_attempts",
      "sslc_school_name",
      "sslc_board",
      "sslc_medium",
      "sslc_sec_lang",
      "sslc_marks",
      "sslc_percentage",
      "sslc_attempts",
    ];

    fields.forEach((field) => {
      initialUserData[field] = '';
    });
  
    return initialUserData;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = { offemail: localStorage.getItem('useremail') };
        const response = await axios.post(server_URL + 'getStudentDetails', requestData);
  
        setUserData((prevUserData) => {
          const newData = isUser === '0' ? { ...prevUserData } : { ...prevUserData[0] };
  
          if (response.data) {
            Object.keys(newData).forEach((field) => {
              // Check if the field exists in the response data and is not undefined
              if (response.data.hasOwnProperty(field) && response.data[field] !== undefined) {
                newData[field] = response.data[field];
              } else {
                // Set a default value if the field is missing in the response
                newData[field] = "";
              }
            });
          }
          return isUser === '0' ? newData : [newData];
        });
      } catch (error) {
        console.error('Axios request error:', error);
      }
    };
    if (isUser === '1') {
      fetchData();
    }
  }, [isUser]);
  
  
  
  const handleInputChange = (fieldName, event) => {
    if (event && event.target) {
      setUserData((prevUserData) => {
        const newData = isUser === '0' ? { ...prevUserData } : { ...prevUserData[0] };
        newData[fieldName] = event.target.value;
        return isUser === '0' ? newData : [newData];
      });
    } else {
      console.error('Event or event.target is undefined');
    }
  };
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Message, setMessage] = useState(null);
  function logout() {
    window.location.href = URL + "Student#/auth/SignIn";
  }

  function funinsert() {
    let params = new URLSearchParams();
    if (document.getElementById("RID") == 0) {
      alert("ERROR");
    } else {
    }

    let columns_to_be_filled = [
      "RID",
      "NID",
      "REID",
      "SID",
      "DEPT",
      "BATCH",
      "NATIONID",
      "RELIGIONID",
      "DALITID",
      "COMMUNITYID",
      "BLOODID",
      "MOTHERID",
      "CONTACTID",
      "AADHARID",
      "PEREMID",
      "OFFEMID",
      "PEREMID",
      "PREADDRID",
      "LANKNO",
      "NOS1",
      "BOARD1",
      "MOI1",
      "SL1",
      "GROUP1",
      "TM1",
      "OP1",
      "COM1",
      "NOA1",
      "NOS2",
      "BOARD2",
      "MOI2",
      "SL2",
      "TM2",
      "OP2",
      "NOA2",
      "FN",
      "FMN",
      "MN",
      "MMN",
      "NOS",
      "DOA",
      "RL",
      "DH",
    ];

    let mapping_columns = {
      RID: "roll number",
      NID: "name",
      REID: "register number",
      SID: "sex",
      DEPT: "department",
      BATCH: "batch",
      NATIONID: "nationality",
      RELIGIONID: "religion",
      DALITID: "IS DALIT",
      COMMUNITYID: "community",
      BLOODID: "blood group",
      MOTHERID: "mother tongue",
      CONTACTID: "contact no",
      AADHARID: "aadhar id",
      PEREMID: "personal email id",
      OFFEMAID: "official email id",
      PREADDRID: "address",
      LANKNO: "Languages Known",
      FN: "Father's Name",
      FMN: "Father's Mobile No",
      MN: "Mother's Name",
      MMN: "Mother's Mobile No",
      DOA: "Date of Application",
      RL: "Regular/Lateral Entry",
      DH: "Day Scholar/Hosteler",
      NOS1: "HS School Name",
      NOS2: "10th School Name",
      BOARD1: "Board HS",
      BOARD2: "10th HS",
      MOI1: "HS Medium of Instruction",
      MOI2: "10th Medium of Instruction",
      SL1: "Second Language in HS",
      SL2: "Second Language in 10th",
      GROUP1: "Group in HS",
      GROUP2: "Group in 10th",
      TM1: "Total Marks in HS",
      TM2: "Total Marks in 10th",
      OP1: "Overall Percentage in HS",
      OP2: "Overall Percentage in 10th",
      COM1: "Cut off Marks in HS",
      NOA1: "No of Attempts in HS",
      NOA2: "No of Attempts in 10th",
    };

    let not_filled_msg = "";
    let inx = 0;

    for (var inx1 = 0; inx1 < columns_to_be_filled.length; inx1++) {
      try {
        if (document.getElementById(columns_to_be_filled[inx1]).value == "") {
          inx += 1;
          not_filled_msg +=
            inx + ". " + mapping_columns[columns_to_be_filled[inx1]] + "\n";
        }
      } catch {
        alert(columns_to_be_filled[inx1]);
      }
    }

    if (inx == 0) {
      if (document.getElementById("CONTACTID").value.length!=12) {
        toastIdRef.current = toast({ description: "Invalid Contact Number! ( Format : 919876543210 )", status: 'warning',isClosable: true, position:"top" })
      } else if(document.getElementById("FMN").value.length!=12){
        toastIdRef.current = toast({ description: "Invalid Father's Number! ( Format : 919876543210 )", status: 'warning',isClosable: true, position:"top" })
      } else if(document.getElementById("MMN").value.length!=12){
        toastIdRef.current = toast({ description: "Invalid Mother's Number! ( Format : 919876543210 )", status: 'warning',isClosable: true, position:"top" })
      } else if(document.getElementById("GMN").value.length!=12){
        toastIdRef.current = toast({ description: "Invalid Gaurdian's Number! ( Format : 919876543210 )", status: 'warning',isClosable: true, position:"top" })
      } else{
        document.getElementById("last").disabled = true;
        axios.post(server_URL + "studentinsert", req.body).then((results) => {
          toastIdRef.current = toast({
            description: results.data + " Redirecting...",
            status: 'success',
            isClosable: true,
            position: "top"
          })
          setTimeout(() => {
            history.push('/auth/SignIn')
          }, 2000)
        }).catch(() => {
          toastIdRef.current = toast({
            description: "Unable to submit. Verify your details...",
            status: 'error',
            isClosable: true,
            position: "top"
          })
        });
      }
      // window.location.href = URL + "Student#/auth/signin";
    } else {
      setMessage(not_filled_msg)
      onOpen()
      // alert(not_filled_msg);
    }
  }

  const textColor = useColorModeValue("gray.700", "white");
  const backgroundColor = "darkblue";
  const borderColor = "white";

  return (
    <Flex direction="column" p="0rem 2rem 0rem 2rem">
      <Button
        onClick={logout}
        marginBottom="1rem"
        marginTop="1rem"
        marginRight="1rem"
        colorScheme="blue"
        variant="solid"
        alignSelf="flex-end"
        textColor={"gold"}
      >
        log out
      </Button>
      <SimpleGrid columns={{ sm: 1, md: 1, xl: 1 }} gap={4}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Fields Not Filled</ModalHeader>
            <ModalCloseButton />
            <ModalBody>            
               <pre>{Message}</pre>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

       
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
          <CardHeader p="6px 0px 22px 0px">
            <Text fontSize="xl" color={"gold"} fontWeight="bold">
              General Particulars
            </Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple" color={"gold"}>
              <Tbody>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Student Name
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="NID"
                            borderRadius="5px"
                            color={"black"}
                            fontSize="sm"
                            type="text"
                            placeholder="name"
                            bg="white"
                            value={userData.sname}
                            onChange={(e) => handleInputChange('name', e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Roll Number
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Tooltip label="Ex: 19CS048" placement="right">
                            <Input
                              minWidth="30em"
                              id="RID"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              color={"black"}
                              placeholder="roll no"
                              bg="white"
                              defaultValue={userData.roll_no}
                              onChange={(e) => handleInputChange('roll_no', e)}
                            />
                          </Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Register Number
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Tooltip label="Ex: 311119104010" placement="right">
                            <Input
                              minWidth="30em"
                              id="REID"
                              borderRadius="5px"
                              fontSize="sm"
                              type="number"
                              placeholder="register no"
                              color={"black"}
                              bg="white"
                              defaultValue={userData.reg_no}
                              onChange={(e) => handleInputChange('reg_no', e)}
                            />
                          </Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Gender
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <Select
                            minWidth="26em"
                            id="SID"
                            placeholder="Select Gender"
                            bg="white"
                            color={"black"}
                            isRequired
                            defaultValue={userData.gender}
                            onChange={(e) => handleInputChange('gender',e)}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Select>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Date Of Birth
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="DOBID"
                            color={"black"}
                            borderRadius="5px"
                            fontSize="sm"
                            type="date"
                            bg="white"
                            defaultValue={userData.dob}
                            onChange={(e) => handleInputChange('dob', e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Department
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Tooltip label="Ex: CSE" placement="right">
                            <Input
                              minWidth="30em"
                              id="DEPT"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Department"
                              defaultValue={userData.dept}
                              onChange={(e) => handleInputChange('dept', e)}
                            />
                          </Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Batch
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Tooltip label="Ex: 2019-2023" placement="right">
                            <Input
                              minWidth="30em"
                              id="BATCH"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              color={"black"}
                              placeholder="Batch"
                              bg="white"
                              defaultValue={userData.batch}
                              onChange={(e) => handleInputChange('batch', e)}
                            />
                          </Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Nationality
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                        <Tooltip label="Ex: Indian" placement="right">
                          <Input
                            minWidth="30em"
                            id="NATIONID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="nationality"
                            bg="white"
                            defaultValue={userData.nationality}
                            onChange={(e) => handleInputChange('nationality',e)}
                          /></Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Religion
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="RELIGIONID"
                            borderRadius="5px"
                            fontSize="sm"
                            type="text"
                            color={"black"}
                            placeholder="religion"
                            bg="white"
                            defaultValue={userData.religion}
                            onChange={(e)=>handleInputChange('religion',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <Text
                          fontSize="md"
                          color={"gold"}
                          fontWeight="bold"
                          minWidth="100%"
                        >
                          If Catholic, Parish ?
                        </Text>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="PARISHID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="Enter Parish"
                            bg="white"
                            defaultValue={userData.if_catholic_parish}
                            onChange={(e)=>handleInputChange('if_catholic_parish',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Dalit Catholic
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Select
                            minWidth="26em"
                            id="DALITID"
                            placeholder="Select Option"
                            color={"black"}
                            isRequired
                            bg="white"
                            defaultValue={userData.dalit_catholic_yn} 
                            onChange={(e)=>handleInputChange('dalit_catholic_yn',e)}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Select>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Community
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Tooltip label="ALL CAPS" placement="right">
                            <Input
                              minWidth="30em"
                              id="COMMUNITYID"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="community"
                              bg="white"
                              defaultValue={userData.community}
                              onChange={(e)=>handleInputChange('community',e)}
                            />
                          </Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Blood Group
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Tooltip label="Ex: AB+ve" placement="right">
                            <Input
                              minWidth="30em"
                              id="BLOODID"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="blood group"
                              bg="white"
                              defaultValue={userData.blood_group}
                              onChange={(e)=>handleInputChange('blood_group',e)}
                            />
                          </Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Mother Tongue
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="MOTHERID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="mother tounge"
                            bg="white"
                            defaultValue={userData.mother_tongue}
                            onChange={(e)=>handleInputChange('mother_tongue',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Contact Number
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                        <Tooltip label="Include 91 before number EX: 919876543210" placement="right">
                          <Input
                            minWidth="30em"
                            id="CONTACTID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="number"
                            placeholder="contact no."
                            bg="white"
                            defaultValue={userData.contact_no}
                            onChange={(e)=>handleInputChange('contact_no',e)}
                          /></Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Aadhar Number
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="AADHARID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="number"
                            placeholder="aadhar no."
                            bg="white"
                            defaultValue={userData.aadhar_no}
                            onChange={(e)=>handleInputChange('aadhar_no',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
  <Td minWidth={{ sm: "17rem" }}>
    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
      <Flex direction="column">
        <FormControl isRequired>
          <FormLabel fontSize="md" color={"gold"} fontWeight="bold" minWidth="100%">
            Official Email ID
          </FormLabel>
        </FormControl>
      </Flex>
    </Flex>
  </Td>
  <Td minWidth={{ sm: "17rem" }}>
    <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
      <Flex direction="column">
        <FormControl>
          <Input
            minWidth="30em"
            id="OFFEMID"
            borderRadius="5px"
            fontSize="sm"
            color={"black"}
            type="text"
            bg="white"
            defaultValue={localStorage.getItem("useremail")}
            placeholder="official mail"
           readOnly
            // Remove the disabled attribute to enable typing
          />
        </FormControl>
      </Flex>
    </Flex>
  </Td>
</Tr>

                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Personal Email ID
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="PEREMID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="personal email"
                            bg="white"
                            defaultValue={userData.personal_email}
                            onChange={(e)=>handleInputChange('email',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Present Address
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="PREADDRID"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="present address"
                            bg="white"
                            defaultValue={userData.present_address}
                            onChange={(e)=>handleInputChange('present_address',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Permanent Address
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="PERADDRID"
                            borderRadius="5px"
                            fontSize="sm"
                            type="text"
                            color={"black"}
                            placeholder="Permanent address"
                            bg="white"
                            defaultValue={userData.permanent_address}
                            onChange={(e)=>handleInputChange('permanent_address',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl isRequired>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Languages Known
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                        <Tooltip label="EX: Tamil, English, Hindi" placement="right">
                          <Input
                            minWidth="30em"
                            id="LANKNO"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="languages known"
                            bg="white"
                            defaultValue={userData.lang_know}
                            onChange={(e)=>handleInputChange('lang_know',e)}
                          /></Tooltip>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <FormLabel
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            PAN
                          </FormLabel>
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                  <Td minWidth={{ sm: "17rem" }}>
                    <Flex
                      align="center"
                      py=".8rem"
                      minWidth="100%"
                      flexWrap="nowrap"
                    >
                      <Flex direction="column">
                        <FormControl>
                          <Input
                            minWidth="30em"
                            id="PAN"
                            borderRadius="5px"
                            fontSize="sm"
                            color={"black"}
                            type="text"
                            placeholder="PAN Number"
                            bg="white"
                            defaultValue={userData.pan}
                            onChange={(e)=>handleInputChange('pan',e)}
                          />
                        </FormControl>
                      </Flex>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} gap={4}>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Higher Secondary Details
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Name Of School
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              
                              id="NOS1"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              color={"black"}
                              placeholder="School name"
                              bg="white"
                              defaultValue={userData.hse_school_name}
                              onChange={(e)=>handleInputChange('hse_school_name',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Board
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: STATE/CBSE" placement="right">
                              <Input
                              
                                id="BOARD1"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="text"
                                placeholder="Board"
                                bg="white"
                                defaultValue={userData.hse_board}
                                onChange={(e)=>handleInputChange('hse_board',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Medium Of Instruction
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MOI1"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              placeholder="Medium Of Instruction"
                              color={"black"}
                              bg="white"
                              defaultValue={userData.hse_medium}
                              onChange={(e)=>handleInputChange('hse_medium',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Second Language
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SL1"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              defaultValue={userData.hse_sec_lang}
                              onChange={(e)=>handleInputChange('hse_sec_lang',e)}
                              placeholder="Second Language"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Group
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: BIO MATHS" placement="right">
                              <Input
                                id="GROUP1"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="text"
                                placeholder="group"
                                bg="white"
                                defaultValue={userData.hse_group}
                                onChange={(e)=>handleInputChange('hse_group',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Total Marks
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="TM1"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              placeholder="total marks"
                              bg="white"
                              defaultValue={userData.hse_marks}
                              onChange={(e)=>handleInputChange('hse_marks',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Overall Percentage
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 90.25" placement="right">
                              <Input
                                id="OP1"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="number"
                                placeholder="Overall Percentage"
                                bg="white"
                                defaultValue={userData.hse_percentage}
                                onChange={(e)=>handleInputChange('hse_percentage',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Cut-Off Marks
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 170.25" placement="right">
                              <Input
                                id="COM1"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="number"
                                placeholder="Cut-Off Marks"
                                bg="white"
                                defaultValue={userData.hse_cutoff}
                                onChange={(e)=>handleInputChange('hse_cutoff',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Number Of Attempts
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 1" placement="right">
                              <Input
                                id="NOA1"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="number"
                                bg="white"
                                placeholder="No. Of Attempts"
                                defaultValue={userData.hse_attempts}
                                onChange={(e)=>handleInputChange('hse_attempts',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                10th Details
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Name Of School
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="NOS2"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="School name"
                              bg="white"
                              defaultValue={userData.sslc_school_name}
                              onChange={(e)=>handleInputChange('sslc_school_name',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Board
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: STATE/CBSE" placement="right">
                              <Input
                                id="BOARD2"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="text"
                                placeholder="Board"
                                bg="white"
                                defaultValue={userData.sslc_board}
                                onChange={(e)=>handleInputChange('sslc_board',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Medium Of Instruction
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MOI2"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Medium Of Instruction"
                              bg="white"
                              defaultValue={userData.sslc_medium}
                              onChange={(e)=>handleInputChange('sslc_medium',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Second Language
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SL2"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Second Language"
                              bg="white"
                              defaultValue={userData.sslc_sec_lang}
                              onChange={(e)=>handleInputChange('sslc_sec_lang',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Total Marks
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="TM2"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              placeholder="total marks"
                              bg="white"
                              defaultValue={userData.sslc_marks}
                              onChange={(e)=>handleInputChange('sslc_marks',e)} 
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Overall Percentage
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 90.25" placement="right">
                              <Input
                                id="OP2"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="number"
                                placeholder="Overall Percentage"
                                bg="white"
                                defaultValue={userData.sslc_percentage}
                                onChange={(e)=>handleInputChange('sslc_percentage',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Number Of Attempts
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 1" placement="right">
                              <Input
                                id="NOA2"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="number"
                                placeholder="No. Of Attempts"
                                bg="white"
                                defaultValue={userData.sslc_attempts}
                                onChange={(e)=>handleInputChange('sslc_attempts',e)}
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Father's Details
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Father's Name
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="FN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Father's Name"
                              bg="white"
                              defaultValue={userData.father_name}
                              onChange={(e)=>handleInputChange('father_name',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Father's Qualification
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="FQ"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Father's Qualification"
                              bg="white"
                              defaultValue={userData.father_qualification}
                              onChange={(e)=>handleInputChange('father_qualification',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Fathers Occupation
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="FO"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Fathers Occupation"
                              bg="white"
                              defaultValue={userData.father_occupation}
                              onChange={(e)=>handleInputChange('father_occupation',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Father's Office Address
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="FOA"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Father's Office Address"
                              bg="white"
                              defaultValue={userData.father_office_address}
                              onChange={(e)=>handleInputChange('father_office_address',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Father's Annual Income
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="FAI"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              placeholder="Enter Father's Annual Income"
                              bg="white"
                              defaultValue={userData.father_annual_income}
                              onChange={(e)=>handleInputChange('father_annual_income',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Father's Mobile Number
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                          <Tooltip label="Include 91 before number EX: 919876543210" placement="right">
                            <Input
                              id="FMN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              placeholder="Enter Father's Mobile No."
                              bg="white"
                              defaultValue={userData.father_mob_no}
                              onChange={(e)=>handleInputChange('father_mob_no',e)}
                            />
                          </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Father's Email ID
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="FEI"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Father's Email ID"
                              bg="white"
                              defaultValue={userData.father_email}
                              onChange={(e)=>handleInputChange('father_email',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Name
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="GN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Guardian Name"
                              bg="white"
                              defaultValue={userData.guardian_name}
                              onChange={(e)=>handleInputChange('guardian_name',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Qualification
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="GQ"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Guardian Qualification"
                              bg="white"
                              defaultValue={userData.guardian_qualification}
                              onChange={(e)=>handleInputChange('guardian_qualification',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Occupation
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="GO"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Fathers Occupation"
                              bg="white"
                              defaultValue={userData.guardian_occupation}
                              onChange={(e)=>handleInputChange('guardian_occupation',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Office Address
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="GOA"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              color={"black"}
                              placeholder="Enter Guardian Office Address"
                              bg="white"
                              defaultValue={userData.guardian_office_address}
                              onChange={(e)=>handleInputChange('guardian_office_address',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Annual Income
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="GAI"
                              borderRadius="5px"
                              fontSize="sm"
                              type="number"
                              color={"black"}
                              placeholder="Enter Guardian Annual Income"
                              bg="white"
                              defaultValue={userData.guardian_annual_income}
                              onChange={(e)=>handleInputChange('guardian_annual_income',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Mobile No.
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                          <Tooltip label="Include 91 before number EX: 919876543210" placement="right">
                            <Input
                              id="GMN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              placeholder="Enter Guardian Mobile No."
                              bg="white"
                              defaultValue={userData.guardian_mob_no} 
                              onChange={(e)=>handleInputChange('guardian_mob_no',e)}
                            />
                          </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Guardian's Email ID
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="GEI"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter Guardian Email ID"
                              defaultValue={userData.guardian_email}
                              onChange={(e)=>handleInputChange('guardian_email',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Mother's and Sibling Details
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Mother's Name
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Mother's Name"
                              bg="white"
                              defaultValue={userData.mother_name}
                              onChange={(e)=>handleInputChange('mother_name',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Mother's Qualification
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MQ"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Mother's Qualification"
                              bg="white"
                              defaultValue={userData.mother_qualification}
                              onChange={(e)=>handleInputChange('mother_qualification',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Mother's Occupation
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MO"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter Mother's Occupation"
                              bg="white"
                              defaultValue={userData.mother_occupation}
                              onChange={(e)=>handleInputChange('mother_occupation',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Mother's Office Address
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MOA"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              defaultValue={userData.mother_office_address}
                              onChange={(e)=>handleInputChange('mother_office_address',e)}
                              placeholder="Enter Mother's Office Address"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Mother's Annual Income
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MAI"
                              borderRadius="5px"
                              fontSize="sm"
                              type="number"
                              color={"black"}
                              bg="white"
                              defaultValue={userData.mother_annual_income}
                              onChange={(e)=>handleInputChange('mother_annual_income',e)}
                              placeholder="Enter Mother's Annual Income"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Mother's Mobile Number
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                          <Tooltip label="Include 91 before number EX: 919876543210" placement="right">
                            <Input
                              id="MMN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              bg="white"
                              defaultValue={userData.mother_mob_no}
                              onChange={(e)=>handleInputChange('mother_mob_no',e)}
                              placeholder="Enter Mother's Mobile No."
                            />
                          </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Mother's Email ID
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="MEI"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              defaultValue={userData.mother_email}
                              placeholder="Enter Mother's Email ID"
                              onChange={(e)=>handleInputChange('mother_email',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Number Of Siblings
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 1" placement="right">
                              <Input
                                id="NOS"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="number"
                                bg="white"
                                defaultValue={userData.no_of_siblings}
                                onChange={(e)=>handleInputChange('no_of_siblings',e)}
                                placeholder="Enter No. Of Siblings"
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  {/* <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Name Of Siblings
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="NAS"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              placeholder="Enter Name Of Siblings"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Qualification Of Siblings
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="QOS"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              placeholder="Enter Qualification Of Siblings"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Sibling's Occupation
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SO"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              placeholder="Enter Sibling's Occupation"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Alumni Of LICET Or LOYOLA
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Select
                              id="AOL"
                              placeholder="Select Option"
                              isRequired
                            >
                              <option defaultValue="Yes">Yes</option>
                              <option defaultValue="No">No</option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr> */}
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Admission Details
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Application Number
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="AN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Application No."
                              defaultValue={userData.application_no}
                              onChange={(e)=>handleInputChange('application_no',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Date Of Admission
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="DOA"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="date"
                              bg="white"
                              defaultValue={userData.date_of_admission}
                              onChange={(e)=>handleInputChange('date_of_admission',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Quota
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Select
                              id="QUO"
                              placeholder="Select Option"
                              isRequired
                              color={"black"}
                              bg="white"
                              defaultValue={userData.quota}
                              onChange={(e)=>handleInputChange('quota',e)}
                            >
                              <option value="GQ">
                                Government Quota
                              </option>
                              <option value="MQ">
                                Management Quota
                              </option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Regular/Lateral Entry
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Select id="RL" 
                            placeholder="Select Option" 
                            bg="white"color={"black"}  
                            defaultValue={userData.regular_lateral_rl} 
                            onChange={(e)=>handleInputChange('regular_lateral_rl',e)}>                            
                              <option value="Regular">Regular</option>
                              <option value="Lateral">Lateral</option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <FormLabel
                              fontSize="md"
                              color={"gold"}
                              fontWeight="bold"
                              minWidth="100%"
                            >
                              Day Scholar/Hosteller
                            </FormLabel>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Select
                              id="DH"
                              placeholder="Select Option"
                              isRequired
                              color={"black"}
                              bg="white"
                              defaultValue={userData.dayschl_hosteller_dh}
                              onChange={(e)=>handleInputChange('dayschl_hosteller_dh',e)}
                            >
                              <option value="D">Day Scholar</option>
                              <option value="H">Hosteller</option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Scholarship Details
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Scholarship Name
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SN"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Scholarship Name"
                              bg="white"
                              defaultValue={userData.scholarship_name}
                              onChange={(e)=>handleInputChange('scholarship_name',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Scholarship Amount
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SA"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="number"
                              placeholder="Scholarship Amount"
                              bg="white"
                              defaultValue={userData.scholarship_amount}
                              onChange={(e)=>handleInputChange('scholarship_amount',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            First Graduate
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl isRequired>
                            <Select
                              id="FG"
                              placeholder="Select Option"
                              color={"black"}
                              isRequired
                              bg="white"
                              defaultValue={userData.first_graduate_yn}
                              onChange={(e)=>handleInputChange('first_graduate_yn',e)}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Economically Backward (Annual Income Of Parents Less
                            than 1LPA)
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Select
                              id="EB"
                              placeholder="Select Option"
                              color={"black"}
                              isRequired
                              bg="white"
                              defaultValue={userData.eco_backward_yn}
                              onChange={(e)=>handleInputChange('eco_backward_yn',e)}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Select>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Technical Skills
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Programming Languages
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                          <Tooltip label="Ex: Python, Java" placement="right">
                            <Input
                              id="PL"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter if any"
                              bg="white"
                              defaultValue={userData.programming_languages}
                              onChange={(e)=>handleInputChange('programming_languages',e )}
                            />
                          </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Software Proficiency
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SP"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter if any"
                              defaultValue={userData.software_proficiency}
                              onChange={(e)=>handleInputChange('software_proficiency',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Department Related Proficiency
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="DRP"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter if any"
                              defaultValue={userData.dept_rel_proficiency}
                              onChange={(e)=>handleInputChange('dept_rel_proficiency',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Certifications
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="CER"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter if any"
                              defaultValue={userData.certifications}
                              onChange={(e)=>handleInputChange('certifications',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Other Skills
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="OS"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter if any"
                              defaultValue={userData.other_skills}
                              onChange={(e)=>handleInputChange('other_skills',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Non - Technical Skills
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Aptitude / Analytical Skills
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="AAS"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              color={"black"}
                              placeholder="Enter if any"
                              bg="white"
                              defaultValue={userData.aptitude_analytical_skills}
                              onChange={(e)=>handleInputChange('aptitude_analytical_skills',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Communication Skills
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="CS"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Enter if any"
                              bg="white"
                              defaultValue={userData.communication_skills}
                              onChange={(e)=>handleInputChange('communication_skills',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Social Media Exposure
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="SME"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter if any"
                              defaultValue={userData.social_media_exposure}
                              onChange={(e)=>handleInputChange('social_media_exposure',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Leadership Skills
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="LS"
                              borderRadius="5px"
                              fontSize="sm"
                              type="text"
                              color={"black"}
                              bg="white"
                              placeholder="Enter if any"
                              defaultValue={userData.leadership_skills}
                              onChange={(e)=>handleInputChange('leadership_skills',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Other Interpersonal Skills
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="OIS"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Enter if any" 
                              defaultValue={userData.other_interpersonal_skills}
                              onChange={(e)=>handleInputChange('other_interpersonal_skills',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Goals
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Short Term Goals
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="STG"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              placeholder="Short Term Goals"
                              bg="white"
                              defaultValue={userData.short_term_goal}
                              onChange={(e)=>handleInputChange('short_term_goal',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Long Term Goals
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="LTG"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              defaultValue={userData.long_term_goal}
                              onChange={(e)=>handleInputChange('long_term_goal',e)}
                              placeholder="Long Term Goals"
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          <Card overflowX={{ sm: "scroll", xl: "hidden" }}bg={backgroundColor} color={"gold"} borderColor={borderColor}>
            <CardHeader p="6px 0px 22px 0px">
              <Text fontSize="xl" color={"gold"} fontWeight="bold">
                Professional Membership
              </Text>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color={"gold"}>
                <Tbody>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Name
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: SAE" placement="right">
                              <Input
                                id="PMNA"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="text"
                                bg="white"
                                defaultValue={userData.membership_name}
                                onChange={(e)=>handleInputChange('membership_name',e)}
                                placeholder="Professional Membership Name"
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Membership No.
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Input
                              id="PMNO"
                              borderRadius="5px"
                              fontSize="sm"
                              color={"black"}
                              type="text"
                              bg="white"
                              placeholder="Membership No."
                              defaultValue={userData.membership_no}
                              onChange={(e)=>handleInputChange('membership_no',e)}
                            />
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={"gold"}
                            fontWeight="bold"
                            minWidth="100%"
                          >
                            Duration
                          </Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td minWidth={{ sm: "17rem" }}>
                      <Flex
                        align="center"
                        py=".8rem"
                        minWidth="100%"
                        flexWrap="nowrap"
                      >
                        <Flex direction="column">
                          <FormControl>
                            <Tooltip label="Ex: 2 MONTHS" placement="right">
                              <Input
                                id="DUR"
                                borderRadius="5px"
                                fontSize="sm"
                                color={"black"}
                                type="text"
                                bg="white"
                                defaultValue={userData.membership_duration}
                                onChange={(e)=>handleInputChange('membership_duration',e)}
                                placeholder="Membership Duration"
                              />
                            </Tooltip>
                          </FormControl>
                        </Flex>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </CardBody>
          </Card>
        </SimpleGrid>
      </SimpleGrid>
      <Button
         onClick={funinsert}
         alignSelf="center"
          marginBottom="1rem"
          marginTop="1rem"
           marginRight="1rem"
            width="30%"
           colorScheme="blue"
            variant="solid"
            textColor="gold"
             id="last">
             
     
        Submit
      </Button>
    </Flex>
  );
}

export default GeneralInformationdata;