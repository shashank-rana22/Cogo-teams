import { Button } from '@cogoport/components';

import Layout from '../../../../../../RfqEnquiries/Layout';
import useCreateAdditionalRates from '../../../../../hooks/useCreateAdditionalRates';

import styles from './styles.module.css';

function AdditionalCharges({
	payload = {},
	charge = {},
	setAdditionalCharge = () => {},
	setChargeAdded = () => {},
	additionalService = {},
	message = {},
	containerDetails = {},
	filter = {},
	data = {},
	source = '',
	triggeredFrom = '',
}) {
	const {
		fields,
		errors,
		handleSubmit,
		handleData,
		onError,
		loading,
		control,
		showElements,
	} = useCreateAdditionalRates({
		triggeredFrom,
		payload,
		charge,
		setAdditionalCharge,
		setChargeAdded,
		additionalService,
		message,
		containerDetails,
		filter,
		data,
		source,
	});

	return (
		<div className={styles.layout_container}>
			<div>
				<Layout
					control={control}
					fields={fields}
					errors={errors}
					showElements={showElements}
				/>
			</div>
			<div className={styles.flex_container}>
				<Button
					onClick={() => {
						setAdditionalCharge(false);
					}}
					themeType="secondary"
					style={{ marginRight: 10 }}
				>
					SKIP
				</Button>
				<Button
					onClick={handleSubmit(handleData, onError)}
					disabled={loading}
					themeType="accent"
				>
					SAVE
				</Button>
			</div>
		</div>
	);
}
export default AdditionalCharges;
