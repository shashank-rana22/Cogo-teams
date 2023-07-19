import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState } from 'react';

import Details from './Details';
import DocumentForm from './DocumentForm';

function Document({
	data = [],
	shipment_data = {},
	getProcedureTrigger = () => {},
	auditsTrigger = () => {},
	primary_service = {},
}) {
	const { sop_detail = {}, id:instruction_id } = data[GLOBAL_CONSTANTS.zeroth_index] || {};

	const [showForm, setShowForm] = useState(false);

	return showForm
		? (
			<DocumentForm
				sop_detail={sop_detail}
				setShowForm={setShowForm}
				shipment_data={shipment_data}
				showForm={showForm}
				instruction_id={instruction_id}
				getProcedureTrigger={getProcedureTrigger}
				auditsTrigger={auditsTrigger}
				primary_service={primary_service}
			/>
		)
		: <Details sop_detail={sop_detail} setShowForm={setShowForm} instruction_id={instruction_id} />;
}
export default Document;
