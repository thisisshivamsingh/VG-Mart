import React, { useContext } from "react";
import { UserContext } from "@/context/AuthContext";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
type Props = {};
type Inputs = {
  user: string;
};
function Login({}: Props) {
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export function LoginForm() {
  const { changeUser } = useContext(UserContext);
  const router = useRouter();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    changeUser(data.user);

    router.push("item-list");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Select Your Role</Form.Label>
        <Form.Select defaultValue="user" {...register("user")}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Form.Select>
      </Form.Group>

      <Button variant="success" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default Login;
