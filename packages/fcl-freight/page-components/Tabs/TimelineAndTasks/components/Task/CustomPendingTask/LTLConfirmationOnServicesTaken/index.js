import { useEffect } from 'react';
import useFormCogo from '@cogoport/front/hooks/useFormCogo';
import { Button } from '@cogoport/front/components/admin';
import FormLayout from '../../../../../commons/Layout';
import getControls from './controls';
import useBulkUpdate from './hooks/useBulkUpdate';
import useGetInvoicingParties from './hooks/useGetInvoicingParties';
import { ButtonWrap } from './styles';

const LTLConfirmationOnServicesTaken = ({
	task,
	refetch = () => {},
	onCancel = () => {},
	shipment_data,
}) => {
	const { handlePendingTask, handleBulkPayload, loading } = useBulkUpdate();
	const { data } = useGetInvoicingParties({ shipment_id: shipment_data?.id });

	const saveSubmit = async (val) => {
		const res = await handleBulkPayload({ val, task });
		if (res?.status === 200) {
			const taskRes = await handlePendingTask({ val, task });
			if (taskRes?.status === 200) {
				refetch();
				onCancel();
			}
		}
	};
	const controls = getControls();

	const {
		fields,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useFormCogo(controls);

	const paymentTerm = watch('payment_term');

	useEffect(() => {
		if (data?.invoicing_parties?.[0]?.billing_address?.tax_number === null) {
			setValue('payment_term', 'prepaid');
			setValue('payment_subterm', 'paid');
		}
	}, [data]);

	if (data?.invoicing_parties?.[0]?.billing_address?.tax_number === null) {
		fields.payment_term.disabled = true;
		fields.payment_subterm.disabled = true;
	}

	if (paymentTerm === 'prepaid') {
		fields.payment_subterm.options = [{ label: 'Paid', value: 'paid' }];
	} else if (paymentTerm === 'collect') {
		fields.payment_subterm.options = [
			{ label: 'TBB', value: 'tbb' },
			{ label: 'To Pay', value: 'to_pay' },
		];
	}

	const showElements = {
		payment_sub_term: !!paymentTerm,
	};

	return (
		<div>
			<FormLayout
				controls={controls}
				fields={fields}
				errors={errors}
				showElements={showElements}
			/>
			<ButtonWrap>
				<Button className="secondary md" onClick={() => onCancel()}>
					Cancel
				</Button>
				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(saveSubmit)}
				>
					Submit
				</Button>
			</ButtonWrap>
		</div>
	);
};
export default LTLConfirmationOnServicesTaken;
