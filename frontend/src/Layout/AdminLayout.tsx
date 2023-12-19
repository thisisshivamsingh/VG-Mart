import Navigation from "@/components/Navigation";
import React, { ReactElement } from "react";
import { Container } from "react-bootstrap";

function AdminLayout({ children }: { children: ReactElement }) {
  return (
    <div>
      <Navigation />
      <div className="py-5">
        <Container>{children}</Container>
      </div>
    </div>
  );
}

export default AdminLayout;
