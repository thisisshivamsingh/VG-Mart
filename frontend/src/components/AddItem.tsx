import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { vegetables } from "@/types/typeGroup";
import { addItem, EditItemById, getItemById } from "@/services/utility";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/AuthContext";
import NotFound from "./NotFound";

//  price, unitPerPrice, quantity
const schema = yup
  .object({
    name: yup.string().required(),
    unit: yup.string().required(),
    price: yup.number().positive().integer().required(),
    unitPerPrice: yup.number().positive().integer().required(),
    quantity: yup.number().positive().integer().required(),
  })
  .required();

function AddItem() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // context
  const { isAdmin } = useContext(UserContext);

  // edit

  const [itemData, setItemDataById] = useState<vegetables>();
  const [type, setType] = useState<string>();

  const { itemId } = router.query;

  const getData = async () => {
    const res = await getItemById(`/vegetables/${itemId}`);
    setItemDataById(res);
  };

  useEffect(() => {
    itemId && getData();
    itemId ? setType("Edit") : setType("Add");
  }, [itemId]);
  useEffect(() => {
    if (itemData) {
      setValue("name", itemData.name);
      setValue("unit", itemData.unit);
      setValue("quantity", itemData.quantity);
      setValue("price", itemData.price);
      setValue("unitPerPrice", itemData.unitPerPrice);
    }
  }, [itemData]);

  const onSubmit = (data: vegetables) => {
    type == "Edit"
      ? EditItemById(`/vegetables/${itemId}`, data)
      : addItem(data);
  };
  return (
    <div>
      {isAdmin ? (
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Form.Group className="mb-3" as={Col} sm={6}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    {...register("name")}
                    defaultValue={""}
                    type="Text"
                    placeholder=""
                  />
                  <div className="invalid-feedback d-block">
                    {errors.name?.message}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} sm={6}>
                  <Form.Label>Unit</Form.Label>
                  <Form.Select {...register("unit")} defaultValue={"kg"}>
                    <option value="kg">Kg</option>
                    <option value="dozen">Dozen</option>
                  </Form.Select>
                  <div className="invalid-feedback d-block">
                    {errors.unit?.message}
                  </div>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" as={Col} sm={6}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    {...register("quantity")}
                    type="Text"
                    defaultValue="1"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.quantity?.message}
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} sm={6}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    {...register("price")}
                    type="Text"
                    defaultValue="10"
                  />
                  <div className="invalid-feedback d-block">
                    {errors.price?.message}
                  </div>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Unit Per Price</Form.Label>
                <Form.Control
                  {...register("unitPerPrice")}
                  type="Text"
                  defaultValue="1"
                />
                <div className="invalid-feedback d-block">
                  {errors.unitPerPrice?.message}
                </div>
              </Form.Group>

              <Button variant="success" type="submit">
                {type === "Edit" ? "Edit Item" : " Add Item"}
              </Button>
              <Link href="/">
                {" "}
                <Button
                  variant="danger"
                  onClick={() => router.back()}
                  className="mx-5"
                >
                  Back
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      ) : (
        <NotFound Message="Page Not Found" />
      )}
    </div>
  );
}

export default AddItem;
