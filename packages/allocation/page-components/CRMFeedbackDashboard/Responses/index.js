import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';
import { useRef } from 'react';

import OrganizationCard from './components/OrganizationCard';
import styles from './styles.module.css';
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

	const routeDetailsRef = useRef({ organization, third_party });

	const router = useRouter();

	return (
		<>
			<button
				className={styles.back_button}
				onClick={() => router.back()}
			>
				<IcMArrowBack width="32px" height="20px" />
				{startCase(organization)}
			</button>

			<OrganizationCard ref={routeDetailsRef} />

			<PrimaryTabs feedback_request_id={feedback_request_id} />
		</>
	);
}

export default Responses;
