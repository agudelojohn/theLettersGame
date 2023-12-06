"use client";
import { PlayerInput } from "@/components/PlayerInput/PlayerInput";
import { TilesList } from "@/components/TilesList/TilesList";
import { Grid } from "@mui/material";
import type { Metadata } from "next";
import { useState } from "react";

const metadata: Metadata = {
  title: "The Letters Game",
};

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInput, setUserInput] = useState("");

  function handleContinue() {
    if (userInput != "") {
      setIsPlaying((prev) => !prev);
    }
  }
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        background: "#aee1fd",
        margin: 0,
        padding: 0,
      }}
    >
      {userInput && isPlaying ? (
        <TilesList />
      ) : (
        <PlayerInput
          value={userInput}
          onChange={(e) => setUserInput(e)}
          onClick={handleContinue}
        />
      )}
    </Grid>
  );
}
