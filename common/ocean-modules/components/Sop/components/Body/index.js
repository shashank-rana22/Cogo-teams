import { Loader } from '@cogoport/components';

import getInstructionData from '../../helpers/getInstructionData';
import Additional from '../Additional';
import Card from '../Card';
import Document from '../Document';
import InvoicePref from '../InvoicePref';

import styles from './styles.module.css';

function Body({
	data = {},
	shipment_id = '',
	organization_id = '',
	getProcedureTrigger = () => {},
	auditsTrigger = () => {},
	services = [],
	loading = false,
	primary_service = {},
}) {
	const { operating_procedure:{ id:procedure_id = '' } = {} } = data;

	const {
		invoice_preference = [],
		additional_preference = [],
		document_handling_preference = [],
	} = getInstructionData({ data });

	const shipment_ids = { shipment_id, organization_id, procedure_id };

	return loading
		? (
			<div className={styles.loader}>
				<Loader />
			</div>
		)
		: (
			<>
				<Card label="Document Handling" defaultOpen={document_handling_preference.length}>
					<Document
						data={document_handling_preference}
						shipment_ids={shipment_ids}
						getProcedureTrigger={getProcedureTrigger}
						auditsTrigger={auditsTrigger}
						primary_service={primary_service}
					/>
				</Card>

				<Card label="Invoice Preferences" defaultOpen={invoice_preference.length}>
					<InvoicePref
						data={invoice_preference}
						shipment_ids={shipment_ids}
						getProcedureTrigger={getProcedureTrigger}
						services={services}
						auditsTrigger={auditsTrigger}
						primary_service={primary_service}
					/>
				</Card>

				<Card label="Additional Information" defaultOpen={additional_preference.length}>
					<Additional
						data={additional_preference}
						getProcedureTrigger={getProcedureTrigger}
						shipment_ids={shipment_ids}
					/>
				</Card>
			</>
		);
}
export default Body;
