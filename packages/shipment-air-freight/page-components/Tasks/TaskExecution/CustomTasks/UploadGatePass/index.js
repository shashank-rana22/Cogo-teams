import { Button, Loader } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';

import styles from './styles.module.css';

function UploadGatePass({
	primaryService = {},
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { carting_order_details = {} } = primaryService || {};
	const { vehicle_number_details = {} } = carting_order_details || {};
	const { control = {}, handleSubmit = () => {} } = useForm();

	const onSubmit = () => {

	};

	return (
		<div className={styles.main_container}>
			{loading ? <Loader /> : (
				<>
					<div className={styles.heading}>Vehicle Number: </div>
					{(vehicle_number_details || []).map((item) => (
						<div key={item?.vehicle_number} className={styles.doc_card}>
							<div>
								{item?.vehicle_number}
							</div>
							<UploadController
								name={`upload_gate_pass_url_${item?.vehicle_number}`}
								key={`upload_gate_pass_url_${item?.vehicle_number}`}
								className="upload_gate_pass_documents"
								control={control}
								rules={{
									required: {
										message: 'Document is required',
									},
								}}
							/>
						</div>
					))}
				</>
			)}

			<div className={styles.submit_button}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					// disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className={styles.submit}
					onClick={handleSubmit(onSubmit)}
					// disabled={loading || task?.status === 'completed'}
				>
					{/* {loading ? 'Submitting...' : 'Submit'} */}
					Submit
				</Button>
			</div>
		</div>
	);
}

export default UploadGatePass;
