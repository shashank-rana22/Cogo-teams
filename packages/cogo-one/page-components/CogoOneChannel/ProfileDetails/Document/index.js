import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useOmnichannelDocumentsList from '../../../../hooks/useOmnichannelDocumentsList';
import LoadingState from '../UserActivity/LoadingState';

import Filters from './Filters';
import ListData from './ListData';
import styles from './styles.module.css';

function Documents({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState('');
	const { data = {}, loading = false, documentsList = () => {}, orgId = '' } = useOmnichannelDocumentsList({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		customerId,
		setFilterVisible,
	});

	const handleFilters = () => {
		documentsList(filters);
	};

	const handleReset = () => {
		setFilters('');
		documentsList();
	};

	const { list = [] } = data || {};

	return (
		<>
			<div className={styles.header}>
				<div className={styles.title}>Documents</div>
				<div className={styles.filter_icon}>
					<Popover
						placement="left"
						disabled={loading}
						render={(
							<Filters
								setFilterVisible={setFilterVisible}
								filters={filters}
								setFilters={setFilters}
								handleFilters={handleFilters}
								handleReset={handleReset}
							/>
						)}
						visible={filterVisible}
						onClickOutside={() => setFilterVisible(false)}
					>

						<IcMFilter width={20} height={20} onClick={() => setFilterVisible(!filterVisible)} />
					</Popover>
					{!isEmpty(filters) && <div className={styles.filters_applied} />}
				</div>
			</div>

			{loading ? <LoadingState /> : <ListData list={list} orgId={orgId} />}

		</>
	);
}
export default Documents;
