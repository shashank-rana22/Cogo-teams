import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import controls from './control';
import styles from './styles.module.css';
import useUpdateShipmentDocument from './useUpdateShipmentDocument';

function UpdateAirwayBill({
	updateAirwayBill,
	setUpdateAirwayBill,
	details,
	refetch,
}) {
	const doc_number = details?.data
		? JSON.parse(details?.data)?.document_number
		: undefined;

	const uploadAirwayControls = controls(doc_number);

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();

	const { updateApi, loading } = useUpdateShipmentDocument({
		details,
		setUpdateAirwayBill,
		refetch,
	});

	const onSubmit = (val) => {
		updateApi(val);
	};
	useEffect(() => {
		setValue('doc_number', doc_number);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [details]);

	return (
		<Modal
			show={updateAirwayBill}
			size="lg"
			onClose={() => setUpdateAirwayBill(false)}
			placement="top"
			style={{ padding: '20px' }}
		>
			<div className={styles.update_container}>
				<h4>Upload the airway bill</h4>
				<Layout
					fields={uploadAirwayControls}
					control={control}
					errors={errors}
				/>
				<div className={styles.button_container}>
					<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
						{loading ? 'Updating' : 'Update'}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
export default UpdateAirwayBill;
