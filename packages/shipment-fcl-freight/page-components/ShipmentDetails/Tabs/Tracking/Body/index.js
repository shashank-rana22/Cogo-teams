import React, { useState, useEffect } from 'react';
import useOceanRoute from '../hooks/useOceanRoute';
import getAirPoints from '../helper/getAirPoints';
import TrackingData from "./TrackingData";
import TrackingMap from "./TrackingMap";
import LoadingState from './LoadingState';
import styles from "./styles.module.css";

const airData = {
  airway_bill_no: "098-97087126",
  airway_bill_details: {
    piece: "",
    origin: "Singapore Changi Airport - SGSIN",
    weight: "",
    airline_id: "e942211b-f46f-4a07-9756-626377218d1d",
    destination: "Indira Gandhi International Airport - INDEL",
    airline: {
      id: "e942211b-f46f-4a07-9756-626377218d1d",
      business_name: "Air India",
      logo_url:
        "https://airline-images-cogoport.s3.ap-south-1.amazonaws.com/Air_India_Logo+1.svg",
    },
  },
  milestone_details: {},
  commodity_details: null,
  action: {
    action: "Everything is per expected schedule",
    message: "Air Cargo is on track",
    severity: "LOW",
  },
  poc_details: [],
  air_flight_info: {},
  tracking_status: "Found",
  status: "active",
  id: "29b25736-5fc6-48b1-a08b-96ad82010f3a",
  data: [
    {
      id: "45abdd19-96fc-4543-bba4-a8d001dee3dc",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Singapore Changi Airport - SGSIN",
      flight_number: "AI381",
      plan_date: null,
      actual_date: "2023-03-01T08:47:00.000Z",
      status: "",
      piece: "72",
      weight: "Weight:48k",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "DEPARTED",
    },
    {
      id: "0adde2ed-49a3-427d-b0f9-f6aa10127b04",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Indira Gandhi International Airport - INDEL",
      flight_number: "AI381",
      plan_date: null,
      actual_date: "2023-03-01T17:26:00.000Z",
      status: "",
      piece: "72",
      weight: "Weight:48k",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "CHECKED IN",
    },
    {
      id: "36efb2eb-08b6-4458-89dd-3b8805812622",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Indira Gandhi International Airport - INDEL",
      flight_number: "AI381",
      plan_date: null,
      actual_date: "2023-03-01T17:26:00.000Z",
      status: "",
      piece: "72",
      weight: "Weight:48k",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "CHECKED IN",
    },
    {
      id: "dfdbd12c-670d-43d8-a5f3-6df19a20f84e",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Indira Gandhi International Airport - INDEL",
      flight_number: "AI803",
      plan_date: null,
      actual_date: "2023-03-02T05:13:00.000Z",
      status: "",
      piece: "72",
      weight: "Weight:48k",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "",
    },
    {
      id: "711bf759-3313-499a-8a1a-451460dffe8f",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Indira Gandhi International Airport - INDEL",
      flight_number: "AI381",
      plan_date: null,
      actual_date: "2023-03-02T05:13:00.000Z",
      status: "",
      piece: "72",
      weight: "Weight:48k",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "ARRIVED",
    },
    {
      id: "076d6174-08a7-41ff-9e06-5dfe7e3713ac",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Singapore Changi Airport - SGSIN",
      flight_number: "AI381",
      plan_date: null,
      actual_date: "2023-03-02T07:41:00.000Z",
      status: "",
      piece: "72",
      weight: "",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "ARRIVED",
    },
    {
      id: "c6f2b07f-3a4f-4204-aa46-73efcf0f728e",
      saas_air_timeline_id: "7a948d61-031a-495e-b58c-e597935b7c9a",
      milestone_metadata: null,
      station: "Indira Gandhi International Airport - INDEL",
      flight_number: "AI803",
      plan_date: null,
      actual_date: "2023-03-02T05:53:00.000Z",
      status: "",
      piece: "72",
      weight: "",
      alert_name: null,
      alert_level: null,
      alert_action: null,
      alert_details: null,
      event_date: null,
      milestone: "REMOVED AI803/03MAR23",
    },
  ],
  itinerary: {
    piece: "",
    origin: "Singapore Changi Airport - SGSIN",
    weight: "",
    airline_id: "e942211b-f46f-4a07-9756-626377218d1d",
    destination: "Indira Gandhi International Airport - INDEL",
  },
};

function Body({ list = [], loading = false, shipmentType = "fcl_freight" }) {
  const [oceanPoints, setOceanPoints] = useState([]);
	const [mapPoints, setMapPoints] = useState([]);

	const listToRender =
		shipmentType === 'fcl_freight'
			? list?.[0]?.data?.[0]?.tracking_data
			: list?.data?.[0]?.tracking_data;

      const { routesLoading } = useOceanRoute({
		setMapPoints,
		list: list?.[0],
	});

	const { airPoints, airLoading } = getAirPoints({ airTrackerDetails: list });

	useEffect(() => {
		if (mapPoints?.length) {
			setOceanPoints(
				mapPoints.find((x) => x.container_no === list?.[0]?.input)?.route,
			);
		}
	}, [list, mapPoints]);

	const points = shipmentType === 'fcl_freight' ? oceanPoints : airPoints;
	const listLoading =
		shipmentType === 'fcl_freight' ? routesLoading : airLoading;

    if (loading) {
		return (
			<div className={styles.container}>
				<LoadingState />
			</div>
		);
	}

  return (
    <div className={styles.tracking_info}>
      <TrackingData
        data={listToRender}
        shippingLine={list?.[0]?.shipping_line}
      />
      <TrackingMap
        routesLoading={listLoading}
        points={points}
        shipmentType={shipmentType}
      />
    </div>
  );
}

export default Body;
