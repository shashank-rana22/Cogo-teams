import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const { listKamExpertiseCurrentConfigs } = useGetKamExpertiseCurrentConfig();

	const {
		list:data = [],
		audit_data = {},
	} = listKamExpertiseCurrentConfigs;

	const LIVE_VERSION = data.filter((item) => item.status_value === 'active')[0]?.version_number || '';

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div style={{ fontSize: '18px', marginBottom: '4px' }}>
					Current Configuration :
					{' '}
					<b>{LIVE_VERSION}</b>
				</div>

				<div className={styles.audits_data}>
					<div style={{ marginRight: '16px' }}>
						Published on :
						{' '}
						<b>
							{ audit_data.updated_at
								? format(audit_data.updated_at, 'dd MMM yyyy') : ''}
						</b>
					</div>

					<div>
						Published by :
						{' '}
						<b>{audit_data?.name || ''}</b>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					onClick={() => router.push('/allocation/kam-expertise/view-badges')}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
					View Badges
				</Button>

				<Button
					onClick={() => router.push('/allocation/kam-expertise/events')}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
					View Events
				</Button>

				{/* <Button
					// onClick={() => { router.push('/allocation/kam-expertise/'); }}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
				// Todo check if showing it is possible
					View All Configs
				</Button> */}

				<Button
					onClick={() => router.push('/allocation/kam-expertise/configurations')}
					size="lg"
					themeType="primary"
					className={styles.button}
				>
					Configure Now
				</Button>
			</div>
		</div>
	);
}

export default Header;
