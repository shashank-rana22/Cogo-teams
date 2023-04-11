import { Popover } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState, useContext } from 'react';

import CancelService from '../CancelService';

import getCanCancelService from './getCanCancelService';
import styles from './styles.module.css';

function EditCancelService({ state, service_type, trade_type }) {
	const [showModal, setShowModal] = useState(false);
	const [showPopover, setShowPopover] = useState(false);

	const user_data = useSelector((({ profile }) => profile?.user));
	const { shipment_data } = useContext(ShipmentDetailContext);

	const openModal = (modalKey) => {
		setShowModal(modalKey);
		setShowPopover(false);
	};

	const isServiceCancellable = getCanCancelService({ shipment_data, user_data, state });

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

			{showModal === 'cancel' ? (
				<CancelService
					setShow={setShowModal}
					trade_type={trade_type}
					service_type={service_type}
				/>
			) : null}
		</div>
	);
}

export default EditCancelService;
