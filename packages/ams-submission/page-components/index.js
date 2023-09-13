import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EmptyState from '../common/EmptyState';
import getColumns from '../configurations/getColumns';

import ActionModal from './ActionModal';
import Header from './Header';
import styles from './styles.module.css';

const PAGE_LIMIT = 10;

function AmsSubmission() {
	const { t } = useTranslation;

	const [activeTab, setActiveTab] = useState('tc_status_check');
	const [searchValue, setSearchValue] = useState('');
	const [modalData, setModalData] = useState({
		data : {},
		type : '',
	});

	const columns = getColumns({ t, activeTab, modalData, setModalData });
	const data = [
		{
			name  : 'hahhaa',
			label : 'hahahah',
			value : 'hahahah',
		},
		{
			name  : 'huihuihui',
			label : 'huihuihui',
			value : 'huihuihui',
		},
		{
			name  : 'hiahiahia',
			label : 'hiahiahia',
			value : 'hiahiahia',
		},
		{
			name  : 'hahhaa',
			label : 'hahahah',
			value : 'hahahah',
		},
		{
			name  : 'huihuihui',
			label : 'huihuihui',
			value : 'huihuihui',
		},
		{
			name  : 'hiahiahia',
			label : 'hiahiahia',
			value : 'hiahiahia',
		},
		{
			name  : 'hahhaa',
			label : 'hahahah',
			value : 'hahahah',
		},
		{
			name  : 'huihuihui',
			label : 'huihuihui',
			value : 'huihuihui',
		},
		{
			name  : 'hiahiahia',
			label : 'hiahiahia',
			value : 'hiahiahia',
		},
	];

	return (
		<div className={styles.main_container}>
			<h1>Electronic Data Submission</h1>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<Table
				data={data}
				columns={columns}
			/>
			{isEmpty(data) ? <EmptyState /> : null}
			{/* {data.length >= PAGE_LIMIT
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
				) : null} */}
			{!isEmpty(modalData) ? (
				<ActionModal
					modalData={modalData}
					setModalData={setModalData}
				/>
			) : null}
		</div>
	);
}

export default AmsSubmission;
