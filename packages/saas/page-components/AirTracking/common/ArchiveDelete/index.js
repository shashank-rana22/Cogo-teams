import { cl, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useDeleteTracker from '../../hooks/useDeleteTracker';

import styles from './styles.module.css';

function ArchiveDelete({
	name = 'delete', shipmentId = '', closeHandler, activeTab = 'ocean',
	refetchTrackerList = () => {}, src = '',
}) {
	const { t } = useTranslation(['commmon', 'airOceanTracking']);

	const { loading, deleteArchiveHandler } = useDeleteTracker({
		name,
		id: shipmentId,
		closeHandler,
		activeTab,
		refetchTrackerList,
		src,
	});

	return (
		<div className={styles.container}>
			<div className={styles.main_body}>
				{`Are you sure, you want to ${name} this tracker ?`}
			</div>
			<div className={cl`${styles.flex_box} ${styles.footer}`}>
				<Button themeType="secondary" type="button" onClick={closeHandler} disabled={loading}>
					{t('airOceanTracking:air_ocean_tracking_no_button_label')}
				</Button>
				<Button
					themeType="accent"
					className={styles.submit}
					type="button"
					loading={loading}
					onClick={deleteArchiveHandler}
				>
					{t('airOceanTracking:air_ocean_tracking_yes_button_label')}
				</Button>
			</div>
		</div>

	);
}

export default ArchiveDelete;
