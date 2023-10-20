import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import React from 'react';

import createLeadControls from '../../../../../configurations/create-lead-user-control';
import useCreateOnboardLeadOrg from '../../../../../hooks/useCreateOnboardLeadOrg';
import { getFieldController } from '../../../../../utils/getFieldController';

import styles from './styles.module.css';

function CreateLeadAccount({
	createLeadModal = false,
	setCreateLeadModal = () => {},
	getOrganizationUsers = () => {},
}) {
	const geo = getGeoConstants();

	const {
		control,
		handleSubmit = () => {},
		formState: { errors },
		reset,
		watch,
	} = useForm({
		defaultValues: {
			mobile_number: { country_code: geo.country.mobile_country_code },
		},
	});

	const formValues = watch();

	const formControls = createLeadControls({ formValues });

	const { loading = false, createLeadUser = () => {} } = 	useCreateOnboardLeadOrg({
		setCreateLeadModal,
		reset,
		getOrganizationUsers,
	});

	const handleClick = (values) => {
		createLeadUser(values);
	};

	const handleClose = () => {
		reset();
		setCreateLeadModal(false);
	};

	return (
		<Modal
			size="md"
			show={createLeadModal}
			onClose={handleClose}
			closeOnOuterClick={handleClose}
			placement="top"
			className={styles.modal_container}
		>
			<Modal.Header title="Create Lead Account" />
			<Modal.Body>
				{formControls?.map((item) => {
					const { label = '', name = '', controlType = '' } = item;

					const Element = getFieldController(controlType);

					if (!Element) {
						return null;
					}

					return (
						<React.Fragment key={name}>
							<div className={styles.label}>{label}</div>
							<Element
								{...item}
								control={control}
								error={errors?.[name]}
							/>
							<div className={styles.error_text}>
								{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
							</div>
						</React.Fragment>
					);
				})}
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="tertiary"
					disabled={loading}
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="primary"
					onClick={handleSubmit(handleClick)}
					loading={loading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateLeadAccount;
