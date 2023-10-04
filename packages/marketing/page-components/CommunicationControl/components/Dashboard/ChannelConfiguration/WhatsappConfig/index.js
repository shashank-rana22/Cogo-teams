import { Placeholder, Table } from '@cogoport/components';
import { useState } from 'react';

import TableView from '../../../../common/TableView';
import useGetCommunicationChannel from '../../../../hooks/useGetCommunicationChannel';
import useUpdateStatus from '../../../../hooks/useUpdateStatus';

import columns from './Columns';
import styles from './styles.module.css';

const PAGE_ONE = 1;

function WhatsappConfig() {
	const [pagination, setPagination] = useState(PAGE_ONE);

	const DEFAULT_PARAMS = {
		channel: 'whatsapp',
	};
	const {
		data = {}, loading = true,
		getChannelConfig = () => {},
	} = useGetCommunicationChannel({ DEFAULT_PARAMS });

	const {
		updateStatus = () => {},
		updateStatusLoading = '',
	} = useUpdateStatus({ getChannelConfig, channel: 'whatsapp' });

	const cols = columns({
		page      : data?.page,
		pageLimit : data?.page_limit,
		updateStatus,
		updateStatusLoading,
		getChannelConfig,
	});

	const loadingColumn = [
		{
			Header   : 'LOADING...',
			accessor : (item) => (
				<Placeholder key={item?.id} height="50px" />
			),
		},
	];

	return (
		<div className={styles.container}>
			{loading ? (
				<div className={styles.table_container}>
					<Table
						columns={loadingColumn}
						data={[{}, {}, {}]}
					/>
				</div>
			) : (
				<TableView
					columns={cols}
					data={data}
					pagination={pagination}
					setPagination={setPagination}
					loading={loading}
				/>
			)}
		</div>
	);
}

export default WhatsappConfig;
