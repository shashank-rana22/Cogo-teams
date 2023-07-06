import { Table } from '@cogoport/components';
import { useRequest, useAthenaRequest } from '@cogoport/request';
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

	const [{ data = {}, loading = false }] = useRequest({
		url    : '/feedback_requests',
		method : 'get',
		params : {
			id,
			user_id: profile.user.id,
		},
	}, { manual: false });

	const DATA1 = {
		unique_leads_created_count     : 12,
		leads_updated_count            : 11,
		shipment_records_created_count : 10,
		processed_records_count        : 12,
		not_processed_records_count    : 12,
	};
	const DATA2 = [];

	Object.keys(DATA1).forEach((key) => {
		DATA2.push({ title: FILE_STATS_MAPPING[key], count: DATA1[key] });
	});

	if (isEmpty(DATA1) && !loading) {
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
		<Table columns={columns} data={DATA2} />
	);
}

export default FileData;
