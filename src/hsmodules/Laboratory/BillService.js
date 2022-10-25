/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {format, formatDistanceToNowStrict} from "date-fns";
import PaymentCreate from "./PaymentCreate";
import PatientProfile from "../Client/PatientProfile";
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

import {BillingList} from "./Payment";
import BillServiceCreate from "./BillServiceCreate";

export default function BillService() {
  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-5 ">
          <BillsList />
        </div>

        <div className="column is-7 ">
          <BillServiceCreate />
        </div>
        {/*  <div className="column is-3 ">
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
      </div>
    </section>
  );
}

export function BillsList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const BillServ = client.service("bills");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  const [selectedOrders, setSelectedOrders] = useState([]);
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedFinance, setSelectedFinance] = useState("");
  const [expanded, setExpanded] = useState("");
  const [oldClient, setOldClient] = useState("");

  const handleSelectedClient = async Client => {
    // await setSelectedClient(Client)
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handleChoseClient = async (client, e, order) => {
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      //alert("New Client Onboard")
      //remove all checked clientsly
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
    }

    // console.log(e.target.checked)
    order.checked = e.target.checked;
    await handleSelectedClient(order.participantInfo.client);
    //handleMedicationRow(order)
    await setSelectedFinance(order);
    const newProductEntryModule = {
      selectedFinance: order,
      show: "detail",
      state: e.target.checked,
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));

    //set of checked items
    if (e.target.checked) {
      await setSelectedOrders(prevstate => prevstate.concat(order));
    } else {
      setSelectedOrders(prevstate =>
        prevstate.filter(el => el._id !== order._id)
      );
    }

    // console.log(selectedOrders)
  };
  const handleMedicationRow = async (ProductEntry, e) => {
    //handle selected single order
    //console.log("b4",state)
    // alert("Header touched")
    //console.log("handlerow",ProductEntry)
    /* alert(ProductEntry.checked)*/
    /*  ProductEntry.checked=!ProductEntry.checked */
    /*  await setSelectedFinance(ProductEntry)
     
         const    newProductEntryModule={
             selectedFinance:ProductEntry,
             show :'detail'
 
         }
       await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule})) */
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedDispense: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "name";
    //console.log(val)
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
        billing_status: "Unpaid", // need to set this finally
        //order_category:"Prescription",
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 30,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        // console.log(res)
        setFacilities(res.groupedOrder);
        setMessage(" ProductEntry  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        // console.log(err)
        setMessage(
          "Error fetching ProductEntry, probable network issues " + err
        );
        setError(true);
      });
  };
  const getFacilities = async () => {
    // console.log("here b4 server")
    const findProductEntry = await BillServ.find({
      query: {
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
        billing_status: "Unpaid", // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    //  console.log("updatedorder", findProductEntry.groupedOrder)
    await setFacilities(findProductEntry.groupedOrder);
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };
  const handleRow = async (Client, e) => {
    // alert(expanded)
  };
  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
    BillServ.on("created", obj => getFacilities());
    BillServ.on("updated", obj => getFacilities());
    BillServ.on("patched", obj => getFacilities());
    BillServ.on("removed", obj => getFacilities());

    const newClient = {
      selectedClient: "",
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClient}));

    return () => {};
  }, []);

  useEffect(() => {
    //changes with checked box
    // console.log(selectedOrders)

    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === "create") {
      selectedOrders.forEach(el => (el.checked = ""));
      setSelectedOrders([]);
    }
    return () => {};
  }, [state.financeModule.show]);

  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <p className="control has-icons-left  ">
                <DebounceInput
                  className="input is-small "
                  type="text"
                  placeholder="Search Medications"
                  minLength={3}
                  debounceTimeout={400}
                  onChange={e => handleSearch(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="level-item">
          {" "}
          <span className="is-size-6 has-text-weight-medium">
            Unpaid Bills{" "}
          </span>
        </div>
        <div className="level-right">
          <div className="level-item">
            <div className="level-item">
              <div
                className="button is-success is-small"
                onClick={handleCreateNew}
              >
                New
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" pullup ">
        <div className=" is-fullwidth vscrollable pr-1">
          <div>
            {facilities.map((Clinic, i) => (
              <div key={Clinic.client_id}>
                <div>
                  <div>
                    {/* <input type = "checkbox" name={Clinic.client_id}  />   */}
                    <strong>
                      {" "}
                      {i + 1} {Clinic.clientname}{" "}
                      {/* with {Clinic.bills.length} Unpaid bills. */}{" "}
                      {/* Grand Total amount: N */}
                    </strong>
                  </div>
                </div>
                <div>
                  <div className=" is-fullwidth vscrollable pr-1">
                    <div>
                      {Clinic.bills.map((category, i) => (
                        <div key={i}>
                          <div>
                            <div>
                              {/* <input type = "checkbox" name={Clinic.client_id} onChange={(e)=>handleMedicationRow(Clinic,e)} /> */}
                              {category.catName} with {category.order.length}{" "}
                              Unpaid bills. {/* Total amount: N */}
                            </div>
                          </div>
                          <div>
                            <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                              <thead>
                                <tr>
                                  <th>
                                    <abbr title="Serial No">S/No</abbr>
                                  </th>
                                  <th>
                                    <abbr title="Date">Date</abbr>
                                  </th>
                                  <th>
                                    <abbr title="Description">Description</abbr>
                                  </th>
                                  {/*  <th>Fulfilled</th> */}
                                  <th>
                                    <abbr title="Status">Status</abbr>
                                  </th>
                                  <th>
                                    <abbr title="Amount">Amount</abbr>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {category.order.map((order, i) => (
                                  <tr
                                    key={order._id}
                                    /*  onClick={()=>handleMedicationRow(order)} */ className={
                                      order._id ===
                                      (selectedFinance?._id || null)
                                        ? "is-selected"
                                        : ""
                                    }
                                  >
                                    <th>
                                      <input
                                        type="checkbox"
                                        name={order._id}
                                        onChange={e =>
                                          handleChoseClient(Clinic, e, order)
                                        }
                                        checked={order.checked}
                                      />{" "}
                                      {i + 1}
                                    </th>
                                    <td>
                                      <span>
                                        {format(
                                          new Date(order.createdAt),
                                          "dd-MM-yy"
                                        )}
                                      </span>
                                    </td>{" "}
                                    {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                                    <th>{order.serviceInfo.name}</th>
                                    {/*  <td>{order.fulfilled==="True"?"Yes":"No"}</td> */}
                                    <td>{order.billing_status}</td>
                                    <td>{order.serviceInfo.amount}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}