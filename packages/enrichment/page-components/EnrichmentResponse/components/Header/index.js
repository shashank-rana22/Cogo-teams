import { Breadcrumb, Placeholder } from '@cogoport/components';
import { useRouter, Link } from '@cogoport/next';
import { startCase, format, isEmpty } from '@cogoport/utils';

import useHeaderStats from '../../hooks/useHeaderStats';

import styles from './styles.module.css';

const CARD_LABEL_MAPPING = {
	business_name: 'Organization Name',
	// registration_number : 'Registration Number',
};

function Header() {
	const { query = {} } = useRouter();

	const { requestData = {}, loading } = useHeaderStats();

	const { organization = {}, lead_organization = {}, created_at = '' } = requestData;

	if (loading) {
		return <Placeholder height="60px" width="100%" />;
	}

	return (
		<section>
			<Breadcrumb>
				<Breadcrumb.Item
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
					<div key={key} className={styles.info}>
						<div className={styles.info_label}>
							{CARD_LABEL_MAPPING[key]}
							{' '}
							-
						</div>

						<div className={styles.value}>
							{isEmpty(lead_organization) ? (
								startCase(organization?.[key] || '-')
							) : (
								startCase(lead_organization?.[key] || '-')
							)}
						</div>
					</div>
				))}

				<div className={styles.info}>
					<div className={styles.info_label}>Enrichment Request Created At -</div>

					<div className={styles.value}>
						{created_at ? format(created_at, 'dd MMM yyyy') : '-'}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Header;
