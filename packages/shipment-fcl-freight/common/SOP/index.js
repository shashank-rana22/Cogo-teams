import React, { useState } from 'react';

import useGetShipmentOperatingProcedure from '../../hooks/useGetShipmentOperatingProcedure';

import Body from './components/Body';
import Header from './components/Header';
import History from './components/History';

function SOP({ shipment_data = {} }) {
	const { id:shipment_id, importer_exporter_id:organization_id, services = [] } = shipment_data || {};

	const [showHistory, setShowHistory] = useState(false);

	const { data, loading, apiTrigger } = useGetShipmentOperatingProcedure({ shipment_id, organization_id });

	return (
		<>
			<Header setShowHistory={setShowHistory} showHistory={showHistory} />
			{showHistory ? <History shipment_id={shipment_id} /> : (
				<Body
					data={data}
					shipment_id={shipment_id}
					organization_id={organization_id}
					getProcedureTrigger={apiTrigger}
					services={services}
				/>
			)}
		</>
	);
}

export default SOP;
