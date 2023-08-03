import { Tooltip, Button, Modal, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCError } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import Image from 'next/image';
import { useContext, useState } from 'react';

import useUpdateShipmentFaultAlarm from '../../../../hooks/useUpdateShipmentFaultAlarm';

import controls from './controls';
import RemarkForm from './RemarkForm';
import styles from './styles.module.css';
import ModalContent from './ViewDetails';

const CRITICALITY_MAPPING = {
	5 : 'Very Very High',
	4 : 'Very High',
	3 : 'High',
	2 : 'Medium',
	1 : 'Low',
};

function RaiseAlarmCard({ data = {}, reload = false, setReload = () => {} }) {
	const { shipment_data = {} } = useContext(ShipmentDetailContext);

	const [showAlarmCard, setShowAlarmCard] = useState(false);
	const [resolve, setResolve] = useState(false);

	const {
		onUpdate = () => {},
		errors = {},
		loading = false,
		onSubmit = () => {},
		reset = () => {},
		handleSubmit = () => {},
		onError = () => {},
		control = {},
		setErrors = () => {},
	} = useUpdateShipmentFaultAlarm({
		setResolve,
		reload,
		setReload,
	});

	const fraud_reason = startCase(
		data?.alarm_reason?.fraud_reason?.split('-')?.[GLOBAL_CONSTANTS.zeroth_index],
	);

	const handleClose = () => {
		reset();
		setErrors({});
		setResolve(false);
	};

	return (
		<div className={styles.alert_box}>
			<div className={styles.icon}>
				<IcCError height={28} width={28} />
			</div>
			<div className={styles.text_box}>
				<div className={styles.text}>
					{`Alert! ${fraud_reason}(${CRITICALITY_MAPPING[data?.criticality]})`}
				</div>

				<div className={cl`${styles.text} ${styles.small}`}>
					Concern has been raised by
					<div className={styles.bold}>
						{data?.user_data?.name}
					</div>
					for customer
					<Tooltip
						placement="bottom"
						theme="light"
						content={<div className={styles.bold}>{data?.organization_data?.business_name}</div>}
					>
						<div className={styles.company}>
							{data?.organization_data?.business_name}
						</div>
					</Tooltip>
					<div className={styles.bold}>
						{`(SID: ${shipment_data?.serial_id})`}
					</div>
					with the reason:
					<div className={styles.bold}>
						{`${fraud_reason} on ${data?.updated_at}`}
					</div>
				</div>

				<div
					role="presentation"
					className={styles.details}
					onClick={() => setShowAlarmCard(true)}
				>
					View Details
				</div>
			</div>

			<div className={styles.button_box}>
				<Button
					onClick={() => onUpdate(data)}
					style={{ marginRight: '12px' }}
					className={styles.snooze}
				>
					<Image
						src={GLOBAL_CONSTANTS.image_url.alarm_snooze}
						alt="alarm"
						width={25}
						height={25}
					/>
				</Button>

				<Button themeType="secondary" className={styles.close} onClick={() => setResolve(true)}>
					<p className={styles.resolve_text}>Resolve</p>
				</Button>
			</div>

			{resolve && (
				<Modal
					className={styles.styled_modal}
					show={resolve}
					onClose={() => handleClose()}
				>
					<RemarkForm
						controls={controls}
						control={control}
						errors={errors}
						loading={loading}
						onSubmit={() => onSubmit(data)}
						reset={reset}
						handleSubmit={handleSubmit}
						onError={onError}
					/>
				</Modal>
			)}

			{showAlarmCard && (
				<Modal
					className={styles.styled_modal}
					show={showAlarmCard}
					onClose={() => setShowAlarmCard(false)}
				>
					<ModalContent content={data} />
				</Modal>
			)}
		</div>
	);
}

export default RaiseAlarmCard;
