import { useRequest, useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import React, { useState } from 'react';

import FileList from './FileList';
import Header from './Header';

function IhlsFileUploader() {
	const { profile = {} } = useSelector((state) => (state));

	const [params, setParams] = useState({
		page      : 1,
		per_page  : 10,
		sort_by   : 'created_at',
		sort_type : 'asc',
		user_id   : profile.user.id,
	});

	const [{ data = [], loading = false }, refetch] = useRequest({
		url    : '/feedback_requests',
		method : 'get',
		params,
	}, { manual: false });

	return (
		<div>
			<Header refetch={refetch} />

			<FileList params={params} setParams={setParams} data={data} loading={loading} />
		</div>
	);
}

export default IhlsFileUploader;
