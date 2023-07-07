import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../commons/EmptyState';

import columns from './getFileDataColumns';
import styles from './style.module.css';
import useGetFileData from './useGetFileData';

function FileData({ id = null }) {
	const { data, loading } = useGetFileData({ file_id: id });

	if (isEmpty(data) && !loading) {
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
		<Table columns={columns} data={data} loading={loading} />
	);
}

export default FileData;
