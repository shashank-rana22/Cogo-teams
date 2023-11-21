import { cl } from '@cogoport/components';
import { IcMEdit, IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import getControls from './getControls';
import PortDetailsModal from './PortDetailsModal';
import styles from './styles.module.css';

function IcdShipmentDetails({ detail = {}, control = () => {}, errors = {}, watch = () => {} }) {
	const [showModal, setShowModal] = useState(false);

	const { origin_port = {}, destination_port = {} } = detail;

	const { is_icd:isOriginIcd = false } = origin_port;
	const { is_icd:isDestinationIcd = false } = destination_port;

	const controls = getControls({ isOriginIcd, isDestinationIcd });

	if (!isOriginIcd && !isDestinationIcd) {
		return null;
	}

	const { destination_main_port_id = '', origin_main_port_id = '' } = watch();

	const isErrorPresent = ['destination_main_port_id', 'origin_main_port_id']
		.some((item) => Object.keys(errors).includes(item));

	return (
		<div className={cl`${styles.container} ${isErrorPresent && styles.error}`}>
			{isOriginIcd ? (
				<div className={styles.item}>
					{origin_main_port_id ? (
						<IcCFtick
							className={styles.value}
						/>
					) : <IcCFcrossInCircle className={styles.value} />}

					Origin Main Port:
				</div>
			) : null}

			{isDestinationIcd ? (
				<div className={styles.item}>
					{destination_main_port_id ? (
						<IcCFtick
							className={styles.value}
						/>
					) : <IcCFcrossInCircle className={styles.value} />}

					Destination Main Port:
				</div>
			) : null}

			<div
				role="presentation"
				className={styles.edit_container}
				onClick={() => setShowModal(true)}
			>
				<IcMEdit style={{ marginRight: '2px' }} />

				Edit
			</div>

			<PortDetailsModal
				controls={controls}
				control={control}
				showModal={showModal}
				setShowModal={setShowModal}
				errors={errors}
			/>
		</div>
	);
}

export default IcdShipmentDetails;
