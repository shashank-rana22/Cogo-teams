import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'react-i18next';

import useRedirectFn from '../../hooks/useRedirectFn';

import styles from './styles.module.css';
import TrackingInfo from './TrackingInfo';

import { useRouter } from '@/packages/next';

function TrackerDetails() {
	const { query } = useRouter();
	const { t } = useTranslation(['common', 'airOceanTracking']);
	const { trackingType = 'ocean', fromDashBoard = 'false' } = query;

	const { redirectToList, redirectToDashboard } = useRedirectFn();

	const backHandler = () => {
		if (fromDashBoard === 'false') {
			redirectToList({ type: trackingType });
		} else {
			redirectToDashboard();
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.title_container}>
				<IcMArrowBack width={15} height={15} onClick={backHandler} />
				<h2>{t('airOceanTracking:tracking_title')}</h2>
			</div>
			<TrackingInfo />
		</div>
	);
}

export default TrackerDetails;
