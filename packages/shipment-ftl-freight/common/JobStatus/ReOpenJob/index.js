import { Button, Modal } from '@cogoport/components';
import { TextAreaController, UploadController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCFtick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import useListStakeholders from '@cogoport/surface-modules/hooks/useListShipmentStakeholders';
import { useState } from 'react';

import useIncidentReOpenJob from '../../../hooks/useIncidentReOpenJob';

import controls from './controls';
import styles from './styles.module.css';

const INPUT_MAPPING = {
	textarea : TextAreaController,
	file     : UploadController,
};

function ReOpenJob({
	showModal = false,
	setShowModal = () => { },
	shipmentData = {},
	incidentStatusRefetch = () => { },
}) {
	const { user_name = '' } = useSelector(({ profile }) => ({
		user_name: profile?.user?.name,
	}));

	const [isSuccess, setIsSuccess] = useState(false);

	const { data: stakeholderData } = useListStakeholders({
		shipment_id      : shipmentData?.id,
		stakeholder_type : 'booking_agent',
	});

	const { loading = false, onReOpenJob = () => {} } = useIncidentReOpenJob({
		shipmentData,
		setIsSuccess,
		incidentStatusRefetch,
		setShowModal,
	});

	const { formState: { errors }, handleSubmit, control } = useForm();

	return (
		<Modal
			size="md"
			show={showModal}
			onClose={() => setShowModal(loading)}
			placement="top"
			closeOnOuterClick={false}
		>
			<Modal.Header title="Request Incident" />

			{isSuccess ? (
				<Modal.Body className={styles.modal_success_body}>
					<IcCFtick width={40} height={40} />
					Request Submitted!
				</Modal.Body>
			) : (
				<>
					<Modal.Body className={styles.modal_body}>
						<div className={styles.details}>
							<div>
								<div className={styles.label}>Shipment ID</div>
								<span>{shipmentData?.serial_id || '--'}</span>
							</div>
							<div>
								<div className={styles.label}>Request By</div>
								<span>{user_name || '--'}</span>
							</div>
							<div>
								<div className={styles.label}>KAM</div>
								<span>{stakeholderData?.[GLOBAL_CONSTANTS.zeroth_index]?.user?.name || '--'}</span>
							</div>
						</div>

						{controls.map((item) => {
							const Component = INPUT_MAPPING[item.input_type];

							if (!Component) return null;

							return (
								<div key={item.name} className={styles.input_container}>
									<label>{item.label}</label>
									<span className={styles.required}>{item?.rules?.required ? ' *' : null}</span>
									<Component {...item} control={control} />
									<div className={styles.errors}>
										{errors?.[item.name]?.message || ''}
									</div>
								</div>
							);
						})}
					</Modal.Body>

					<Modal.Footer className={styles.modal_footer}>
						<Button
							themeType="secondary"
							size="md"
							onClick={() => setShowModal(false)}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button
							themeType="primary"
							size="md"
							onClick={handleSubmit(onReOpenJob)}
							disabled={loading}
							loading={loading}
						>
							Submit
						</Button>
					</Modal.Footer>
				</>
			)}
		</Modal>
	);
}

export default ReOpenJob;
