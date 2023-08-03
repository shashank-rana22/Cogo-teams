import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from './controls';
import styles from './styles.module.css';
import useUploadDocument from './useUploadDoc';

function UploadDoc({
	task = {},
	shipment_data = {},
	refetch = () => {},
	clearTask,
}) {
	const formProps = useForm({ controls });

	const { control, formState: { errors }, handleSubmit } = formProps || {};

	const { uploadDocument, loading } = useUploadDocument({
		task,
		shipment_data,
		refetch,
		clearTask,
	});

	const handleFormSubmit = async (values) => {
		uploadDocument(values);
	};

	return (
		<div className={styles.container}>
			<Layout
				fields={controls}
				control={control}
				errors={errors}
			/>
			<div className={styles.button_div}>
				<Button onClick={handleSubmit(handleFormSubmit)} disabled={loading}>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default UploadDoc;
