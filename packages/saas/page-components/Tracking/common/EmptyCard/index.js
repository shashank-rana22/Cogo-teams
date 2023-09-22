import { ButtonIcon, Modal } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import getMappingObject from '../../constant/card';
import ArchiveDelete from '../ArchiveDelete';

import styles from './styles.module.css';

function EmptyCard({ activeTab = '', type = '', input = '', shipmentId = '', refetchTrackerList }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const [openModal, setOpenModal] = useState(false);

	const GET_MAPPING = getMappingObject({ t });

	const { CARD_TITLE, EMPTY_STATE_INFO } = GET_MAPPING?.[activeTab] || {};

	const closeHandler = () => setOpenModal(false);

	return (
		<div className={styles.container}>
			<div className={styles.flex_box}>
				<div className={styles.info}>
					{activeTab === 'ocean' ? CARD_TITLE?.[type] : CARD_TITLE }
					{' '}
					:
					{' '}
					{input}
				</div>
				<ButtonIcon icon={<IcMDelete />} onClick={() => setOpenModal(true)} />
			</div>

			<div className={styles.info_container}>
				<h3 className={styles.title}>{t('airOceanTracking:air_ocean_tracking_empty_card_text')}</h3>
				<p>
					{`${t('airOceanTracking:air_ocean_tracking_fetching_data_text_1')} ${EMPTY_STATE_INFO}
					 ${t('airOceanTracking:air_ocean_tracking_fetching_data_text_2')}`}
				</p>
			</div>

			<Modal show={openModal} onClose={closeHandler} closeOnOuterClick>
				<Modal.Header title={t('airOceanTracking:air_ocean_tracking_delete_tracker')} />
				<div className={styles.border} />
				<ArchiveDelete
					activeTab={activeTab}
					closeHandler={closeHandler}
					shipmentId={shipmentId}
					refetchTrackerList={refetchTrackerList}
				/>
			</Modal>
		</div>
	);
}

export default EmptyCard;
