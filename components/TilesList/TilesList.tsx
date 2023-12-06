import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Tile } from "../Tile/Tile";

interface Props {
  userInput: string;
  numberOfTries: number;
}

type ITry = ICharacter[];

interface ICharacter {
  value: string;
  isCorrect: boolean;
  isIncludeNotCorrect: boolean;
}

const emptyCharacter: ICharacter = {
  value: "",
  isCorrect: false,
  isIncludeNotCorrect: false,
};

export const TilesList: React.FC<Props> = ({ userInput, numberOfTries }) => {
  const [playerInput, setPlayerInput] = useState<string>("");
  const [characters, setCharacters] = useState<string[]>([]);
  const [tries, setTries] = useState<ITry[]>([]);
  useEffect(() => {
    if (numberOfTries && characters) {
      const initialTries: ITry[] = [];
      for (let i = 0; i < numberOfTries; i++) {
        const newRow: ITry = [];
        characters.forEach((char) => {
          newRow.push(emptyCharacter);
        });
        initialTries.push(newRow);
      }
      setTries(initialTries);
    }
  }, [numberOfTries, characters]);

  useEffect(() => {
    if (userInput) {
      let newCharactersList: string[] = [];
      for (let i = 0; i <= userInput.length - 1; i++) {
        newCharactersList.push(userInput.charAt(i));
      }
      setCharacters(newCharactersList);
    }
  }, [userInput]);
  return (
    <Grid container direction={"column"} sx={{ alignItems: "center", gap: 5 }}>
      {tries &&
        tries.map((singleTry) => (
          <Grid item sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            {singleTry &&
              singleTry.map((char, index) => (
                <Tile
                  key={`${index}-${char.value}`}
                  letter={char.value}
                  isCorrect={char.isCorrect}
                  isIncludeNotCorrect={char.isIncludeNotCorrect}
                />
              ))}
          </Grid>
        ))}
      <Grid
        container
        direction={"row"}
        sx={{ justifyContent: "center", alignItems: "center", gap: 5 }}
      >
        <Grid item>
          <TextField
            onChange={(e) => setPlayerInput(e.target.value)}
            value={playerInput}
            label="Try to guess..."
            variant="filled"
          />
        </Grid>
        <Grid item>
          <Button onClick={() => setPlayerInput("")} variant="contained">
            Go!
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
