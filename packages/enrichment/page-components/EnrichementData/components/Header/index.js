import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

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

				<div className={styles.profile}>

					<div className={styles.circle}>
						<div>RT</div>
					</div>
				</div>
				<div className={styles.organization}>

					<div>
						<div className={styles.title}>
							Organization Name :
							{' '}
							{requestData.organization?.business_name}
							{' '}
						</div>
						<div className={styles.sub_title}>
							{' '}
							Enrichment Request Date:
							{' '}
							{requestData.created_at}
						</div>
						<div className={styles.pan}>
							PAN:
							{' '}
							{requestData.organization?.registration_number}
						</div>
					</div>

				</div>
				<div className={styles.address}>
					<div style={{ marginRight: '20px' }}> Address: </div>

					<div>

						Lörem ipsum kavis begon korsspråkande av renoren grindsamhälle
						inaskad usm ifall on vupömubelt. Supragyn lunar. Ludål nixa renat panpatologi.
						Ditäktig nätpoker lans ninyl

					</div>

				</div>
			</div>

		</>

	);
}

export default Header;
