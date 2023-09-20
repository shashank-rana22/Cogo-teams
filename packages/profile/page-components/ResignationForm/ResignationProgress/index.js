import { Placeholder } from '@cogoport/components';
import React from 'react';

import ResignationFormLanding from '../ResignationFormLanding';

import styles from './styles.module.css';
import TrackApplication from './TrackApplication';
import useSubmitResignationProgress from './useSubmitResignationProgress';

function ResignationProgress({ data = {}, loading = false }) {
	const { handleSubmit, control, errors } = useSubmitResignationProgress();

	if (loading) {
		return (
			<>
				<Placeholder height="40px" width="100%" margin="0px 0px 20px 0px" />
				<Placeholder height="40px" width="100%" margin="0px 0px 20px 0px" />
			</>
		);
	}

	return (
		<div className={styles.main_container}>
			<TrackApplication handleSubmit={handleSubmit} control={control} errors={errors} data={data} />
			<ResignationFormLanding />
		</div>
	);
}
export default ResignationProgress;
