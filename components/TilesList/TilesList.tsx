import { Button, Grid, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Tile } from "../Tile/Tile";

interface Props {
  wordToPlay: string;
  numberOfTries: number;
  suggestion?: string;
}

type ITry = ICharacter[];

interface ICharacter {
  value: string;
  isCorrect: boolean;
  isIncludeNotCorrect: boolean;
  alreadySpinned: boolean;
}

const emptyCharacter: ICharacter = {
  value: "",
  isCorrect: false,
  isIncludeNotCorrect: false,
  alreadySpinned: false,
};

export const TilesList: React.FC<Props> = ({
  wordToPlay,
  numberOfTries,
  suggestion,
}) => {
  const [playerInput, setPlayerInput] = useState<{
    value: string;
    index: number;
  }>({ value: "", index: 0 });
  const [characters, setCharacters] = useState<string[]>([]);
  const [rowsOfTries, setRowsOfTries] = useState<ITry[]>([]);

  useEffect(() => {
    if (numberOfTries && characters) {
      const initialTries: ITry[] = [];
      for (let i = 0; i < numberOfTries; i++) {
        const newRow: ITry = [];
        characters.forEach((char, i) => {
          newRow.push(emptyCharacter);
        });
        initialTries.push(newRow);
      }
      setRowsOfTries(initialTries);
    }
  }, [numberOfTries, characters]);

  useEffect(() => {
    if (wordToPlay) {
      let newCharactersList: string[] = [];
      for (let i = 0; i <= wordToPlay.length - 1; i++) {
        newCharactersList.push(wordToPlay.charAt(i).toLocaleLowerCase());
      }
      setCharacters(newCharactersList);
    }
  }, [wordToPlay]);

  const getPreviousInput = () => {
    return (
      <Grid item sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {characters &&
          characters.map((char, index) => (
            <Tile
              key={`${index}-${char}-prev`}
              letter={playerInput.value.charAt(index) ?? ""}
              isCorrect={false}
              isIncludeNotCorrect={false}
              alreadySpinned={false}
              handleAlreadySpinned={() => {}}
            />
          ))}
      </Grid>
    );
  };

  function handlePlayerInput(input: string) {
    setPlayerInput((prev) => {
      const regex = /^(?:[A-Za-z\s]*)$/;
      if (!regex.test(input)) return prev;
      if (input.length > characters.length) return prev;
      return { value: input, index: prev.index };
    });
  }

  function handleCompareInput() {
    const temporalRow: ICharacter[] = characters.map((char, index) => {
      // 1. Compare characters
      const playerInputChar = playerInput.value.charAt(index);
      return {
        value: playerInputChar,
        isCorrect: playerInputChar === char,
        isIncludeNotCorrect: characters.includes(playerInputChar),
        alreadySpinned: false,
      };
    });
    const newRow: ITry = temporalRow;
    // 2. Add to rowsOfTries array
    setRowsOfTries((prev) => {
      let tempRowsOfTries: ITry[] = [...prev];
      // let tempRowsOfTries = [...prev];
      tempRowsOfTries = [
        ...tempRowsOfTries.slice(0, playerInput.index),
        newRow,
        ...tempRowsOfTries.slice(playerInput.index, tempRowsOfTries.length - 1),
      ];
      return tempRowsOfTries;
    });
    setPlayerInput((prev) => {
      return { value: "", index: prev.index + 1 };
    });
  }

  function handleSpinner(i: number, j: number) {
    rowsOfTries[i][j].alreadySpinned = true;
  }

  function getSuggestion() {
    return (
      <Grid
        item
        sx={{
          background: "rgba(0,0,0,0.1)",
          borderRadius: "25px",
          width: "80%",
          textAlign: "center",
        }}
      >
        <h2>If you want to succeed, try to think in:</h2>
        <h3>{suggestion}</h3>
      </Grid>
    );
  }
  return (
    <Grid container direction={"column"} sx={{ alignItems: "center", gap: 5 }}>
      {suggestion && getSuggestion()}
      {rowsOfTries &&
        rowsOfTries.map((singleTry, i) => (
          <Fragment key={`${i}-${Math.random()}`}>
            {playerInput.index == i ? (
              getPreviousInput()
            ) : (
              <Grid
                key={`${i}`}
                item
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
              >
                {singleTry &&
                  singleTry.map((char, index) => (
                    <Tile
                      key={`${index}-${char.value}`}
                      letter={char.value}
                      isCorrect={char.isCorrect}
                      isIncludeNotCorrect={char.isIncludeNotCorrect}
                      alreadySpinned={char.alreadySpinned}
                      handleAlreadySpinned={() => handleSpinner(i, index)}
                    />
                  ))}
              </Grid>
            )}
          </Fragment>
        ))}

      <Grid
        container
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "center", gap: 5 }}
      >
        <Grid item>
          <TextField
            onChange={(e) => handlePlayerInput(e.target.value)}
            value={playerInput.value}
            label="Try to guess..."
            variant="filled"
          />
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleCompareInput()}
            variant="contained"
            disabled={characters.length > playerInput.value.length}
          >
            Go!
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
