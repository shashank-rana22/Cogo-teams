import { Layout } from '@cogoport/air-modules';
import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import getPaymentAccountsPayload from '../../../../helpers/getPaymentAccountsPayload';
import useGetEntities from '../../../../hooks/useGetEntities';
import useGetExchangeRate from '../../../../hooks/useGetExchangeRate';
import useRefundRequest from '../../../../hooks/useRefundRequest';

import getFormControls from './controls';
import styles from './styles.module.css';

const ONLINE_PAYMENT_OPTIONS = ['NEFT', 'RTGS'];

function UpdateRefundModal({
	updateRefundModal = {},
	setUpdateRefundModal = () => {},
}) {
	const { listEntities = {}, entitiesLoading = false } = useGetEntities();
	const { user_id } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const { currency = '' } = updateRefundModal?.data || {};

	const [billingParty, setBillingParty] = useState({});

	const controls = getFormControls({ listEntities, setBillingParty, currency });

	const {
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm({ defaultValues: { currency } });

	const formValues = watch();
	const { payment_mode: paymentMode = '' } = formValues || {};

	const {
		exchangeRateApiData = {},
		exchangeRateLoading = false,
	} = useGetExchangeRate({ billingParty, formValues, setValue });

	const {
		loading = false,
		apiTrigger = () => {},
	} = useRefundRequest({ setUpdateRefundModal });

	const onSubmit = () => {
		const payload = getPaymentAccountsPayload({
			exchangeRateApiData,
			billingParty,
			updateRefundModal,
			formValues,
			user_id,
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
			show={!isEmpty(updateRefundModal?.data)}
			onClose={() => setUpdateRefundModal({})}
		>
			<Modal.Header title="Update Refund Details" />
			<Modal.Body>
				<Layout
					control={control}
					fields={controls}
					errors={errors}
					showElements={showElements}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					disabled={loading || entitiesLoading || exchangeRateLoading || isEmpty(exchangeRateApiData)}
					onClick={handleSubmit(onSubmit)}
				>
					Submit

				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default UpdateRefundModal;
