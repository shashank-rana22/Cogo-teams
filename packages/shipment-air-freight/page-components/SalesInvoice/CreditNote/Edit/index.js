import { Modal, Button, cl, Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty, startCase } from '@cogoport/utils';
import { useContext } from 'react';

import useUpdateShipmentCreditNote from '../../../../hooks/useUpdateShipmentCreditNote';
import creditNoteControls from '../../helpers/creditNoteControls';
import generateDefaultValues from '../../helpers/generateDefaultValuesOfCreditNote';
import updateFormValueOfCreditNote from '../../helpers/updateFormValuesOfCreditNote';
import formatCreditNoteData from '../helpers/format-credit-note-data';

import Form from './Form';
import styles from './styles.module.css';

function Edit({
	setOpen = () => {},
	CN_STATUS_MAPPING = {},
	prevData = {},
	item = {},
	cnRefetch = () => {},
	invoiceData = {},
}) {
	const { shipment_data } = useContext(ShipmentDetailContext);
	const { live_invoice_number, status } = item || {};

	const services = item?.services || [];

	const servicesIDs = services?.map((_item) => _item?.service_id);

	const controls = creditNoteControls({
		services,
		isEdit: true,
	});

	const defaultValues = generateDefaultValues({ values: controls, prevData });

	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors = {} },
	} = useForm({ defaultValues });

	const formValues = watch();

	const updatedObj = updateFormValueOfCreditNote({ formValues });

	const afterRefetch = () => {
		cnRefetch();
		setOpen(false);
	};

	const { apiTrigger = () => { }, loading } = useUpdateShipmentCreditNote({
		refetch: afterRefetch,
	});

	const onCreate = (data) => {
		const { submit_data = {}, checkError = {} } = formatCreditNoteData({
			data,
			servicesIDs,
			invoice : item,
			invoiceData,
			isEdit  : true,
		});

		if (isEmpty(submit_data?.line_items)) {
			Toast.error('Line Items is required');
			return;
		}

		let isError = false;

		Object.keys(checkError).forEach((key) => {
			checkError[key]?.forEach((t) => {
				if (!isEmpty(t)) {
					isError = true;
				}
			});
		});

		if (isError === false) {
			apiTrigger(submit_data);
		}
	};

	return (
		<Modal
			show
			onClose={() => setOpen(false)}
			size="xl"
			closeOnOuterClick={false}
		>
			<Modal.Header
				title={(
					<header className={styles.heading}>
						EDIT CREDIT NOTE
						<div
							className={cl`${styles[CN_STATUS_MAPPING[status]]} ${styles.status_text
							}`}
						>
							{status === 'rejected' ? '!' : null}
							{startCase(CN_STATUS_MAPPING[status])}
						</div>
					</header>
				)}
			/>

			<Modal.Body>
				<div />
				<div className={styles.title}>
					<strong>
						{`SID ${shipment_data?.serial_id} - Invoice number -`}
						<span className={styles.underline}>{live_invoice_number}</span>
					</strong>
				</div>

				<div>
					<strong>Requested By</strong>
					<span>{` - ${item?.requested_by?.name}`}</span>
				</div>

				<div>
					<strong>Date - </strong>
					<span>
						{formatDate({
							date       : item?.created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>

				<Form
					prevData={prevData}
					controls={controls}
					defaultValues={updatedObj}
					errors={errors}
					control={control}
					setValue={setValue}
				/>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.button_wrapper}>
					<Button
						themeType="secondary"
						onClick={() => setOpen(false)}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button onClick={handleSubmit(onCreate)} disabled={loading}>
						Re-Apply
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default Edit;