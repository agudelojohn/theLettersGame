"use client";
import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./tile.css";

const originalColor = "#5b88a5";
const emptyColor = "#ced7ec";
const includedColor = "#e7ba43";
const correctColor = "#279719";

interface Props {
  letter?: string;
  isCorrect: boolean;
  isIncludeNotCorrect: boolean;
}

export const Tile: React.FC<Props> = ({
  letter,
  isIncludeNotCorrect,
  isCorrect,
}) => {
  const [currentColor, setCurrentColor] = useState(emptyColor);

  function handleColor() {
    const color = isIncludeNotCorrect
      ? includedColor
      : isCorrect
      ? correctColor
      : letter
      ? originalColor
      : emptyColor;
    setCurrentColor(color);
  }

  useEffect(() => {
    handleColor();
  }, [letter, isCorrect, isIncludeNotCorrect]);

  return (
    <Card
      sx={{
        background: currentColor,
        width: 100,
        height: 100,
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      variant="outlined"
      className={`letterTile ${isCorrect ? "spinner" : ""}`}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontSize: 50, color: "#FFF", fontWeight: "bold" }}
      >
        {letter}
      </Typography>
    </Card>
  );
};
