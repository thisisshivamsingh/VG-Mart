import Navigation from "@/components/Navigation";
import AuthContext from "@/context/AuthContext";
import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";

function Layout({ children }: { children: ReactElement }) {
  return (
    <AuthContext>
      <Navigation />
      <div className="py-5">
        <Container>{children}</Container>
      </div>
    </AuthContext>
  );
}

export default Layout;
