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
  alreadySpinned: boolean;
  handleAlreadySpinned: () => void;
}

export const Tile: React.FC<Props> = ({
  letter,
  isIncludeNotCorrect,
  isCorrect,
  alreadySpinned,
  handleAlreadySpinned,
}) => {
  const [currentColor, setCurrentColor] = useState(emptyColor);
  const [innerIsCorrect, setInnerIsCorrect] = useState(false);

  function handleColor() {
    const color = isCorrect
      ? correctColor
      : isIncludeNotCorrect
      ? includedColor
      : letter
      ? originalColor
      : emptyColor;
    setCurrentColor(color);
  }

  useEffect(() => {
    handleColor();
  }, [letter, isCorrect, isIncludeNotCorrect]);

  useEffect(() => {
    setTimeout(() => {
      setInnerIsCorrect(isCorrect);
      handleAlreadySpinned();
    }, 100);
  }, [isCorrect]);

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
      className={`letterTile ${
        innerIsCorrect && !alreadySpinned ? "spinner" : ""
      }`}
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
