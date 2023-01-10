import { Button } from '@cogoport/components';

import useUpdateSpotNegotiationRate from '../../../../hooks/useUpdateSpotNegotiationRate';
import Layout from '../../../../Layout';

import styles from './styles.module.css';

function AddRate({
	service, setSubmittedEnquiry, setActiveService, selectedRate,
}) {
	const {
		fields, control, showElements = {}, errors, onError, handleSubmit, handleData,
	} = useUpdateSpotNegotiationRate({
		service, setSubmittedEnquiry, setActiveService, selectedRate,
	});

	return (
		<>
			<Layout fields={fields} control={control} showElements={showElements} errors={errors} />
			<div className={styles.button}>
				<Button themeType="accent" onClick={handleSubmit(handleData, onError)}>Submit</Button>
			</div>
		</>
	);
}
export default AddRate;
