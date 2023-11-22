import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useEffect } from 'react';

import Layout from '../../../common/Layout';
import useCreateOrganizationSettings from '../../../hooks/useCreateORganizationSettings';

import getControls from './controls';
import styles from './styles.module.css';

function Add({ show = false, setShow = () => {}, refetch = () => {} }) {
	const { apiTrigger, loading = false } = useCreateOrganizationSettings({
		refetch: () => { setShow(false); refetch(); },
	});

	const { control, handleSubmit, formState:{ errors = {} }, reset, setValue, watch } = useForm();

	const formValues = watch();

	const { validity_start_date } = formValues;

	const controls = getControls({ validity_start_date, setValue });

	const onSubmit = (data) => {
		apiTrigger(data);
	};

	// to reset all values when modal is closed/opened
	useEffect(() => {
		reset();
	}, [show, reset]);

	const onClose = () => {
		setShow(false);
	};

	return (
		<Modal
			show={show}
			placement="top"
			size="lg"
			onClose={onClose}
		>
			<Modal.Header title="Upload Rate Sheet" />

			<Modal.Body style={{ maxHeight: '500px', minHeight: '300px' }} className={styles.modal_body}>
				<Layout controls={controls} control={control} errors={errors} />
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.footer}>
					<div>
						<Button
							themeType="secondary"
							onClick={onClose}
							disabled={loading}
						>
							Cancel
						</Button>
					</div>

					<div>
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={loading}
						>
							Submit
						</Button>
					</div>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default Add;
