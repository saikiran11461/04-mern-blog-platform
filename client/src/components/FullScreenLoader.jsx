import React from "react";
import { Box, CircularProgress } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(255, 255, 255, 0.8)",
        zIndex: 1300, // Higher than modal/dialogs
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "auto",
      }}
    >
      <CircularProgress size={60} thickness={5} />
    </Box>
  );
};

export default FullScreenLoader;
