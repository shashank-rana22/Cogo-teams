import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';

import useGetKamExpertiseCurrentConfig from '../../../hooks/useGetKamExpertiseCurrentConfig';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const { list = [], configCardLoading : loading = false } = useGetKamExpertiseCurrentConfig({ type: 'live' });

	const liveVersionList = list?.[0] || {};

	const { version_number = '', audit_data = {} } = liveVersionList;
	const { updated_at = '', name = '' } = audit_data;

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.config}>
					Current Configuration :
					{loading
						? <Placeholder height="20px" width="100px" margin="0 0 0 8px" />
						: (
							<div className={styles.label}>
								Version
								{' '}
								{version_number || ''}
							</div>
						)}
				</div>

				<div className={styles.audits_data}>
					<div className={styles.published_data}>
						Published on :
						{loading
							? <Placeholder height="20px" width="80px" margin="0 0 0 8px" />
							: (
								<div className={styles.label}>
									{(updated_at && formatDate({
										date       : updated_at,
										dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										formatType : 'date',
									})) || ''}
								</div>
							)}
					</div>

					<div className={styles.name_data}>
						Published by :
						{loading
							? <Placeholder height="20px" width="200px" margin="0 0 0 8px" />
							: (
								<div className={styles.label}>
									{name || ''}
								</div>
							)}
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
