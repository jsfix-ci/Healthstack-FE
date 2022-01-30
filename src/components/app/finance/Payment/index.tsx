import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useObjectState, UserContext } from "../../../../context/context";
import client from "../../../../feathers";
import { getFormStrings } from "../../Utils";
import PaymentDetails from "./PaymentDetail";
import Payments from "./PaymentList";
const AppPayments = () => {
  let BillServ = client.service("bills");
  let SubwalletServ = client.service("subwallet");
  const SubwalletTxServ = client.service("subwallettransactions");
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  let medication = resource.paymentsResource.selectedPayment
console.log(medication['participantInfo']);
  

  const [payments, setPayments] = useState([]);
  const [facility, setFacility] = useState([]);
  const [balance, setBalance] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [paymentmode, setPaymentMode] = useState("Cash");
  const [obj, setObj] = useState("");
  let sour: any[] = facility;
  const source = sour.map((data) => {
    console.log(data);
    return data.clientname;
  });
  console.log(source);

  const handleAccept = (data) => {
    // getFacilities();
    const values = getFormStrings(data._id);
    if (data.paymentType === "") {
      toast("Kindly choose payment mode or enter amount");
      return;
    }
    let obj = {
      // client: medication.participantInfo.client._id,
      organization: user.employeeData[0].facilityDetail._id,
      category: "credit",
      amount: data.amount,

      toName: user.employeeData[0].facilityDetail.facilityName,
      // fromName:
      //   medication.participantInfo.client.firstname +
      //   " " +
      //   medication.participantInfo.client.lastname,
      createdby: user._id,

      facility: user.employeeData[0].facilityDetail._id,
      type: "Deposit",
    };
    //  let confirm = window.confirm(`Are you sure you want to accept N ${obj.amount} from ${obj.fromName}`)
    if (confirm) {
      SubwalletTxServ.create(obj)
        .then((resp) => {
          console.log(resp);

          toast("Deposit accepted succesfully");
        })
        .catch((err) => {
          toast("Error accepting deposit " + err);
          console.log(err);
        });
    }
  };

  const handleSearch = (val) => {
    BillServ.find({
      query: {
        "participantInfo.paymentmode.detail.principalName": {
          $regex: val,
          $options: "i",
        },
        $or: [
          {
            "participantInfo.paymentmode.type": "Cash",
          },
          {
            "participantInfo.paymentmode.type": "Family Cover",
          },
        ],
        "participantInfo.billingFacility":
          user.currentEmployee.facilityDetail._id,
        billing_status: {
          $ne: "Fully Paid",
        },
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res.groupedOrder);
        let findProductEntry = res.groupedOrder;
        setFacility(findProductEntry);
        toast(" ProductEntry  fetched successfully");
      })
      .catch((err) => {
        toast("Error fetching ProductEntry, probable network issues " + err);
      });
  };

  const getFacilities = () => {
    SubwalletTxServ.find({
      query: {
        // client: medication.participantInfo.client._id,
        organization: user.employeeData[0].facilityDetail._id,

        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    }).then((res) => console.log(res.data));
  };

  const getPayments = () => {
    BillServ.find({
      query: {
        $or: [
          {
            "participantInfo.paymentmode.type": "Cash",
          },
          {
            "participantInfo.paymentmode.type": "Family Cover",
          },
        ],
        "participantInfo.billingFacility": user.employeeData[0].facility,
        billing_status: {
          $ne: "Fully Paid",
        },
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        console.log(res.groupedOrder);
        let findProductEntry = res.groupedOrder;
        setFacility(findProductEntry);
        toast(" ProductEntry  fetched successfully");
      })
      .catch((err) => {
        toast("Error fetching ProductEntry, probable network issues " + err);
      });
  };

  useEffect(() => {
    if (!BillServ) {
      BillServ = client.service("bills");
      BillServ.on("created", (_) => getPayments());
      BillServ.on("updated", (_) => getPayments());
      BillServ.on("patched", (_) => getPayments());
      BillServ.on("removed", (_) => getPayments());
    }
    user && getPayments();
    return () => {
      BillServ = null;
    };
  }, [user]);

  return (
    <>
      {resource.paymentsResource.show === "lists" && (
        <Payments
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: "create",
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                show: "details",
                selectedPayment: row,
              },
            }));
          }}
          dataTree={facility}
          handleSearch={handleSearch}
        />
      )}

      {resource.paymentsResource.show === "details" && (
        <PaymentDetails
          row={resource.paymentsResource.selectedPayment}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: "lists",
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: "edit",
              },
            }))
          }
          handleAccept={handleAccept}
        />
      )}
    </>
  );
};

export default AppPayments;
