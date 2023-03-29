import { useSelector } from '@cogoport/store';

import Header from './components/Header';
import OrganizationCard from './components/OrganizationCard';
import PrimaryTabs from './Tabs';

function Responses() {
	const {
		general: {
			query: {
				feedback_request_id = '',
				organization = '',
				third_party = '',
			},
		},
	} = useSelector((state) => state);

	return (
		<>
			<Header organization={organization} />
			<OrganizationCard third_party={third_party} />
			<PrimaryTabs feedback_request_id={feedback_request_id} />
		</>

	);
}

export default Responses;
