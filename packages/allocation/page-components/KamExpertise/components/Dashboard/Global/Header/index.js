import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import useGetKamExpertiseCurrentConfig from '../../../../hooks/useGetKamExpertiseCurrentConfig';

import styles from './styles.module.css';

function Header() {
	const router = useRouter();

	const { t } = useTranslation(['allocation']);

	const { list = [], configCardLoading : loading = false } = useGetKamExpertiseCurrentConfig({ type: 'live' });

	const liveVersionList = list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { version_number = '', audit_data = {} } = liveVersionList;

	const { updated_at = '', name = '' } = audit_data;

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>
				<div className={styles.config}>
					{t('allocation:current_configuration_label')}
					{loading
						? <Placeholder height="20px" width="100px" margin="0 0 0 8px" />
						: (
							<div className={styles.label}>
								{t('allocation:version_label')}
								{' '}
								{version_number || ''}
							</div>
						)}
				</div>

				<div className={styles.audits_data}>
					<div className={styles.published_data}>
						{t('allocation:published_on_label')}
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
						{t('allocation:published_by_label')}
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
					{t('allocation:view_badges_label')}
				</Button>

				<Button
					onClick={() => router.push('/allocation/kam-expertise/events')}
					size="lg"
					themeType="secondary"
					className={styles.button}
				>
					{t('allocation:view_events_label')}
				</Button>

				<Button
					onClick={() => router.push('/allocation/kam-expertise/configurations')}
					size="lg"
					themeType="primary"
					className={styles.button}
				>
					{t('allocation:configure_now_label')}
				</Button>
			</div>
		</div>
	);
}

export default Header;
