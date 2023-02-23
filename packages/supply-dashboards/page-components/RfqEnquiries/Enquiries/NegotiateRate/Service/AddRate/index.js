import { Button } from '@cogoport/components';

import useUpdateSpotNegotiationRate from '../../../../hooks/useUpdateSpotNegotiationRate';
import Layout from '../../../../Layout';

import HeaderInformation from './HeaderInformation';
import LocalLabel from './LocalLabel';
import styles from './styles.module.css';

function AddRate({
	service, setSubmittedEnquiry, setActiveService, selectedRate, selectedCard, setRevertCounts,
}) {
	const {
		fields,
		control,
		showElements = {},
		errors,
		onError,
		handleSubmit,
		handleData,
		disableButton,
		requiredValues,
		setValue,
		data,
	} = useUpdateSpotNegotiationRate({
		service, setSubmittedEnquiry, setActiveService, selectedRate, selectedCard, setRevertCounts,
	});

	const newFields = fields.map((item) => {
		if (['destination_local', 'origin_local'].includes(item.name)) {
			return {
				...item,
				heading: data?.spot_negotiation_id ? (
					<LocalLabel
						label={item.heading}
						field={item}
						service={service}
						values={requiredValues}
						setValue={setValue}
					/>
				) : item.heading,
			};
		}
		return item;
	});

	return (
		<>
			<HeaderInformation serviceType={service?.service} requiredValues={requiredValues} service={service} />
			<Layout fields={newFields} control={control} showElements={showElements} errors={errors} />
			<div className={styles.button}>
				<Button
					themeType="accent"
					disabled={disableButton}
					onClick={handleSubmit(handleData, onError)}
				>
					Submit
				</Button>
			</div>
		</>
	);
}
export default AddRate;
