import React from "react";
import { Container } from "@components";
import { Landing } from "./landing";

export const Main: React.FC = () => {
  return (
    <div className="bg-sky-50">
      <Container>
        <Landing />
      </Container>
    </div>
  );
};
