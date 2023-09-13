import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import controls from '../../../../configurations/update-status-modal-controls';
import useUpdateInventory from '../../../../hooks/useUpdateInventory';

import styles from './styles.module.css';

function UpdateStatusModal({
	item = {},
	showUpdateStatusModal = {},
	setShowUpdateStatusModal = () => {},
	listAPI = () => {},
}) {
	const { control, formState:{ errors = {} }, setValue, handleSubmit } = useForm();
	const {
		loading = false,
		handleUpdate = () => {},
	} = useUpdateInventory({ id: item?.id, setShowUpdateStatusModal, listAPI });

	useEffect(() => {
		const selectedServices = item?.services?.reduce((acc, service) => {
			if (service.serviceStatus === 'received') {
				acc.push(service.serviceName);
			}
			return acc;
		}, []);
		setValue('servicesSelected', selectedServices);
	}, [item?.services, setValue]);
	return (
		<Modal
			show={!isEmpty(Object.keys(showUpdateStatusModal))}
			onClose={() => setShowUpdateStatusModal({})}
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
					onClick={() => setShowUpdateStatusModal({})}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(handleUpdate)}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default UpdateStatusModal;
