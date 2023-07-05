import { Table } from '@cogoport/components';
import { useRequest, useAthenaRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../commons/EmptyState';

import styles from './style.module.css';

const FILE_STATS_MAPPING = {
	unique_leads_created_count     : 'Unique Leads Created',
	leads_updated_count            : 'Leads Updated',
	shipment_records_created_count : 'Shipment Records Created',
	processed_records_count        : 'Processed Records',
	not_processed_records_count    : 'Not Processed Records',
};

function FileData({ id = '' }) {
	const { profile = {} } = useSelector((state) => (state));
	const [{ data = [], loading = false }] = useRequest({
		url    : '/feedback_requests',
		method : 'get',
		params : {
			id,
			user_id: profile?.user?.id,
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

	console.log(DATA1);

	Object.keys(DATA1).forEach((key) => {
		// console.log(key, obj[key]);
		DATA2.push({ title: FILE_STATS_MAPPING[key], count: DATA1[key] });
	});

	// Object.entries(DATA1).map(([key, values]) => {
	// 	DATA2.push({ title: key, value: values });
	// });

	const columns = [
		{ Header: '#', accessor: 'title' },
		{ Header: 'Count', accessor: 'count' },
	];

	if (isEmpty(DATA1) && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={280}
					width={440}
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
