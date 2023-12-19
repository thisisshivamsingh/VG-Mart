import { UserContext } from "@/context/AuthContext";
import { DeleteItemById } from "@/services/utility";
import { vegetables } from "@/types/typeGroup";
import Link from "next/link";

import React, { useContext } from "react";
import { Button, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

export function BasicCard({ data }: { data: vegetables }) {
  const { isAdmin } = useContext(UserContext);

  const deleteItem = async () => {
    await DeleteItemById(`/vegetables/${data._id}`);
  };
  return (
    <Card>
      {data._id}
      <Card.Body>
        <Card.Title className="text-success">{data.name} </Card.Title>

        <Card.Text className="d-flex justify-content-between">
          <b>Price :</b> {data.price} / {data.unit}
        </Card.Text>
        <Card.Text className="d-flex justify-content-between">
          <b>Unit Per Price :</b> {data.unitPerPrice}
        </Card.Text>

        <Card.Text className="d-flex justify-content-between">
          <b>Quantity :</b> {data.quantity}
        </Card.Text>
        {isAdmin && (
          <>
            <Link href={`edit-item/${data._id}`}>
              <Button variant="success" className="me-2">
                Edit{" "}
              </Button>
            </Link>
            <Button variant="danger" className="ms-2" onClick={deleteItem}>
              Delete{" "}
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

function Item({ item }: { item: vegetables }) {
  return (
    <Col sm={6} md={4} lg={3} className="py-3">
      <BasicCard data={item} />
    </Col>
  );
}

export default Item;
