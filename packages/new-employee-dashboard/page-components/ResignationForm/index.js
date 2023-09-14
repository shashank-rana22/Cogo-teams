import React from 'react';

import ResignationFormLanding from './ResignationFormLanding';
import ResignationProgress from './ResignationProgress';
import useGetEmployeeApplicationProcessDetails from './useGetEmployeeApplicationProcessDetails';

const FORM_COMPONENT_MAPPING = {
	resignation_form     : ResignationFormLanding,
	resignation_progress : ResignationProgress,
};

function ResignationForm() {
	const { data } = useGetEmployeeApplicationProcessDetails();
	const Render = FORM_COMPONENT_MAPPING.resignation_progress;

	return (
		<div>
			<Render data={data} />
		</div>
	);
}

export default ResignationForm;
