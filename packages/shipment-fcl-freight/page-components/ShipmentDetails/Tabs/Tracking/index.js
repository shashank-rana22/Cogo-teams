import React, { useState } from 'react';
import Header from "./Header";
import Body from "./Body";
import useGetSaasContainerSubscription from '../Tracking/hooks/useGetSaasContainerSubscription';
import styles from "./styles.module.css";

function Tracking({ shipment_data = {} }) {
  const shipmentType = shipment_data?.shipment_type || 'fcl_freight';
  const [containerNo, setContainerNo] = useState("");

  const { loading, data: list } = useGetSaasContainerSubscription({
    shipmentId: '3534d9b2-7a8c-47a0-a3d1-93cfb7bf9f69' || shipment_data?.id,
    endPoint: shipmentType === "fcl_freight" ? "container" : "air",
  });

  const ContainerOptions = Array.isArray(list)
    ? (list || [])
        .filter((e) => e?.type === "CONTAINER_NO")
        ?.map((e) => {
          return { label: e?.input, value: e?.input };
        })
    : [];

  const trackingData = Array.isArray(list)
    ? (list || []).filter(
        (e) => e?.input === (containerNo || ContainerOptions?.[0]?.value)
      )
    : [];

  const dataToRender = shipmentType === "fcl_freight" ? trackingData : list;

  return (
    <div className={styles.container}>
      <Header
        ContainerOptions={ContainerOptions}
        setContainerNo={setContainerNo}
        containerNo={containerNo || ContainerOptions?.[0]?.value}
        shipmentId={shipment_data?.id}
        airwayBillNo={list?.airway_bill_no}
      />
      <Body list={dataToRender} loading={loading} shipmentType={shipmentType}/>
    </div>
  );
}

export default Tracking;
