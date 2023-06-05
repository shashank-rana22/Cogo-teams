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
	const refetch = () => {
		taskListRefetch();
		onCancel();
	};
	const { data } = useGetInvoicePreference({ defaultParams: { shipment_id: shipment_data.id } });
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
			(controls || []).forEach((controlObj, index) => {
				if (['payment_term', 'payment_subterm'].includes(controlObj.name) === 'payment_term') {
					controls[index].disabled = true;
					controls[index].disabled = true;
				}
			});
		}
	}, [controls, data, setValue]);

	useEffect(() => {
		if (paymentTerm === 'prepaid') {
			(controls || []).forEach((controlObj, index) => {
				if (controlObj.name === 'payment_subterm') {
					controls[index].options = [{ label: 'Paid', value: 'paid' }];
				}
			});
		} else if (paymentTerm === 'collect') {
			(controls || []).forEach((controlObj, index) => {
				if (controlObj.name === 'payment_subterm') {
					controls[index].options = [
						{ label: 'TBB', value: 'tbb' },
						{ label: 'To Pay', value: 'to_pay' },
					];
				}
			});
		}
	}, [controls, paymentTerm, watch]);

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
			<div className={styles.button_container}>
				<Button themeType="secondary" size="md" onClick={() => onCancel()}>
					Cancel
				</Button>
				<Button
					themeType="primary"
					size="md"
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
