import { Layout } from '@cogoport/air-modules';
import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useUpdateConfiguration from '../../../../hooks/useUpdateConfiguration';
import controls from '../AddZone/controls';

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
		watch,
		formState:{ errors = {} },
		setValue,
		handleSubmit,
	} = useForm();

	const formValues = watch();
	useEffect(() => {
		if (!isEmpty(editZone)) {
			setValue('zoneName', item?.zoneName);
			setValue('commodity', item?.commodity);
			setValue('aisles', item?.aisles);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editZone, setValue]);
	const {
		loading = false,
		onSubmit = () => {},
	} = useUpdateConfiguration({ id: item?.id, formValues, listAPI, setEditZone, warehouseLocationId });
	return (
		<Modal
			show={editZone}
			className={styles.modal_styled}
			placement="center"
			onClose={() => setEditZone(false)}
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
					onClick={() => setEditZone(false)}
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
