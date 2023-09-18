import { useDefaultUserAddress, useDeleteUserAddresss } from "@saleor/sdk";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import {
  AccountErrorCode,
  AddressTypeEnum,
} from "@saleor/sdk/lib/gqlTypes/globalTypes";
import { getUserDetailsQuery } from "@saleor/sdk/lib/queries/user";
import React from "react";
// import { useIntl } from "react-intl";
import Media from "react-media";
import Modal from "react-modal";

import { AddressGrid } from "@components/organisms";

// import { ShopContext } from "../../components/ShopProvider/context";
import EditAddressDialog from "../EditAddressDialog";

import "./scss/index.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    padding: 0,
    border: "none",
    maxHeight: "900px",
  },
  overlay: {
    background: "#00000070",
    zIndex: 99,
  },
};
const customMobileStyles = {
  content: {
    top: "auto",
    left: "0",
    right: "auto",
    bottom: "0",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    background: "transparent",
    padding: 0,
    border: "none",
    maxHeight: "100vh",
    width: "100%",
  },
  overlay: {
    background: "#00000070",
    zIndex: 99,
  },
};

const fomarDataAddress = (address: any) => {
  return {
    id: address.id,
    firstName: address.firstName,
    lastName: address.lastName,
    companyName: address.companyName,
    postalCode: address.postalCode,
    phoneNumber: address.phone,
    city: address.city,
    apartment: address.apartment,
    streetAddress: address.streetAddress1,
  };
};

const AddressBook: React.FC<{
  user: User;
}> = ({ user }) => {
  // const { defaultCountry, countries } = React.useContext(ShopContext);
  // const [displayNewModal, setDisplayNewModal] = React.useState(false);
  const [displayEditModal, setDisplayEditModal] = React.useState(false);
  const [addressData, setAddressData] = React.useState(null);
  const [setDefaultUserAddress] = useDefaultUserAddress(undefined, {
    refetchQueries: result => {
      if (result.data.accountSetDefaultAddress.errors.length > 0) {
        if (
          result.data.accountSetDefaultAddress.errors.find(
            err => err.code === AccountErrorCode.NOT_FOUND
          )
        ) {
          return [
            {
              query: getUserDetailsQuery,
            },
          ];
        }
      }
    },
  });

  const [setDeleteUserAddress] = useDeleteUserAddresss(undefined, {
    refetchQueries: result => {
      if (result.data.accountAddressDelete.errors.length > 0) {
        if (
          result.data.accountAddressDelete.errors.find(
            err => err.code === AccountErrorCode.NOT_FOUND
          )
        ) {
          return [
            {
              query: getUserDetailsQuery,
            },
          ];
        }
      }
    },
  });

  const userAddresses = user.addresses.map(address => {
    const addressToDisplay: any = { address: { ...address } };

    addressToDisplay.onEdit = () => {
      setDisplayEditModal(true);
      setAddressData({
        address,
        id: address.id,
      });
    };

    addressToDisplay.onRemove = () =>
      setDeleteUserAddress({
        addressId: address.id,
      });

    addressToDisplay.setDefault = (type: string) => {
      setDefaultUserAddress({
        id: address.id,
        type:
          type === "BILLING"
            ? AddressTypeEnum.BILLING
            : AddressTypeEnum.SHIPPING,
      });
    };
    return addressToDisplay;
  });

  const onRequestClose = () => {
    setDisplayEditModal(false);
  };

  // const intl = useIntl();

  return (
    <Media
      query={{
        maxWidth: 717,
      }}
    >
      {(matches: boolean) => {
        const style = matches ? customMobileStyles : customStyles;
        return (
          <div className="address-book-container">
            {/* <AddNewAddress title="Add new address" onClick={() => {}} /> */}
            <AddressGrid
              addresses={userAddresses}
              addNewAddress={() => {
                setAddressData(null);
                setDisplayEditModal(true);
              }}
            />
            {displayEditModal && (
              <Modal
                isOpen={displayEditModal}
                onRequestClose={onRequestClose}
                style={style}
              >
                <EditAddressDialog
                  title={addressData ? "Edit address" : "Add new address"}
                  hide={onRequestClose}
                  initialValues={
                    addressData
                      ? {
                          ...fomarDataAddress(addressData?.address),
                          email: user.email,
                        }
                      : null
                  }
                />
              </Modal>
            )}
            {/* {displayNewModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayNewModal(false);
          }}
          userId={user.id}
          {...{ defaultValue: defaultCountry || {} }}
          submitBtnText={intl.formatMessage(commonMessages.add)}
          title={intl.formatMessage(checkoutMessages.addNewAddress)}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )}
      {displayEditModal && (
        <AddressFormModal
          hideModal={() => {
            setDisplayEditModal(false);
          }}
          address={addressData}
          submitBtnText={intl.formatMessage(commonMessages.save)}
          title={intl.formatMessage({ defaultMessage: "Edit address" })}
          {...{ countriesOptions: countries }}
          formId="address-form"
        />
      )} */}
          </div>
        );
      }}
    </Media>
  );
};

export default AddressBook;
