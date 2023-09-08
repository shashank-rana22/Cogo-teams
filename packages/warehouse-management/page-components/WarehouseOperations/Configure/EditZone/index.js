import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import controls from '../../../../configurations/add-zone-controls';
import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';

import styles from './styles.module.css';

function EditZoneModal({
	item = {},
	editZone = {},
	setEditZone = () => {},
	listAPI = () => {},
	warehouseLocationId = '',
}) {
	const {
		control,
		formState:{ errors = {} },
		setValue,
		handleSubmit,
	} = useForm();

	useEffect(() => {
		if (!isEmpty(editZone)) {
			setValue('zoneName', item?.zoneName);
			setValue('commodity', item?.commodity);
			setValue('aisles', item?.aisles);
		}
	}, [editZone, item, setValue]);
	const {
		loading = false,
		onSubmit = () => {},
	} = useUpdateConfiguration({ id: item?.id, listAPI, setEditZone, warehouseLocationId });
	return (
		<Modal
			show={editZone}
			className={styles.modal_styled}
			placement="center"
			onClose={() => setEditZone({})}
			closeOnOuterClick
		>
			<Modal.Header title="Edit Zone" />
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
					onClick={() => setEditZone({})}
					themeType="secondary"
				>
					Cancel
				</Button>
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditZoneModal;
