import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const { LIVE_VERSION_DATA } = useGetKamExpertiseCurrentConfig();

	const { version_number = '', audit_data = {} } = LIVE_VERSION_DATA;
	const { updated_at = '', name = '' } = audit_data;

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.config}>
					Current Configuration :
					{' '}
					Version
					{' '}
					<b>{version_number}</b>
				</div>

				<div className={styles.audits_data}>
					<div style={{ marginRight: '16px' }}>
						Published on :
						{' '}
						<b>
							{updated_at ? format(updated_at, 'dd MMM yyyy') : ''}
						</b>
					</div>

					<div>
						Published by :
						{' '}
						<b>{name}</b>
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
