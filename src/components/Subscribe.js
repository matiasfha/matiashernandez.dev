import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Message from "components/confirm-message/message";
import { PleaseConfirmIllustration } from "components/confirm-message/illustrations";

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  first_name: Yup.string(),
});

function PostSubmissionMessage() {
  return (
    <div
      css={css`
        h2 {
          color: white !important;
        }
      `}
    >
      <Message
        illustration={PleaseConfirmIllustration}
        title="Great, one last thing..."
        body="I just sent you an email with the confirmation link. 
          **Please check your inbox!**"
      />
    </div>
  );
}

const SubscribeFormWrapper = styled.div`
  color: white;
  maxwidth: 350px;
  padding: 40px 40px 40px 20px;
  background: white;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: rgb(23, 169, 116);
  color: rgb(255, 255, 255);
  cursor: pointer;
  border-radius: 4px;
  padding: 8px 15px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(23, 169, 116);
  border-image: initial;
  transition: all 100ms ease 0s;
`;

const formCss = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    margin: 10px 0;
  }
  .field-error {
    display: block;
    color: rgba(255, 255, 255, 0.75);
    font-size: 80%;
  }
  input,
  label {
    width: 100%;
    font-size: 16px;
  }
  button {
    margin-top: 20px;
    font-size: 16px;
  }
`;
const StyledFormikForm = styled(Form)`
  ${formCss}
`;

function fetchReducer(state, { type, response, error }) {
  switch (type) {
    case "fetching": {
      return { error: null, response: null, pending: true };
    }
    case "success": {
      return { error: null, response, pending: false };
    }
    case "error": {
      return { error, response: null, pending: false };
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

function useFetch({ url, body }) {
  const [state, dispatch] = React.useReducer(fetchReducer, {
    error: null,
    response: null,
    pending: false,
  });
  const bodyString = JSON.stringify(body);

  React.useEffect(() => {
    if (url && bodyString) {
      dispatch({ type: "fetching" });
      fetch(url, {
        method: "post",
        body: bodyString,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then(
          (response) => dispatch({ type: "success", response }),
          (error) => dispatch({ type: "error", error })
        );
    }
  }, [url, bodyString]);

  return state;
}

function Subscribe({ style, tags = [], header = "Join the Newsletter" }) {
  const [values, setValues] = React.useState();
  const { pending, response, error } = useFetch({
    url: `https://app.convertkit.com/forms/827139/subscriptions`,
    body: values,
  });

  const errorMessage = error ? "Something went wrong!" : null;
  const submitted = Boolean(response);

  const successful = response && response.status === "success";

  return (
    <SubscribeFormWrapper style={style}>
      {!successful && (
        <h3
          css={css`
            margin-bottom: 1rem;
            margin-top: 0;
            color: #0443ac;
            font-family: Lato Bold, sans-serif;
          `}
        >
          Unete a la comunidad
        </h3>
      )}

      {!successful && (
        <Formik
          initialValues={{
            email_address: "",
            first_name: "",
            tags,
          }}
          validationSchema={SubscribeSchema}
          onSubmit={setValues}
        >
          {() => (
            <StyledFormikForm>
              <label htmlFor="first_name">
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                  `}
                >
                  First Name
                  <ErrorMessage
                    name="first_name"
                    component="span"
                    className="field-error"
                  />
                </div>
              </label>
              <Field
                id="first_name"
                aria-required="false"
                name="first_name"
                placeholder="Jane"
                type="text"
              />
              <label htmlFor="email">
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                  `}
                >
                  Email
                  <ErrorMessage
                    name="email_address"
                    component="span"
                    className="field-error"
                  />
                </div>
              </label>
              <Field
                id="email"
                aria-required="true"
                name="email_address"
                placeholder="jane@acme.com"
                type="email"
              />
              <Button data-element="submit" type="submit">
                {!pending && "Unete"}
                {pending && "Enviano..."}
              </Button>
            </StyledFormikForm>
          )}
        </Formik>
      )}
      {submitted && !pending && <PostSubmissionMessage response={response} />}
      {errorMessage && <div>{errorMessage}</div>}
    </SubscribeFormWrapper>
  );
}

export default Subscribe;
