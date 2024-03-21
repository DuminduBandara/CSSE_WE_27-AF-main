import { Typography, Box } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: "5px" }}
        style={{
          fontWeight: "600",
          fontFamily: "Lucida Sans",
          fontSize: "35px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        style={{
          fontWeight: "100",
          fontFamily: "Lucida Sans",
          fontSize: "14px",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
