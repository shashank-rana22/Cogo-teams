import { Modal, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'react-i18next';

import ArchiveDelete from '../../../common/ArchiveDelete';
import { SIZE_MAPPING, getTitleMapping } from '../../../constant/modalList';

import Configure from './Configure';
import Share from './Share';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	archive   : ArchiveDelete,
	delete    : ArchiveDelete,
	share     : Share,
	configure : Configure,
};

function ModalList({ modalInfo = {}, setModalInfo, activeTab, refetchTrackerList }) {
	const { show, name = 'archive', shipmentId = '', shipmentInfo = {} } = modalInfo || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const TITLE_MAPPING = getTitleMapping({ t });

	const Component = name ? COMPONENT_MAPPING?.[name] : <div />;
	const closeHandler = () => {
		setModalInfo({ show: false });
	};
	return (
		<Modal show={show} size={SIZE_MAPPING?.[name] || 'md'} onClose={closeHandler} closeOnOuterClick>
			<div className={styles.header}>
				<h3>{TITLE_MAPPING?.[name]}</h3>
				<ButtonIcon size="lg" icon={<IcMCross />} themeType="primary" onClick={closeHandler} />
			</div>
			<Component
				name={name}
				closeHandler={closeHandler}
				shipmentId={shipmentId}
				shipmentInfo={shipmentInfo}
				activeTab={activeTab}
				refetchTrackerList={refetchTrackerList}
			/>
		</Modal>
	);
}

export default ModalList;
