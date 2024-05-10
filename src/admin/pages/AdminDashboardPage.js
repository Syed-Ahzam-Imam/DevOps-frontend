// src\pages\AdminDashboardPage.js
import React from "react";
import "../../styles/global.css";
import CryptoJS from 'crypto-js';
import {
  Box,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import AdminDashboard from '../components/dashboard/AdminDashboard';

const AdminDashboardPage = ({ sideBarWidth }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const encryptedData = localStorage.getItem('encryptedData');
  const secretKey = 'sT#9yX^pQ&$mK!2wF@8zL7vA';
  const department = "admin";



  return (
    <>
      {department === "admin" && <AdminDashboard sideBarWidth={sideBarWidth} />}

      </>
  );
};

export default AdminDashboardPage;