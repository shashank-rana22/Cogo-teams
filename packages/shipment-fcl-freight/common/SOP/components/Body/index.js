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
		<div>
			<div>
				<Card>
					<Document data={document_handling_preference} />
				</Card>
			</div>
			<div>
				<Card>
					<InvoicePref data={invoice_preference} />
				</Card>
			</div>
			<div>
				<Card>
					<Additional data={additional_preference} />
				</Card>
			</div>
		</div>
	);
}
export default Body;
