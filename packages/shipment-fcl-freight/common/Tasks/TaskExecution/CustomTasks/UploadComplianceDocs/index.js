import { Loader } from '@cogoport/components';
import React from 'react';

import useGetSaasComplianceDocs from '../../../../../hooks/useGetSaasComplianceDocs';

import excludeDocs from './excludeDocsList';
import List from './List';

function UploadComplianceDocs({
	pendingTask = {},
	// onCancel = () => {},
	services = [],
	// taskListRefetch = () => {},
}) {
	console.log(pendingTask, 'pendingTask');
	console.log(services, 'services');
	const { docs, loading } = useGetSaasComplianceDocs();

	const EXCULDE_DOCS_LIST = excludeDocs.export?.map((item) => item.doc_code);

	const REQUIRED_DOCS = docs?.filter((doc) => !EXCULDE_DOCS_LIST.includes(doc?.docCode)
	&& doc?.tradeType === 'EXPORT');
	console.log(REQUIRED_DOCS, 'REQUIRED_DOCS');

	return loading ? (
		<Loader />
	) : (
		REQUIRED_DOCS?.map((item) => <List key={item?.docCode} item={item} />)
	);
}

export default UploadComplianceDocs;
