import { Modal } from '@cogoport/components';
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
			placement="center"
			className={styles.styled_ui_modal_container}
		>
			{name && (
				<Modal.Header
					title={(
						<div className={styles.modal_header_title}>
							{img && <img src={img} alt="logo" />}
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
			/>
		</Modal>

	);
}

export default MessageModals;
