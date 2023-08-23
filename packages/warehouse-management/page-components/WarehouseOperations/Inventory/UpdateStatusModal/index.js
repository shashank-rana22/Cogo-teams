import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import useUpdateInventory from '../../../../hooks/useUpdateInventory';

import controls from './controls';
import styles from './styles.module.css';

function UpdateStatusModal({
	item = {},
	showUpdateStatusModal = '',
	setShowUpdateStatusModal = () => {},
	listAPI = () => {},
}) {
	const { control, formState:{ errors = {} }, watch, setValue } = useForm();
	const formValues = watch();
	const {
		loading,
		handleUpdate,
	} = useUpdateInventory({ id: item?.id, formValues, setShowUpdateStatusModal, listAPI });

	useEffect(() => {
		const selectedServices = item?.services.reduce((acc, service) => {
			if (service.serviceStatus === 'received') {
				acc.push(service.serviceName);
			}
			return acc;
		}, []);
		setValue('servicesSelected', selectedServices);
	}, [item?.services, setValue]);
	return (
		<Modal
			show={showUpdateStatusModal}
			onClose={() => setShowUpdateStatusModal(false)}
		>
			<Modal.Header title="Update Inventory Status" />
			<Modal.Body>
				<Layout
					fields={controls}
					control={control}
					errors={errors}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className={styles.cancel_button}
					onClick={() => setShowUpdateStatusModal(false)}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleUpdate}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateStatusModal;
