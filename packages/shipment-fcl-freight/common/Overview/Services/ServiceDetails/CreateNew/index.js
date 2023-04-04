import { Modal, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Form from '../../../../Form';

import styles from './styles.module.css';

function CreateNew({
	upsellableService = {},
	servicesList = [],
	shipmentData = {},
	primary_service = {},
}) {
	const [form, setShowForm] = useState({
		service      : null,
		isAdditional : false,
	});

	const [upsellModal, setUpsellModal] = useState(false);

	const user_id = shipmentData?.importer_exporter_id;

	const handleClick = () => {
		setShowForm({
			service: {
				service      : upsellableService?.service_type.replace('_service', ''),
				service_type : upsellableService?.service_type.replace('_service', ''),
				type         : upsellableService?.trade_type === 'export' ? 'origin' : 'destination',
			},
			show           : true,
			additionalShow : true,
		});
		setUpsellModal(true);
	};

	const handleClose = () => {
		setShowForm({ service: null, show: false, isAdditional: false });
		setUpsellModal(false);
	};

	return (
		<>
			{upsellableService?.display_label ? (
				<div
					className={cl` ${styles.container} ie_create_new_service `}
					onClick={handleClick}
					role="button"
					tabIndex={0}
				>
					<div className={styles.text}>{upsellableService.display_label}</div>
					<IcMPlus />
				</div>
			) : null}

			<Modal
				show={upsellModal}
				onClose={() => setUpsellModal(false)}
				className="primary lg"
				styles={{ dialog: { width: 700 } }}
			>
				<Form
					service={form.service}
					onClose={handleClose}
					shipmentData={shipmentData}
					primary_service={primary_service}
					services={servicesList}
				/>
			</Modal>
		</>
	);
}

export default CreateNew;
