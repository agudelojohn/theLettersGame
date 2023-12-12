import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";

const textColor = "#002590";

interface Props {
  value: string;
  suggestion?: string;
  onChangeValue: (event: any) => void;
  onChangeSuggestion?: (event: any) => void;
  onClick: () => void;
}

export const PlayerInput: React.FC<Props> = ({
  value,
  suggestion,
  onChangeValue,
  onChangeSuggestion,
  onClick,
}) => {
  function hanldleOnChangeValue(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    onChangeValue(event.target.value);
  }
  function hanldleOnChangeSuggestion(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (onChangeSuggestion) onChangeSuggestion(event.target.value);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLIFrameElement>) {
    if (event.key === "Enter") onClick();
  }

  return (
    <Card
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,0.6)",
        borderRadius: 8,
        gap: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{ border: `2px solid ${textColor}`, color: textColor, padding: 3 }}
      >
        Let's play with some word
      </Typography>
      <TextField
        id="standard-basic"
        label="Word to play"
        variant="standard"
        sx={{ width: "100%" }}
        value={value}
        onChange={hanldleOnChangeValue}
        autoComplete="off"
        onKeyDown={handleKeyPress}
      />
      <TextField
        id="standard-basic"
        label="Want to add some suggestion or help?"
        variant="standard"
        sx={{ width: "100%" }}
        value={suggestion}
        onChange={hanldleOnChangeSuggestion}
        autoComplete="off"
        onKeyDown={handleKeyPress}
      />
      <Button
        variant="outlined"
        onClick={onClick}
        sx={{ border: `2px solid ${textColor}`, color: textColor }}
      >
        Continue
      </Button>
    </Card>
  );
};
