import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import OrganizationCard from './components/commons/OrganizationCard';
import PrimaryTabs from './components/PrimaryTabs';
import styles from './styles.module.css';

function Feedbacks() {
	const router = useRouter();

	const { t } = useTranslation(['allocation']);

	const {
		general: {
			query: {
				organization_id = '',
				organization = '',
				status = '',
				type = '',
			},
		},
	} = useSelector((state) => state);

	const routeDetailsRef = useRef({
		organization,
		organization_id,
		status,
	});

	return (
		<>
			<button className={styles.back_button} onClick={() => router.back()}>
				<IcMArrowBack width={32} height={20} />
				{t('allocation:crm_feedback_dashboard_heading')}
			</button>

			<OrganizationCard ref={routeDetailsRef} />

			<PrimaryTabs organization_id={organization_id} type={type} />
		</>
	);
}

export default Feedbacks;
