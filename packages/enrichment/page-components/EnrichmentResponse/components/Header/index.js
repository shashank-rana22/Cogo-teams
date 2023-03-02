import { Breadcrumb, Placeholder } from '@cogoport/components';
import { format } from '@cogoport/utils/';

import useEnrichmentRequests from '../../hooks/useEnrichmentRequests';

import styles from './styles.module.css';

const CARD_LABEL_MAPPING = {
	business_name: 'Organization Name',
	// registration_number : 'Registration Number',
};

function Header(props) {
	const { locale, partner_id } = props;

	const { requestData = {}, loading } = useEnrichmentRequests();

	if (loading) {
		return <Placeholder height="60px" width="100%" />;
	}

	return (

		<div>
			<Breadcrumb>
				<Breadcrumb.Item
					label={<a href={`/v2/${locale}/${partner_id}/enrichment/`}>Enrichment Requests</a>}
				/>

				<Breadcrumb.Item label="Organization Details" />

			</Breadcrumb>

			<div className={styles.header}>

				{Object.keys(CARD_LABEL_MAPPING).map((key) => (
					<div className={styles.info}>

						<div className={styles.info_label}>
							{CARD_LABEL_MAPPING[key]}
							{' '}
							-
						</div>
						<div className={styles.value}>
							{requestData.organization?.[key]}
						</div>

					</div>

				))}

				<div className={styles.info}>

					<div className={styles.info_label}>Enrichment Request Created At -</div>
					<div className={styles.value}>
						{format(requestData.created_at, 'dd MMM yyyy')}
					</div>

				</div>
			</div>

		</div>

	);
}

export default Header;
