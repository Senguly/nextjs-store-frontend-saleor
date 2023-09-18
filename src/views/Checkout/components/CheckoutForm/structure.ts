export const Structure = (typeDelivery?: any) => {
  if (typeDelivery.value === "delivery") {
    return {
      firstName: {
        title: "First name",
      },
      lastName: {
        title: "Last name",
      },
      streetAddress: {
        title: "Street address",
      },
      apartment: {
        title: "Apartment, unit, building, floor (optional)",
      },
      postalCode: {
        title: "Postcode",
      },
      city: {
        title: "City",
      },
      email: {
        title: "Email",
      },
      phoneNumber: {
        title: "Phone number",
      },
      companyName: {
        title: "Company name (optional)",
      },
    };
  }
  return {
    firstName: {
      title: "First name",
    },
    lastName: {
      title: "Last name",
    },
    email: {
      title: "Email",
    },
    phoneNumber: {
      title: "Phone number",
    },
    companyName: {
      title: "Company name (optional)",
    },
  };
};

export const initial = {
  firstName: "",
  lastName: "",
  streetAddress: "",
  apartment: "",
  postalCode: "",
  city: "",
  email: "",
  phoneNumber: "",
  companyName: "",
};
