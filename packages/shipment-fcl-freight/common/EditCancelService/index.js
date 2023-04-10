import { Popover } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import React, { useState } from 'react';

import CancelService from '../CancelService';

import getCancelServiceFlag from './getCancelServiceFlag';
import styles from './styles.module.css';

function EditCancelService({ state = '' }) {
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	const isServiceCancellable = getCancelServiceFlag({ user_data: { email: 'ajeet@cogoport.com' } });

	const content = (
		<>
			<div
				role="button"
				tabIndex={0}
				className={styles.action_button}
				onClick={() => openModal('edit')}
			>
				Edit
			</div>

			{isServiceCancellable ? (
				<div
					role="button"
					tabIndex={0}
					className={styles.action_button}
					onClick={() => openModal('cancel')}
				>
					Cancel
				</div>
			) : null}
		</>
	);

	return (
		<div className={styles.container}>
			<Popover
				visible={showPopover}
				interactive
				placement="bottom"
				content={content}
				onClickOutside={() => setShowPopover(false)}
			>
				<IcMOverflowDot className={styles.three_dots} onClick={() => setShowPopover(!showPopover)} />
			</Popover>

			{/* {showModal === 'edit' ? <EditParams /> : null} */}

			{showModal === 'cancel' ? <CancelService setShow={setShowModal} /> : null}
		</div>
	);
}

export default EditCancelService;
