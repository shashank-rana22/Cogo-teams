import { Button, Toast } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

const LAST_INDEX = -1;
const getFileName = (item) => item?.split('/')?.splice(LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

function UploadGatePass({
	primaryService = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { carting_order_details = {} } = primaryService || {};
	const { vehicle_number_details = {} } = carting_order_details || {};

	const { control = {}, handleSubmit = () => {} } = useForm();

	const routeBack = () => {
		refetch();
		onCancel();
	};

	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask({ routeBack });

	const onSubmit = (values) => {
		const documents = (Object.values(values) || []).reduce((prev, item) => {
			const { fileName = '', finalUrl = '' } = item || {};
			return [...prev, {
				document_type : 'gate_out_pass',
				file_name     : fileName || getFileName(item),
				document_url  : finalUrl || item,
				data          : {
					description: '',
				},
			}];
		}, []);

		const status = (documents || []).some((item) => !item?.document_url);

		const payload = {
			id   : task?.id,
			data : {
				documents,
			},
		};

		if (status) {
			Toast.error('Please upload all documents');
		} else {
			apiTrigger({ payload });
		}
	};

	return (
		<div className={styles.main_container}>
			<div>
				<div className={styles.heading}>Vehicle Number: </div>
				{(vehicle_number_details || []).map((item) => (
					<div
						key={item}
						className={styles.doc_card}
					>
						<div className={styles.vehicle_name}>
							{item?.vehicle_number}
						</div>
						<UploadController
							name={`upload_gate_pass_url_${item?.vehicle_number}`}
							key={`upload_gate_pass_url_${item?.vehicle_number}`}
							className="upload_controller_documents"
							control={control}
							rules={{
								required: {
									message: 'Document is required',
								},
							}}
						/>
					</div>
				))}
			</div>

			<div className={styles.submit_button}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className={styles.submit}
					onClick={handleSubmit(onSubmit)}
					disabled={loading || task?.status === 'completed'}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default UploadGatePass;
