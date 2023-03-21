import { useState } from 'react';

import getInstructionData from '../../helpers/getInstructionData';
import Additional from '../Additional';
import Card from '../Card';
import Document from '../Document';
import InvoicePref from '../InvoicePref';

function Body({ data = {} }) {
	const [organizationData, setOrganizationData] = useState({});

	const {
		invoice_preference = [],
		additional_preference = [],
		document_handling_preference = [],
	} = getInstructionData({ data });

	return (
		<>
			<Card label="Document Handling" defaultOpen={document_handling_preference.length}>
				<Document
					data={document_handling_preference}
					organizationData={organizationData}
					setOrganizationData={setOrganizationData}
				/>
			</Card>
			<Card label="Invoice Preferences" defaultOpen={invoice_preference.length}>
				<InvoicePref
					data={invoice_preference}
					organizationData={organizationData}
					setOrganizationData={setOrganizationData}
				/>
			</Card>
			<Card label="Additional Information" defaultOpen={additional_preference.length}>
				<Additional data={additional_preference} />
			</Card>
		</>
	);
}
export default Body;
