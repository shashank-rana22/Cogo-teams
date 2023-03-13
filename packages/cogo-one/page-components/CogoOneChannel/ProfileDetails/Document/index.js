import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListOmnichannelDocuments from '../../../../hooks/useListOmnichannelDocuments';
import LoadingState from '../UserActivity/LoadingState';

import Filters from './Filters';
import ListData from './ListData';
import styles from './styles.module.css';
import UploadDetailsModal from './UploadDetailsModal';

function Documents({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
	setListIds = () => {},
}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState('');
	const [showModal, setShowModal] = useState(false);
	const {
		list = [],
		loading = false,
		documentsList = () => {},
		orgId = '',
	} = useListOmnichannelDocuments({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		customerId,
		type: 'list',
		setFilterVisible,
	});

	const handleFilters = () => {
		documentsList(filters);
	};

	const handleReset = () => {
		setFilters('');
		documentsList();
	};

	useEffect(() => {
		if (!isEmpty(list)) {
			setListIds(list.map((i) => i.id));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

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
						<IcMFilter
							width={20}
							height={20}
							onClick={() => setFilterVisible(!filterVisible)}
						/>
					</Popover>
					{!isEmpty(filters) && <div className={styles.filters_applied} />}
				</div>
			</div>

			{loading ? (
				<LoadingState />
			) : (
				<ListData
					list={list}
					orgId={orgId}
					setShowModal={setShowModal}
				/>
			)}

			{showModal && (
				<UploadDetailsModal
					setShowModal={setShowModal}
					orgId={orgId}
				/>
			)}
		</>
	);
}

export default Documents;
