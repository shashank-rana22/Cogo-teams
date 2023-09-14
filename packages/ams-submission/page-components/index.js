import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EmptyState from '../common/EmptyState';
import getColumns from '../configurations/getColumns';
import useGetAmsData from '../hooks/useGetAmsData';

import ActionModal from './ActionModal';
import Header from './Header';
import styles from './styles.module.css';

const PAGE_LIMIT = 10;

function AmsSubmission() {
	const { t } = useTranslation(['amsSubmission']);

	const [activeTab, setActiveTab] = useState('tc_status_check');
	const [searchValue, setSearchValue] = useState('');
	const [modalData, setModalData] = useState({
		data : {},
		type : '',
	});

	const columns = getColumns({ t, activeTab, modalData, setModalData });

	const {
		data = {},
		loading = false,
		pagination = 1,
		setPagination = () => {},
	} = useGetAmsData({ activeTab });

	const { list = [], totalRecords } = data || {};

	return (
		<div className={styles.main_container}>
			<h1>{t('amsSubmission:header_data_submission')}</h1>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			<Table
				data={list}
				columns={columns}
				loading={loading}
				loadingRowsCount={PAGE_LIMIT}
			/>

			{!loading && isEmpty(list) ? <EmptyState /> : null}

			{list?.length >= PAGE_LIMIT
				? (
					<div className={styles.footer}>
						<Pagination
							type="table"
							currentPage={pagination}
							totalItems={totalRecords}
							pageSize={PAGE_LIMIT}
							onPageChange={setPagination}
						/>
					</div>
				) : null}

			{!isEmpty(modalData?.data) ? (
				<ActionModal
					modalData={modalData}
					setModalData={setModalData}
				/>
			) : null}
		</div>
	);
}

export default AmsSubmission;
