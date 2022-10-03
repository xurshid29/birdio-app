import React from "react";
import {
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { gql, useMutation } from "@apollo/client";
import { LoginInput, LoginResult } from "../../types";
import { showNotification } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

const LOGIN_REQUEST = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      access_token
    }
  }
`;

const Auth: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToken] = useLocalStorage<string | undefined>({
    key: "AUTH_TOKEN",
  });
  const [loginUser, { loading }] = useMutation<
    { login: LoginResult },
    { input: LoginInput }
  >(LOGIN_REQUEST);

  const form = useForm<LoginInput>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <>
      <Title
        align="center"
        sx={() => ({
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            await loginUser({
              variables: {
                input: values,
              },
              onError(error) {
                showNotification({
                  title: "Login failed",
                  message: error.message,
                  color: "red",
                });
              },
              onCompleted({ login: { access_token: accessToken } }) {
                setToken(accessToken);
              },
            });
          })}
        >
          <TextInput
            label="Email"
            placeholder="Email"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Auth;
