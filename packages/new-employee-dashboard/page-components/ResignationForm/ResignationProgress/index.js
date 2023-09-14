/* eslint-disable max-len */
import React from 'react';

import ResignationFormLanding from '../ResignationFormLanding';

import styles from './styles.module.css';
import TrackApplication from './TrackApplication';
import useSubmitResignationProgress from './useSubmitResignationProgress';

function ResignationProgress({ data = {} }) {
	// console.log(data, 'data::');
	// const { application_exist } = data || {};
	const { handleSubmit, control, errors } = useSubmitResignationProgress({
		onSuccess: () => {
			// setShowModal(true);
		},
	});
	return (
		<div className={styles.main_container}>
			<TrackApplication handleSubmit={handleSubmit} control={control} errors={errors} data={data} />
			<ResignationFormLanding />
		</div>
	);
}
export default ResignationProgress;
