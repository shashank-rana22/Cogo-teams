import { Modal, Button, Loader, cl } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useEffect, useContext } from 'react';

import useGetShipmentCreditNote from '../../../../hooks/useGetShipmentCreditNote';
import editCreditNoteHelper from '../helpers/editCreditNoteHelper';

import Form from './Form';
import styles from './styles.module.css';

function Edit({
	setOpen = () => {},
	CN_STATUS_MAPPING,
	prevData = {},
	item = {},
	cnRefetch = () => {},
	invoiceData = {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const { id, live_invoice_number, status } = item || {};

	const { data, loading } = useGetShipmentCreditNote({ defaultParams: { id } });

	const services = data?.services || [];

	const servicesIDs = services?.map((_item) => _item?.service_id);

	const {
		controls,
		defaultValues,
		onCreate,
		loading: updateLoading,
	} = editCreditNoteHelper({
		services,
		invoice : data,
		servicesIDs,
		invoiceData,
		setOpen,
		refetch : cnRefetch,
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

	const updatedObj = {};

	Object.entries(formValues).forEach(([key, value]) => {
		switch (key) {
			case 'remarks':
			case 'uploadDocument':
				updatedObj[key] = value;
				break;
			default:
				updatedObj[key] = value?.map((_item) => ({
					..._item,
					total: _item.price_discounted * _item.quantity,
				}));
				break;
		}
	});

	return (
		<Modal
			show
			onClose={() => setOpen(false)}
			size="xl"
			closeOnOuterClick={false}
		>
			<Modal.Header title={(
				<header className={styles.heading}>
					EDIT CREDIT NOTE
					<div className={cl`${styles[CN_STATUS_MAPPING[status]]} ${styles.status_text}`}>
						{status === 'rejected' ? <div>!</div> : null}
						{startCase(CN_STATUS_MAPPING[status])}
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
						<div className={styles.title}>
							<b>
								{`SID ${shipment_data?.serial_id} - Invoice number -`}
								<u>{live_invoice_number}</u>
							</b>
						</div>

						<div>
							<b>Requested By</b>
							<span>
								{` - ${data?.requested_by?.name}`}
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
							defaultValues={updatedObj}
							errors={errors}
							control={control}
							setValue={setValue}
						/>
					</>
				)}
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_wrapper}>
					<Button themeType="tertiary" onClick={() => setOpen(false)} disabled={updateLoading}>
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
