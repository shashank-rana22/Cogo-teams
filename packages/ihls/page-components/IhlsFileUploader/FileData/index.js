import { Table } from '@cogoport/components';
import { useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../commons/EmptyState';
import getConstants from '../../../config/getConstants';

import styles from './style.module.css';

const columns = [
	{ Header: '#', accessor: 'title' },
	{ Header: 'Count', accessor: 'count' },
];

function FileData({ id = null }) {
	const { profile = {} } = useSelector((state) => (state));
	const { FILE_STATS_MAPPING } = getConstants();

	const [{ data = {}, loading = false }] = useAthenaRequest({
		url    : '/athena/get_file_analytics',
		method : 'get',
		params : {
			file_id : id,
			user_id : profile.user.id,
		},
	}, { manual: false });

	const FILE_DATA = [];

	Object.keys(data).forEach((key) => {
		FILE_DATA.push({ title: FILE_STATS_MAPPING[key], count: data[key] });
	});

	if (isEmpty(FILE_DATA) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={200}
					width={360}
					emptyText="No records found"
					textSize="24px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<Table columns={columns} data={FILE_DATA} loading={loading} />
	);
}

export default FileData;
