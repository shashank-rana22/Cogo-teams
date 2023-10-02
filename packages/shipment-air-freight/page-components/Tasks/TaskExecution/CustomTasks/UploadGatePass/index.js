import { Button, Loader, Toast } from '@cogoport/components';
import { UploadController, useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

const LAST_INDEX = -1;
const getFileName = (item) => item?.split('/')?.splice(LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

function UploadGatePass({
	primaryService = {},
	// shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { carting_order_details = {} } = primaryService || {};
	const { vehicle_number_details = {} } = carting_order_details || {};

	const { control = {}, handleSubmit = () => {}, watch = () => {} } = useForm();
	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch, onCancel });

	const formValues = watch();

	const onSubmit = () => {
		const documents = (Object.values(formValues) || []).reduce((prev, item) => {
			const { fileName = '', finalUrl = '' } = item || {};
			return isEmpty(item) ? Toast.error('Please upload all documents') : [...prev, {
				document_type : 'gate_out_pass',
				file_name     : !isEmpty(fileName) ? fileName : getFileName(item),
				document_url  : !isEmpty(finalUrl) ? finalUrl : item,
				data          : {
					description: '',
				},
			}];
		}, []);

		const payload = {
			id   : task?.id,
			data : {
				documents,
			},
		};

		apiTrigger({ payload });
	};

	return (
		<div className={styles.main_container}>
			{loading ? <Loader /> : (
				<div>
					<div className={styles.heading}>Vehicle Number: </div>
					{(vehicle_number_details || []).map((item) => (
						<div
							key={item?.vehicle_number}
							className={styles.doc_card}
						>
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
				</div>
			)}

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
