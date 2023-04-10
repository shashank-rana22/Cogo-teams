import { useState, useEffect } from 'react';

import useGetColumns from '../../Columns';
import Filters from '../../Filters';
import UserTableData from '../../UserTableData';
import feedbackDataColumns from '../../../constants/feedback-data-columns';
import modalComoponentsMapping from '../../../constants/modal-components-mapping';

import styles from './styles.module.css';
import useListFiles from './useListFiles';

function UploadedFiles({
	activeTab, logType,
	modal = '',
	setModal = () => {},
}) {
	const [item, setItem] = useState({});
	const [refetchList, setRefetchList] = useState(false);

	const {
		data:uploadedFilesData = {},
		loading,
		params,
		setParams,
		setPage,
		refetchFiles,
	} = useListFiles({ logType });

	const { list = [], pagination_data = {} } = uploadedFilesData;
	const { total_count } = pagination_data;

	const columnsToShow = feedbackDataColumns.uploadedFiles;
	const columns = useGetColumns({
		columnsToShow,
		activeTab,
		setItem,
		setModal,
		source: 'uploaded_files',
	});

	const ModalComponent = modalComoponentsMapping[modal]?.Component;

	useEffect(() => {
		if (refetchList) {
			refetchFiles();
		}setRefetchList(false);
	}, [refetchFiles, refetchList]);

	return (
		<div className={styles.container}>
			<div style={{ marginTop: '16px' }}>
				<Filters
					source="uploaded_files"
					setParams={setParams}
					params={params}
				/>
			</div>
			<UserTableData
				columns={columns}
				loading={loading}
				list={list}
				pagination={params.Page}
				page_limit={params.PageLimit}
				setPagination={setPage}
				total_count={total_count}
			/>

			{modal
				&& (
					<ModalComponent
						item={item}
						setItem={setItem}
						modal={modal}
						setModal={setModal}
						refetchList={refetchList}
						setRefetchList={setRefetchList}
						logType="correction"
					/>
				)}
		</div>
	);
}

export default UploadedFiles;
