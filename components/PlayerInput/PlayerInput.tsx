import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";

const textColor = "#002590";

interface Props {
  value: string;
  onChange: (event: any) => void;
  onClick: () => void;
}

export const PlayerInput: React.FC<Props> = ({ value, onChange, onClick }) => {
  function hanldleOnChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    onChange(event.target.value);
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
        label="To play"
        variant="standard"
        sx={{ width: "100%" }}
        value={value}
        onChange={hanldleOnChange}
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
