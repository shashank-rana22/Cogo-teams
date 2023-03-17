import getInstructionData from '../../helpers/getInstructionData';
import Additional from '../Additional';
import Card from '../Card';
import Document from '../Document';
import InvoicePref from '../InvoicePref';

function Body({ data = {} }) {
	const {
		invoice_preference = [],
		additional_preference = [],
		document_handling_preference = [],
	} = getInstructionData({ data });

	return (
		<>
			<Card label="Document Handling">
				<Document data={document_handling_preference} />
			</Card>
			<Card label="Invoice Preferences">
				<InvoicePref data={invoice_preference} />
			</Card>
			<Card label="Additional Information">
				<Additional data={additional_preference} />
			</Card>
		</>
	);
}
export default Body;
