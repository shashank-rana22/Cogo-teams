import { Button } from '@cogoport/components';

import useUpdateSpotNegotiationRate from '../../../../hooks/useUpdateSpotNegotiationRate';
import Layout from '../../../../Layout';

import styles from './styles.module.css';

function AddRate({
	service, setSubmittedEnquiry, setActiveService, selectedRate, selectedCard,
}) {
	const {
		fields, control, showElements = {}, errors, onError, handleSubmit, handleData, loading,
	} = useUpdateSpotNegotiationRate({
		service, setSubmittedEnquiry, setActiveService, selectedRate, selectedCard,
	});

	return (
		<>
			<Layout fields={fields} control={control} showElements={showElements} errors={errors} />
			<div className={styles.button}>
				<Button
					themeType="accent"
					disabled={loading}
					onClick={handleSubmit(handleData, onError)}
				>
					Submit

				</Button>
			</div>
		</>
	);
}
export default AddRate;
