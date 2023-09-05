import { Button, Modal } from '@cogoport/components';
import { TextAreaController, UploadController, useForm } from '@cogoport/forms';
import { IcCFtick } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useIncidentReOpenJob from '../../hooks/useIncidentReOpenJob';

import controls from './controls';
import styles from './styles.module.css';

const INPUT_MAPPING = {
	textarea : TextAreaController,
	file     : UploadController,
};

function ReOpenJob({ showModal = false, setShowModal = () => { }, shipmentData = {} }) {
	const { user_name } = useSelector(({ profile }) => ({
		user_name: profile?.user?.name,
	}));
	const [isSuccess, setIsSuccess] = useState(false);

	const { loading = false, onReOpenJob = () => {} } = useIncidentReOpenJob({
		shipmentData,
		setIsSuccess,
	});
	const formControls = controls;

	const {
		formState: { errors },
		handleSubmit,
		control,
	} = useForm();

	const { serial_id = '' } = shipmentData || {};

	return (
		<form onSubmit={handleSubmit(onReOpenJob)}>
			<Modal
				size="md"
				show={showModal}
				onClose={() => setShowModal(!!loading)}
				placement="top"
				closeOnOuterClick={false}
			>
				<Modal.Header title="Request Incident" />

				{isSuccess ? (
					<Modal.Body className={styles.modal_success_body}>
						<IcCFtick width={40} height={40} />
						<h2>Request Submitted!</h2>
					</Modal.Body>
				) : (
					<Modal.Body className={styles.modal_body}>
						<div className={styles.details}>
							<div>
								<label>Shipment ID</label>
								<span>{serial_id}</span>
							</div>
							<div>
								<label>Request By</label>
								<span>{user_name}</span>
							</div>
							<div>
								<label>KAM</label>
								<span>Anmol Bansal</span>
							</div>
						</div>

						{formControls.map((item) => {
							const Component = INPUT_MAPPING[item.input_type];

							return (
								<div key={item.name}>
									<div className={styles.label}>{item.label}</div>
									<Component {...item} name={item.name} control={control} />
									<div className={styles.errors}>
										{errors[item.name]?.message}
									</div>
								</div>
							);
						})}
					</Modal.Body>
				)}

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
			</Modal>
		</form>
	);
}

export default ReOpenJob;
