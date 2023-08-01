import { Popover, Pagination } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useListOmnichannelDocuments from '../../../../hooks/useListOmnichannelDocuments';
import useUpdateOmnichannelNewDocument from '../../../../hooks/useUpdateOmnichannelNewDocument';
import LoadingState from '../UserActivity/LoadingState';

import Filters from './Filters';
import ListData from './ListData';
import styles from './styles.module.css';
import UploadDetailsModal from './UploadDetailsModal';

const INIT_CNT = 0;

function Documents({
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab = 'message',
	customerId = '',
	documentsCount = 0,
	formattedMessageData = {},
}) {
	const [filterVisible, setFilterVisible] = useState(false);
	const [filters, setFilters] = useState('');
	const [showModal, setShowModal] = useState(false);

	const [singleItem, setSingleItem] = useState({});

	const { updateNewDocument: documentCountUpdates = () => {} } = useUpdateOmnichannelNewDocument({
		type: 'update_count',
	});

	const {
		list = [],
		loading = false,
		getDocumentsList = () => {},
		orgId = '',
		userId = '',
		userMobile = '',
		leadUserId = '',
		is_pan_uploaded = false,
		is_gst_uploaded = false,
		setPagination = () => {},
		pagination,
		totalDocumentCount = 0,
	} = useListOmnichannelDocuments({
		activeMessageCard,
		activeVoiceCard,
		activeTab,
		customerId,
		type: 'list',
		setFilterVisible,
	});

	useEffect(() => {
		const listIds = list.map((i) => i.id);
		if (!isEmpty(listIds) && documentsCount > INIT_CNT) {
			documentCountUpdates({ listIds });
		}
	}, [documentCountUpdates, documentsCount, list]);

	const handleFilters = () => {
		getDocumentsList(filters);
	};

	const handleReset = () => {
		setFilters('');
		getDocumentsList();
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
					isPanUploaded={is_pan_uploaded}
					isGstUploaded={is_gst_uploaded}
					userId={userId}
					userMobile={userMobile}
					leadUserId={leadUserId}
					formattedMessageData={formattedMessageData}
					getDocumentsList={getDocumentsList}
				/>

			)}
			{(!isEmpty(list)) ? (
				<div className={styles.pagination}>
					<Pagination
						currentPage={pagination}
						totalItems={totalDocumentCount}
						pageSize={10}
						onPageChange={(val) => setPagination(val)}
					/>
				</div>
			) : null}

			{showModal && (
				<UploadDetailsModal
					setShowModal={setShowModal}
					orgId={orgId}
					documentType={showModal}
					getDocumentsList={getDocumentsList}
					singleItem={singleItem}
					setSingleItem={setSingleItem}
					isPanUploaded={is_pan_uploaded}
					isGstUploaded={is_gst_uploaded}
				/>
			)}

		</>
	);
}

export default Documents;
