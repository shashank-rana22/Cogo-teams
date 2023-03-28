import { useSelector } from '@cogoport/store';

import Header from './components/Header';
import OrganizationCard from './components/OrganizationCard';
import PrimaryTabs from './Tabs';

function Responses() {
	const {
		general: {
			query: {
				organization_id = '',
				organization = '',
			},
		},
	} = useSelector((state) => state);

	return (
		<>
			<Header organization={organization} organization_id={organization_id} />
			<OrganizationCard organization={organization} />
			<PrimaryTabs organization_id={organization_id} />
		</>

	);
}

export default Responses;
