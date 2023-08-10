import { Button, Loader, Toast } from '@cogoport/components/';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';
import { useEffect } from 'react';

import useGetInvoicePreference from '../../../../../hooks/useGetInvoicePreference';
import updateTask from '../../../../../hooks/useUpdateTask';
import getDefaultValues from '../../utils/get-default-values';

import controls from './configs/controlsPaymentInfo';
import styles from './styles.module.css';
import { formatTaskData, validateData } from './utils/formatData';

function LTLAddPaymentInfo({
	shipment_data = {},
	onCancel = () => {},
	task = {},
	taskListRefetch = () => {},
}) {
	const { loading, data } = useGetInvoicePreference({ defaultParams: { shipment_id: shipment_data.id } });

	const refetch = () => {
		taskListRefetch();
		onCancel();
	};

	const { loading: taskLoading, apiTrigger } = updateTask({ refetch });

	const defaultValues = getDefaultValues(controls);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({ defaultValues });

	useEffect(() => {
		if (data) {
			const { invoicing_parties = [] } = data;
			const invoicingParties = invoicing_parties.map((invoicing_party) => ({
				invoice_number : invoicing_party?.live_invoice_number || '',
				currency       : invoicing_party?.invoice_total_currency,
				price          : invoicing_party?.invoicing_party_total_discounted,

			}));
			setValue('documents', invoicingParties);
		}
	}, [data, setValue]);

	const submitForm = async (val) => {
		if (validateData({ val })) {
			const finalPayload = formatTaskData({ task, val, shipment_data });
			apiTrigger(finalPayload);
		} else {
			Toast.error('Some Fields are empty');
		}
	};

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.loading_container}>
					<Loader />
				</div>
			) : null}

			<Layout fields={controls} control={control} errors={errors} />
			<div className={styles.button_container}>
				<Button themeType="secondary" size="md" onClick={() => onCancel()}>
					Cancel
				</Button>

				<Button
					themeType="primary"
					size="md"
					onClick={handleSubmit(submitForm)}
					disabled={loading || taskLoading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default LTLAddPaymentInfo;
