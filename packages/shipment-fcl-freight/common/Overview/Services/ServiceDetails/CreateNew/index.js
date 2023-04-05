import { Modal, cl } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import FormSearch from '../../../../Route/Form';

import styles from './styles.module.css';

function CreateNew({
	routeLeg,
	serviceList,
	shipmentData = {},
	isIE = false,
}) {
	const { general: { isMobile = false } } = useSelector((state) => state);

	const [form, setShowForm] = useState({
		service      : null,
		isAdditional : false,
	});
	const [upsellModal, setUpsellModal] = useState(false);

	const user_id = shipmentData?.importer_exporter_id;

	const handleClick = () => {
		setShowForm({
			service: {
				service      : routeLeg?.service_types?.[0].replace('_service', ''),
				service_type : routeLeg?.service_types?.[0].replace('_service', ''),
				type         : routeLeg?.trade_type === 'export' ? 'origin' : 'destination',
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

	const notUpsell = routeLeg?.service_types?.some((ele) => [
		'fcl_freight_local_service',
		'lcl_freight_local_service',
		'air_freight_local_service',
	].includes(ele));

	return (
		<>
			{!notUpsell && routeLeg?.display ? (
				<div
					className={cl` ${styles.container} ie_create_new_service `}
					onClick={handleClick}
					role="button"
					tabIndex={0}
				>
					<div className={styles.text}>{routeLeg?.display}</div>
					<IcMPlus />
				</div>
			) : null}

			<Modal
				show={upsellModal}
				onClose={() => setUpsellModal(false)}
				className="primary lg"
				styles={{ dialog: { width: isMobile ? 360 : 700 } }}
			>
				<FormSearch
					extraParams={{
						importer_exporter_id: user_id,
						importer_exporter_branch_id:
							shipmentData?.importer_exporter_branch_id,
						user_id: shipmentData?.user_id,
					}}
					service={form.service}
					onClose={handleClose}
					shipmentData={shipmentData}
					services={serviceList}
					isIE={isIE}
				/>
			</Modal>
		</>
	);
}

export default CreateNew;
