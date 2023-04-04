import { Text } from "@chakra-ui/react";

const StartLine = ({ start }: { start: string }) => {
  return (
    <Text
      textAlign={"center"}
      sx={{
        position: "relative",
        "&::before": {
          content: "''",
          display: "block",
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "1px",
          background: "currentColor",
          
        },
        "&::after": {
          content: "''",
          display: "block",
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "1px",
          background: "currentColor",
        },
      }}
    >
      <span
        style={{
          position: "relative",
          zIndex: 1,
          background: "#111111",
          padding: "8px",
        }}
      >
        {start}
      </span>
    </Text>
  );
};

export default StartLine;
