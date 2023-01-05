import { Button } from '@cogoport/components';

import useUpdateSpotNegotiationRate from '../../../../hooks/useUpdateSpotNegotiationRate';
import Layout from '../../../../Layout';

import styles from './styles.module.css';

function AddRate({ service }) {
	const {
		fields, control, showElements = {}, register, errors, onError, handleSubmit, handleData,
	} = useUpdateSpotNegotiationRate({ service });

	return (
		<>
			<Layout fields={fields} control={control} showElements={showElements} register={register} errors={errors} />
			<div className={styles.button}>
				<Button themeType="accent" onClick={handleSubmit(handleData, onError)}>Submit</Button>
			</div>
		</>
	);
}
export default AddRate;
