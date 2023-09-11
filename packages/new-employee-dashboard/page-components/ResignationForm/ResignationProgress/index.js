/* eslint-disable max-len */
import React from 'react';

import SeparationForm from './SeparationForm';
import styles from './styles.module.css';
import TrackApplication from './TrackApplication';
import useSubmitResignationProgress from './useSubmitResignationProgress';

function ResignationProgress({ data = {} }) {
	const { handleSubmit, control, errors } = useSubmitResignationProgress({
		onSuccess: () => {
			// setShowModal(true);
		},
	});
	return (
		<div className={styles.main_container}>
			<TrackApplication handleSubmit={handleSubmit} control={control} errors={errors} data={data} />
			<SeparationForm />
		</div>
	);
}
export default ResignationProgress;
