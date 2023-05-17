import { Modal, Button, Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useEffect } from 'react';

import useGetShipmentCreditNote from '../../../../hooks/useGetShipmentCreditNote';
import useEditCreditNoteHelper from '../helpers/useEditCreditNoteHelper';

import Form from './Form';
import styles from './styles.module.css';

function Edit({
	setOpen,
	CNstatusMapping,
	serial_id,
	prevData,
	item = {},
	refetch = () => {},
	invoiceData = {},
}) {
	const { id, live_invoice_number, status } = item || {};

	const { data, loading } = useGetShipmentCreditNote({
		defaultParams: {
			id,
		},
	});

	const services = data?.services || [];

	const servicesIDs = services?.map((_item) => _item?.service_id);

	const {
		controls,
		defaultValues,
		onCreate,
		loading: updateLoading,
	} = useEditCreditNoteHelper({
		services,
		invoice : data,
		servicesIDs,
		isEdit  : true,
		invoiceData,
		setOpen,
		refetch,
	});

	const { handleSubmit, control, setValue, watch, formState: { errors = {} } } = useForm();

	const formValues = watch();

	useEffect(() => {
		if (defaultValues) {
			Object.keys(defaultValues).forEach((fieldName) => {
				if (!formValues[fieldName]) {
					setValue(fieldName, defaultValues[fieldName]);
				}
			});
		}
	}, [defaultValues, watch, setValue, formValues]);

	return (
		<Modal
			show
			onClose={() => setOpen(false)}
			size="xl"
		>
			<Modal.Header title={(
				<header className={styles.heading}>
					EDIT CREDIT NOTE
					<div className={`${styles[CNstatusMapping[status]]} ${styles.status_text}`}>
						{status === 'rejected' ? <div>!</div> : null}
						{startCase(CNstatusMapping[status])}
					</div>
				</header>
			)}
			/>

			<Modal.Body>
				{loading ? (
					<div className={styles.loader_wrapper}>
						<Loader />
					</div>
				) : (
					<>
						<div style={{ fontSize: 14 }}>
							<b>
								SID
								{serial_id}
						&nbsp;- Invoice number -
						&nbsp;
								<u>{live_invoice_number}</u>
							</b>
						</div>

						<div>
							<b>Requested By</b>
							<span>
								&nbsp;
								-
								{data?.requested_by?.name}
							</span>
						</div>
						<div>
							<b>Date</b>
							<span>
								&nbsp;
								-
								{formatDate({
									date       : data?.created_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									formatType : 'date',
								})}
							</span>
						</div>
						<Form
							data={data}
							invoiceData={invoiceData}
							prevData={prevData}
							controls={controls}
							defaultValues={defaultValues}
							errors={errors}
							control={control}
							setValue={setValue}
						/>
					</>
				)}
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_wrapper}>
					<Button themeType="secondary" onClick={() => setOpen(false)} disabled={updateLoading}>
						Cancel
					</Button>

					<Button onClick={handleSubmit(onCreate)} disabled={updateLoading}>
						Re-Apply
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default Edit;
