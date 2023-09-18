import { useCreateUserAddress, useUpdateUserAddress } from "@saleor/sdk";
import { Formik } from "formik";
import React from "react";
import ReactSVG from "react-svg";
import * as Yup from "yup";

import TextField from "@components/atoms/FormComponents/TextField";
import ButtonIcon from "@components/molecules/ButtonIcon";
import { countryCode } from "@temp/constants";
import { Structure } from "@temp/views/Checkout/components/CheckoutForm/structure";

// import ButtonIcon from "../ButtonIcon";
// import InputLogin from "./components/InputLogin";
import * as S from "./styles";

import x from "images/x.svg";

const structure = Structure({ value: "delivery" });

const validateSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  streetAddress: Yup.string().required("Required"),
  // apartment: Yup.string().required("Required"),
  postalCode: Yup.string()
    .required("Required")
    .test(
      "postalCode",
      "Sorry, we do not deliver to this area. Try another postcode or place a pickup delivery instead.",
      value => {
        let result = false;
        if (value !== undefined && value.length < 8) {
          if (
            !isNaN(Number(value.slice(0, 4))) &&
            isNaN(Number(value.slice(6, 7))) &&
            !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
              value.slice(4, 7).trim()
            )
          ) {
            result = true;
          }
        }
        return result;
      }
    ),
  city: Yup.string().required("Required"),
  // phoneNumber: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(/^[0-9]*$/, "Invalid phone number"),
  // companyName: Yup.string().required("Required"),
});

function EditAddressDialog({ hide, title, initialValues }: any) {
  const [, setLoading] = React.useState(false);

  const [
    setCreatUserAddress,
    { data: createData, error: addressCreateErrors },
  ] = useCreateUserAddress();

  const [
    setUpdateUserAddress,
    { data: updateData, error: addressUpdateErrors },
  ] = useUpdateUserAddress();

  React.useEffect(() => {
    if (
      (createData && !addressCreateErrors) ||
      (updateData && !addressUpdateErrors)
    ) {
      hide();
    }
  }, [createData, updateData, addressCreateErrors, addressUpdateErrors]);

  const handleLogin = async (values: any) => {
    setLoading(true);
    // do
    const dataSubmit: any = {
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      postalCode: values.postalCode,
      phone: values.phoneNumber,
      city: values.city,
      apartment: values.apartment,
      country: countryCode,
      email: values.email,
      streetAddress1: values.streetAddress,
      streetAddress2: values.streetAddress,
    };
    if (initialValues?.id) {
      setUpdateUserAddress({ id: initialValues.id, input: { ...dataSubmit } });
    } else {
      setCreatUserAddress({ input: { ...dataSubmit } });
    }
    setLoading(false);
  };

  return (
    <S.Wrapper>
      <S.Head>
        <S.Title>{title}</S.Title>
        <S.IconBox onClick={() => hide()}>
          <ReactSVG path={x} />
        </S.IconBox>
      </S.Head>
      <S.ContentWrap>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ values, handleSubmit, handleChange, ...formikProps }) => (
            <>
              <S.Form
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {Object.keys(structure).map((item: any, index: number) => {
                  if (item === "postalCode") {
                    return (
                      <S.Item key={index} className="responsive">
                        <TextField
                          {...structure[item]}
                          name={item}
                          {...formikProps}
                          value={values[item]}
                          type="string"
                          onChange={handleChange}
                        />
                      </S.Item>
                    );
                  }
                  if (item === "email") {
                    return (
                      <S.Item key={index} className="responsive">
                        <TextField
                          {...structure[item]}
                          name={item}
                          {...formikProps}
                          value={values[item]}
                          type="email"
                          onChange={handleChange}
                        />
                      </S.Item>
                    );
                  }

                  if (item === "phoneNumber") {
                    return (
                      <S.Item key={index} className="responsive">
                        <TextField
                          {...structure[item]}
                          name={item}
                          {...formikProps}
                          value={values[item]}
                          type="tel"
                          onChange={handleChange}
                        />
                      </S.Item>
                    );
                  }
                  return (
                    <S.Item key={index} className="responsive">
                      <TextField
                        {...structure[item]}
                        name={item}
                        {...formikProps}
                        value={values[item]}
                        onChange={handleChange}
                      />
                    </S.Item>
                  );
                })}
              </S.Form>

              <ButtonIcon
                onClick={handleSubmit}
                bgColor="#FF6347"
                text="Save address"
              />
            </>
          )}
        </Formik>
      </S.ContentWrap>
    </S.Wrapper>
  );
}

export default EditAddressDialog;
