import { Button, Modal } from '@cogoport/components';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { FIRST_VISIT_MAPPING } from '../../constant/trackingInfo';
import useRedirectFn from '../../hooks/useRedirectFn';
import ArchiveDelete from '../ArchiveDelete';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function EmptyState() {
	const { query } = useRouter();
	const { t } = useTranslation(['common', 'airOceanTracking']);
	const { trackingType = '', trackingId = '', isFirstVisit: firstVisitBool = 'false' } = query;

	const isFirstVisit = FIRST_VISIT_MAPPING[firstVisitBool];

	const [deleteModal, setDeleteModal] = useState(false);

	const { redirectToDashboard } = useRedirectFn();
	const closeHandler = () => setDeleteModal(false);
	return (
		<div className={styles.container}>
			<Image
				src={GLOBAL_CONSTANTS.image_url.extract_data}
				width={400}
				height={400}
				alt="loading"
			/>
			<Image
				src={GLOBAL_CONSTANTS.image_url.loading}
				width={40}
				height={40}
				alt="loading"
			/>

			<div>
				<h3>{t('airOceanTracking:air_ocean_tracking_empty_card_text')}</h3>
				<p>
					{t('airOceanTracking:air_ocean_tracking_fetching_data_text')}
				</p>
			</div>
			{isFirstVisit && (
				<div>
					<Button
						className={styles.back_btn}
						onClick={redirectToDashboard}
						type="button"
					>
						{t('airOceanTracking:air_ocean_tracking_back_button_label')}
					</Button>
					<Button
						themeType="linkUi"
						onClick={() => setDeleteModal(true)}
						type="button"
					>
						{t('airOceanTracking:air_ocean_tracking_delete_button_label')}
					</Button>
				</div>
			)}
			<Modal show={deleteModal} closeOnOuterClick onClose={closeHandler}>
				<Modal.Header title={t('airOceanTracking:air_ocean_tracking_delete_tracker')} />
				<div className={styles.line} />
				<ArchiveDelete
					shipmentId={trackingId}
					activeTab={trackingType}
					closeHandler={closeHandler}
					src="trackingDetails"
				/>
			</Modal>
		</div>
	);
}

export default EmptyState;
