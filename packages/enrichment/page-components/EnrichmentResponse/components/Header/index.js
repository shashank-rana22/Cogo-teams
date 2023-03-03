import { Breadcrumb, Placeholder } from '@cogoport/components';
import { useRouter, Link } from '@cogoport/next';
import { format } from '@cogoport/utils/';

import useHeaderStats from '../../hooks/useHeaderStats';

import styles from './styles.module.css';

const CARD_LABEL_MAPPING = {
	business_name: 'Organization Name',
	// registration_number : 'Registration Number',
};

function Header() {
	const { query = {} } = useRouter();

	const { requestData = {}, loading } = useHeaderStats();

	if (loading) {
		return <Placeholder height="60px" width="100%" />;
	}

	return (

		<section>
			<Breadcrumb>
				<Breadcrumb.Item
					// label={<a href={`/v2/${locale}/${partner_id}/enrichment/`}>Enrichment Requests</a>}
					label={(
						<Link href={`/enrichment?tab=${query.tab}`}>
							Enrichment
						</Link>
					)}
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

		</section>

	);
}

export default Header;
