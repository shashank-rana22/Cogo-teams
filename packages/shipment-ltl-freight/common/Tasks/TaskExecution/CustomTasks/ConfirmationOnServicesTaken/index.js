import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect } from 'react';

import useGetInvoicePreference from '../../../../../hooks/useGetInvoicePreference';
import useUpdateBulkServices from '../../../../../hooks/useUpdateBulkServices';
import useUpdateTask from '../../../../../hooks/useUpdateTask';
import getDefaultValues from '../../utils/get-default-values';

import getControls from './controls';
import { formatBulkUpdateData, formatTaskData } from './formatData';
import styles from './styles.module.css';

function ConfirmationOnServicesTaken({
	task,
	taskListRefetch = () => {},
	onCancel = () => {},
	shipment_data,
}) {
	console.log('hereeee');
	const refetch = () => {
		taskListRefetch();
		onCancel();
	};
	const { data } = useGetInvoicePreference({ defaultFilters: { shipment_id: shipment_data.id } });
	const { loading : taskLoading, apiTrigger } = useUpdateTask({ refetch });
	const { loading : bulkLoading, bulkUpdate } = useUpdateBulkServices({});

	const saveSubmit = async (val) => {
		const bulkPayload = formatBulkUpdateData({ task, val });
		const taskPayload = formatTaskData({ task, val });
		await bulkUpdate(bulkPayload);
		await apiTrigger(taskPayload);
	};
	const controls = getControls();

	const defaultValues = getDefaultValues(controls);
	const {
		control,
		fields,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm({ defaultValues });

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
			<Layout
				control={control}
				fields={controls}
				errors={errors}
				showElements={showElements}
			/>
			<div className={styles.button_wrap}>
				<Button className="secondary md" onClick={() => onCancel()}>
					Cancel
				</Button>
				<Button
					className="primary md"
					disabled={taskLoading || bulkLoading}
					onClick={handleSubmit(saveSubmit)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
export default ConfirmationOnServicesTaken;
