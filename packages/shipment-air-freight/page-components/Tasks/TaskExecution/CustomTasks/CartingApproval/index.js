import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import DocCard from './DocCard';
import useListShipmentDocuments from './hooks/useListShipmentDocuments';
import useUpdateShipmentPendingTask from './hooks/useUpdateShipmentPendingTask';
import styles from './styles.module.css';

const LAST_INDEX = -1;

const getFileName = (item) => item?.split('/')?.splice(LAST_INDEX)?.[GLOBAL_CONSTANTS.zeroth_index];

function CartingApproval({
	shipmentData = {},
	task = {},
	refetch = () => {},
	onCancel = () => {},
}) {
	const { control, handleSubmit, watch } = useForm();

	const { data = {}, loading: documentLoading = false } = useListShipmentDocuments({ shipmentData });
	const { loading = false, apiTrigger = () => {} } = useUpdateShipmentPendingTask({ refetch });

	const formValues = watch();

	const onSubmit = () => {
		const documents = (Object.values(formValues) || []).reduce((prev, item) => {
			const { fileName = '', finalUrl = '' } = item || {};
			return [...prev, {
				document_type : 'carting_order',
				file_name     : !isEmpty(fileName) ? fileName : getFileName(item),
				document_url  : !isEmpty(finalUrl) ? finalUrl : item,
				data          : {
					description: '',
				},
			}];
		}, []);

		const payload = {
			id   : task?.id,
			data : {
				documents,
			},
		};

		apiTrigger({ payload });
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.heading}>Uploaded Documents</div>
			<div className={styles.doc_container}>
				{(data?.list || []).map((item) => (
					<DocCard
						key={item?.id}
						item={item}
						control={control}
					/>
				))}
			</div>
			<div className={styles.submit_button}>
				<Button
					themeType="secondary"
					onClick={onCancel}
					disabled={loading || documentLoading}
				>
					Cancel
				</Button>
				<Button
					className={styles.submit}
					onClick={handleSubmit(onSubmit)}
					disabled={loading || documentLoading || task?.status === 'completed'}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</div>
		</div>
	);
}

export default CartingApproval;
