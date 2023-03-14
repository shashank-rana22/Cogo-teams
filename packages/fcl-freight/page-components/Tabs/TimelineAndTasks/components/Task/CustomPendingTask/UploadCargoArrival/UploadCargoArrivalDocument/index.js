import Layout from '@cogo/app-search/common/FormElement';
import { Button } from '@cogoport/front/components/admin';

import useCargoArrivalDocument from '../../../../../hooks/useCargoArrivalDocument';
import { Head } from './styles.js';

const UploadCargoArrivalDocument = ({
	pendingTask,
	refetch,
	setShowDocument,
	showDocument,
	clearTask,
}) => {
	const {
		handleSubmit,
		fields,
		errors,
		onError,
		submitDocument,
		control,
		loading,
	} = useCargoArrivalDocument({
		pendingTask,
		refetch,
		setShowDocument,
		showDocument,
		clearTask,
	});

	return (
		<>
			{showDocument ? (
				<>
					<Head>Upload Cargo Arrival Notice Document</Head>
					<Layout controls={control} fields={fields} errors={errors} />
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							style={{ height: '25px' }}
							onClick={handleSubmit(submitDocument, onError)}
							disabled={loading}
						>
							Submit
						</Button>
					</div>{' '}
				</>
			) : null}
		</>
	);
};

export default UploadCargoArrivalDocument;
