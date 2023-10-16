import { Button } from '@cogoport/components';

import Layout from '../../../../../../RfqEnquiries/Layout';
import useCreateAdditionalRates from '../../../../../hooks/useCreateAdditionalRates';

import styles from './styles.module.css';

function AdditionalCharges({
	payload = {},
	charge = {},
	setAdditionalCharge = () => {},
	getStats = () => {},
	getListCoverage = () => {},
	setChargeAdded,
	additionalService,
	message,
	containerDetails,
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
		payload,
		charge,
		setAdditionalCharge,
		setChargeAdded,
		additionalService,
		message,
		containerDetails,
		getStats,
		getListCoverage,
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
