import { Accordion } from '@cogoport/components';

import { AdditionalServiceList } from '../../../commons/AdditionalServices';
import Services from '../Services';

function ManageServices() {
	return (
		<div>
			<Accordion title={<div>Manage Services</div>} isOpen>
				<Services />

				<AdditionalServiceList />
			</Accordion>
		</div>
	);
}

export default ManageServices;
