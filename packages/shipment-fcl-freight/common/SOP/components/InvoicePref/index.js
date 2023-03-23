import { useState } from 'react';

import Details from './Details';
import InvoicePrefForm from './InvoicePrefForm';

function InvoicePref({
	data = [], shipment_ids = {}, getProcedureTrigger = () => {},
	services = [], auditsTrigger = () => {},
}) {
	const [showForm, setShowForm] = useState(false);
	return showForm
		? (
			<InvoicePrefForm
				setShowForm={setShowForm}
				data={data}
				showForm={showForm}
				shipment_ids={shipment_ids}
				getProcedureTrigger={getProcedureTrigger}
				services={services}
				auditsTrigger={auditsTrigger}
			/>
		)
		: <Details data={data} setShowForm={setShowForm} />;
}
export default InvoicePref;
