import React, { useState } from 'react';

import useGetShipmentOperatingProcedure from '../../hooks/useGetShipmentOperatingProcedure';
import useListShipmentAudits from '../../hooks/useListShipmentAudits';

import Body from './components/Body';
import Header from './components/Header';
import History from './components/History';

function SOP({ shipment_data = {} }) {
	const { id:shipment_id, importer_exporter_id:organization_id, services = [] } = shipment_data || {};

	const [showHistory, setShowHistory] = useState(false);

	const { data, loading, apiTrigger } = useGetShipmentOperatingProcedure({ shipment_id, organization_id });
	const {
		data:auditsData,
		setFilters:auditsSetFilters,
		filters:auditsFilters,
		loading:auditsLoading,
		apiTrigger:auditsTrigger,
	} = useListShipmentAudits({
		defaultFilters: {
			action_name: 'update_operating_instruction', shipment_id,
		},
	});

	return (
		<div>

			<Header
				setShowHistory={setShowHistory}
				showHistory={showHistory}
				auditsData={auditsData}
			/>

			{showHistory ? (
				<History
					shipment_id={shipment_id}
					data={auditsData}
					setFilters={auditsSetFilters}
					filters={auditsFilters}
					loading={auditsLoading}
				/>
			) : (
				<Body
					data={data}
					shipment_id={shipment_id}
					organization_id={organization_id}
					getProcedureTrigger={apiTrigger}
					services={services}
					auditsTrigger={auditsTrigger}
					loading={loading}
				/>
			)}

		</div>
	);
}

export default SOP;
