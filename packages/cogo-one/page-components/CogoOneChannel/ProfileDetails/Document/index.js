import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useListOmnichannelDocuments from '../../../../hooks/useListOmnichannelDocuments';
import useUpdateOmnichannelNewDocument from '../../../../hooks/useUpdateOmnichannelNewDocument';
import LoadingState from '../UserActivity/LoadingState';

import Filters from './Filters';
import ListData from './ListData';
// import OptionsModal from './OptionsModal';
import styles from './styles.module.css';
import UploadDetailsModal from './UploadDetailsModal';

function Documents({
	activeMessageCard,
	activeVoiceCard,
	activeTab,
	customerId,
	documentCount = () => {},
	documents_count,
}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState('');
	const [showModal, setShowModal] = useState(false);

	const [singleItem, setSingleItem] = useState({});
	console.log('singleItem:', singleItem);

	const { updateNewDocument: documentCountUpdates = () => {} } = useUpdateOmnichannelNewDocument({
		type: 'update_count',
	});

	const updateFunc = (listIdsArr) => {
		if (!isEmpty(listIdsArr) && documents_count > 0) {
			documentCountUpdates({ documentCount, listIds: listIdsArr });
		}
	};

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
		updateFunc,
	});

	const handleFilters = () => {
		documentsList(filters);
	};

	const handleReset = () => {
		setFilters('');
		documentsList();
	};

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
					setSingleItem={setSingleItem}
				/>

			)}

			{showModal && (
				<UploadDetailsModal
					setShowModal={setShowModal}
					orgId={orgId}
					documentType={showModal}
					documentsList={documentsList}
					singleItem={singleItem}
					setSingleItem={setSingleItem}
				/>
			)}

		</>
	);
}

export default Documents;
