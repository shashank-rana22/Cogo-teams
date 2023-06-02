import { ShipmentDetailContext } from '@cogoport/context';
import { TermsAndConditions } from '@cogoport/surface-modules';
import { useContext, useEffect } from 'react';

import ManageServices from './ManageServices';

const notToShowManageServices = ['service_ops1', 'service_ops2']; // send to stakeholder_config

function Overview() {
	const { shipment_data, refetchServices = () => {} } = useContext(ShipmentDetailContext);

	useEffect(() => {
		refetchServices();
	}, [refetchServices]);

	return (
		<div>
			<ManageServices />

			{shipment_data?.terms_and_conditions?.length ? (
				<TermsAndConditions shipmentData={shipment_data} />
			) : null}
		</div>
	);
}

export default Overview;
