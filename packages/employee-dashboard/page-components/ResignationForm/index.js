import React from 'react';

import ResignationFormLanding from './ResignationFormLanding';
import ResignationProgress from './ResignationProgress';
import useGetEmployeeApplicationProcessDetails from './useGetEmployeeApplicationProcessDetails';

function ResignationForm() {
	const { data, refetch = () => {} } = useGetEmployeeApplicationProcessDetails();

	const { application_exist } = data || {};

	if (application_exist) return <ResignationProgress data={data} />;

	return 	<ResignationFormLanding refetch={refetch} />;
}

export default ResignationForm;
