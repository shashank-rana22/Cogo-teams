import { useState } from 'react';

import AdditionalForm from './AdditionalForm';
import Details from './Details';

function Additional({
	data = [],
	shipment_ids = {},
	getProcedureTrigger = () => {},
}) {
	const [showForm, setShowForm] = useState(false);

	return showForm ? (
		<AdditionalForm
			setShowForm={setShowForm}
			shipment_ids={shipment_ids}
			getProcedureTrigger={getProcedureTrigger}
		/>
	)
		: <Details data={data} setShowForm={setShowForm} />;
}
export default Additional;
