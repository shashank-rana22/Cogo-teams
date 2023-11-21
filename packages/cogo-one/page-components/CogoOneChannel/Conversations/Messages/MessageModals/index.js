import { Modal } from '@cogoport/components';
import { Image } from '@cogoport/next';
import React from 'react';

import MODAL_COMPONENT_MAPPING from '../../../../../constants/MODAL_COMPONENT_MAPPING';

import styles from './styles.module.css';

function MessageModals({
	openModal = {},
	closeModal = () => {},
	activeTab = {},
	loading = false,
	assignLoading = false,
	viewType = '',
	formattedData = {},
	isMobile = false,
}) {
	const {
		comp: ActiveModalComp = null,
		title: { img = null, name = null } = {},
		modalSize = 'md',
	} = MODAL_COMPONENT_MAPPING[openModal?.type] || {};

	if (!openModal?.type || !ActiveModalComp) {
		return null;
	}

	return (
		<Modal
			size={modalSize}
			show
			onClose={closeModal}
			placement={isMobile ? 'bottom' : 'center'}
			className={styles.styled_ui_modal_container}
		>
			{name && (
				<Modal.Header
					title={(
						<div className={styles.modal_header_title}>
							{img && <Image src={img} alt="logo" height={18} width={18} />}
							<div className={styles.modal_title}>
								{name}
							</div>
						</div>
					)}
				/>
			)}
			<ActiveModalComp
				data={openModal?.data || {}}
				activeMessageCard={activeTab?.data}
				assignLoading={assignLoading}
				loading={loading}
				viewType={viewType}
				formattedData={formattedData}
				isMobile={isMobile}
			/>
		</Modal>

	);
}

export default MessageModals;
