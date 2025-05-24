import { Box, Paper, Avatar, Typography, Button } from "@mui/material";
import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const BlogComopnent = ({
  key,
  id,
  title,
  content,
  tags,
  comments,
  isPublished,
  author,
  createdAt,
  authId,
  showActions,
  deleteHandler,
  coverImage
}) => {
  const isAuth = authId === author._id;

  

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          width: "80%",
          margin: "auto",
          boxSizing: "border-box",
          padding: "20px 70px",
          mb: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              sx={{ width: 50, height: 50 }}
            />
            <Typography sx={{ fontWeight: "500", fontSize: "19px" }}>
              {author.name}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: "300", fontSize: "17px" }}>
              {createdAt.split("T")[0]}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              textAlignLast: "left",
              fontSize: "20px",
              fontWeight: "500",
              padding: "10px 0px",
            }}
          >
            {title}
          </Typography>
          <Box
            component="img"
            src={coverImage}
            alt="Blog preview"
            sx={{
              width: "100%",
              maxHeight: 500,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            {tags?.map((item) => (
              <Button
                key={item.id}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "16px",
                  textTransform: "none",
                  fontSize: "0.75rem",
                  padding: "4px 12px",
                  borderColor: "#ccc",
                  color: "#555",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", alignContent: "right", gap: "5px" }}>
            <RemoveRedEyeIcon sx={{ color: "black" }} />
            <Typography>Views</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ textAlign: "left", mb: "10px" }}>
            Content
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: "1rem", fontWeight: "400", textAlign: "left" }}
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, odio
            magnam suscipit quas provident perferendis similique quo ullam
            vitae! Hic assumenda esse laborum voluptates molestiae totam quam
            repudiandae ut, architecto harum asperiores dolores. Accusamus odit
            sunt, praesentium laudantium voluptatem veritatis? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Eaque sit asperiores
            assumenda rem nihil labore amet at tempora deleniti possimus.
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(0, 0, 0, 0.2)",
            fontSize: "1.5rem",
            fontWeight: 300,
            textAlign: "left",
            mt: "20px",
          }}
        >
          Published
        </Typography>
        {isAuth && showActions && (
          <Box sx={{ display: "flex", justifyContent: "right", gap: "10px" }}>
            <Button sx={{ bgcolor: "blue", color: "white" }}>Edit</Button>
            <Button sx={{ bgcolor: "red", color: "white" }} onClick={()=>deleteHandler(id)}>Delete</Button>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default BlogComopnent;
