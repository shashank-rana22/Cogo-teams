import { useState } from 'react';

import Details from './Details';
import InvoicePrefForm from './InvoicePrefForm';

function InvoicePref({
	data = [],
	shipment_data = {},
	getProcedureTrigger = () => {},
	services = [],
	auditsTrigger = () => {},
	primary_service = {},
}) {
	const [showForm, setShowForm] = useState(false);
	return showForm
		? (
			<InvoicePrefForm
				setShowForm={setShowForm}
				data={data}
				showForm={showForm}
				shipment_data={shipment_data}
				getProcedureTrigger={getProcedureTrigger}
				services={services}
				auditsTrigger={auditsTrigger}
				primary_service={primary_service}
			/>
		)
		: <Details data={data} setShowForm={setShowForm} />;
}
export default InvoicePref;
