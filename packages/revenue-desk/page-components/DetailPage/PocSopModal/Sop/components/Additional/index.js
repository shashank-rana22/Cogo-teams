import { useState } from 'react';

import AdditionalForm from './AdditionalForm';
import Details from './Details';

function Additional({
	data = [],
	shipment_data = {},
	getProcedureTrigger = () => {},
}) {
	const [showForm, setShowForm] = useState(false);

	return showForm ? (
		<AdditionalForm
			setShowForm={setShowForm}
			shipment_data={shipment_data}
			getProcedureTrigger={getProcedureTrigger}
		/>
	)
		: <Details data={data} setShowForm={setShowForm} />;
}
export default Additional;
