import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils/';

import useEnrichmentRequests from '../../hooks/useEnrichmentRequests';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();
	const handleBack = () => {
		router.push('/enrichment/');
	};

	const { requestData = {} } = useEnrichmentRequests();

	return (

		<>

			<div
				className={styles.back}
				role="presentation"
				onClick={() => handleBack()}
			>
				<IcMArrowBack style={{ marginRight: '8px' }} />
				<div>Back to Enrichment Dashboard</div>
			</div>

			<div className={styles.header}>
				<div className={styles.info}>
					<div style={{ marginRight: '12px' }}>Organizatio Name -</div>
					<div className={styles.value}>
						{requestData.organization?.business_name}
					</div>
				</div>

				<div className={styles.info}>

					<div style={{ marginRight: '12px' }}>Registration Number -</div>
					<div className={styles.value}>
						{requestData.organization?.registration_number}
					</div>

				</div>

				<div className={styles.info}>

					<div style={{ marginRight: '12px' }}>Enrichment Request Created At -</div>
					<div className={styles.value}>
						{format(requestData.created_at, 'dd MMM yyyy')}
					</div>

				</div>
			</div>

		</>

	);
}

export default Header;
