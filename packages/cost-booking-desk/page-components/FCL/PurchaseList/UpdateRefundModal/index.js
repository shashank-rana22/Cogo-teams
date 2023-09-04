import { Modal, Button } from '@cogoport/components';
import {
	InputController,
	SelectController,
	UploadController,
	DatepickerController,
	useForm,
	TextAreaController,
} from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getPaymentAccountsPayload from '../../../../helpers/getPaymentAccountsPayload';
import useGetEntities from '../../../../hooks/useGetEntities';
import useGetExchangeRate from '../../../../hooks/useGetExchangeRate';
import useListPaymentAccounts from '../../../../hooks/useListPaymentAccounts';

import formControls from './controls';
import styles from './styles.module.css';

const controlTypeMapping = {
	text       : InputController,
	select     : SelectController,
	number     : InputController,
	upload     : UploadController,
	datepicker : DatepickerController,
	textarea   : TextAreaController,
};

const ONLINE_PAYMENT_OPTIONS = ['NEFT', 'RTGS'];

function FormElement({ name, label, type, errors, showElements, ...rest }) {
	const Element = controlTypeMapping[type];
	const show = !isEmpty(showElements[name]) ? showElements[name] : true;

	return (Element && show) ? (
		<div>
			<div className={styles.label}>{label}</div>
			<Element name={name} type={type} {...rest} />
			{errors[name] ? <div className={styles.errors}>{errors[name].message}</div> : null}
		</div>
	) : null;
}

function UpdateRefundModal({
	updateRefundModal = {},
	setUpdateRefundModal = () => {},
}) {
	const { listEntities = {}, entitiesLoading = false } = useGetEntities();

	const [billingParty, setBillingParty] = useState({});

	const controls = formControls({ listEntities, setBillingParty });

	const {
		handleSubmit,
		control,
		watch,
		formState: { errors },
	} = useForm();

	const formValues = watch();
	const { payment_mode: paymentMode = '' } = formValues || {};

	const {
		exchangeRateApiData = {},
		exchangeRateApiTrigger = () => {},
		exchangeRateLoading = false,
	} = useGetExchangeRate({ billingParty, formValues });

	const {
		loading = false,
		apiTrigger = () => {},
	} = useListPaymentAccounts({ setUpdateRefundModal, exchangeRateApiTrigger });

	const onSubmit = () => {
		const payload = getPaymentAccountsPayload({
			exchangeRateApiData,
			billingParty,
			updateRefundModal,
			formValues,
		});
		apiTrigger({ payload });
	};

	const showElements = {
		utr_number : ONLINE_PAYMENT_OPTIONS.includes(paymentMode),
		upload     : paymentMode === 'DEMAND_DRAFT',
	};

	return (
		<Modal
			className={styles.modal_container}
			show={!isEmpty(updateRefundModal)}
			onClose={() => setUpdateRefundModal({})}
		>
			<Modal.Header title="Update Refund Details" />
			<Modal.Body>
				{(controls || []).map((item) => (
					<FormElement
						key={item?.name}
						control={control}
						errors={errors}
						showElements={showElements}
						{...item}
					/>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button
					disabled={loading || entitiesLoading || exchangeRateLoading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit

				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default UpdateRefundModal;
