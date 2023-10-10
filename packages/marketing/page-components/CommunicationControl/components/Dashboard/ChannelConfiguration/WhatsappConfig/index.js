import { useState } from 'react';

import TableView from '../../../../common/TableView';
import useGetCommunicationChannel from '../../../../hooks/useGetCommunicationChannel';
import useUpdateStatus from '../../../../hooks/useUpdateStatus';

import columns from './Columns';
import styles from './styles.module.css';

const PAGE_ONE = 1;

function WhatsappConfig() {
	const [pagination, setPagination] = useState(PAGE_ONE);

	const {
		data = {}, loading = true,
		getChannelConfig = () => {},
	} = useGetCommunicationChannel({ defaultParams: { channel: 'whatsapp' } });

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

	return (
		<div className={styles.container}>
			<TableView
				columns={cols}
				data={data}
				pagination={pagination}
				setPagination={setPagination}
				loading={loading}
			/>
		</div>
	);
}

export default WhatsappConfig;
