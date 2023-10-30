import { Layout } from '@cogoport/air-modules';
import { Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import controls from './controls';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

const LAST_INDEX = -1;

const getFileName = (item) => item?.split('/')?.splice(LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

function CartingDetails({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { booking_reference_number = '' } = shipmentData || {};
	const { id = '' } = task || {};

	const routeBack = () => {
		refetch();
		onCancel();
	};

	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask({ routeBack });

	const { control = {}, errors = {}, handleSubmit = () => {} } = useForm();

	const onSubmit = (values) => {
		const { document_number = '', url = [] } = values || {};
		if (booking_reference_number !== document_number) {
			Toast.error('MAWB Number did not match');
			return;
		}

		const documents = (url || []).reduce((prev, item) => {
			const { fileName = '', finalUrl = '' } = item || {};
			return [...prev, {
				document_type : 'carting_order',
				file_name     : fileName || getFileName(item),
				document_url  : finalUrl || item,
				data          : {
					description: '',
				},
			}];
		}, []);

		const payload = {
			id,
			data: {
				documents,
			},
		};

		apiTrigger({ payload });
	};

	return (
		<div className={styles.main_container}>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			<div className={styles.submit_button}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={loading}
				>
					Cancel
				</Button>
				<Button
					className={styles.submit}
					onClick={handleSubmit(onSubmit)}
					disabled={loading || task?.status === 'completed'}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default CartingDetails;
