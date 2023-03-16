import { useSelector } from '@cogoport/store';

import Header from './components/commons/Header';
import OrganizationCard from './components/commons/OrganizationCard';
import PrimaryTabs from './components/PrimaryTabs';

function Feedbacks() {
	const {
		general: {
			query: {
				organization_id = '',
				organization = '',
				status = '',
			},
		},
	} = useSelector((state) => state);

	return (
		<>
			<Header />
			<OrganizationCard organization={organization} status={status} />
			<PrimaryTabs organization_id={organization_id} />
		</>

	);
}

export default Feedbacks;
