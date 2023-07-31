import { Checkbox, Pagination } from '@cogoport/components';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../../commons/EmptyStateDocs';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

interface GlobalInterface {
	page?: number;
	pageLimit?: number;
	accMode?: string;
	search?: string;
	date?: {
		startDate?: Date;
		endDate?: Date;
	};
	paymentDocumentStatus?: string;
	docType?: string;
	sortBy?: string;
	sortType?: string;
}

interface CustomInterface {
	data?: {
		list?: Array<{ id: string }>;
		page?: number;
		totalRecords?: number;
	};
	onPageChange?: (val: number) => void;
	refetch?: () => void;
	loading?: boolean;
	globalFilters?: GlobalInterface;
	setGlobalFilters?: React.Dispatch<React.SetStateAction<GlobalInterface>>;
	checkedRows?: string[];
	setCheckedRows?: React.Dispatch<React.SetStateAction<object>>;
}

function CustomTable(
	{
		data = {},
		onPageChange,
		refetch,
		loading,
		setGlobalFilters,
		globalFilters,
		checkedRows,
		setCheckedRows,
	}: CustomInterface,
) {
	const GET_STATUS = ['POSTED', 'CREATED', 'APPROVED', 'POSTING_FAILED'];

	const GET_ENTITY = Object.keys(ENTITY_FEATURE_MAPPING).filter(
		(key) => ENTITY_FEATURE_MAPPING[key]?.feature_supported?.includes('post_to_sage'),
	);

	const isCheckBoxAllowed = (item) => GET_STATUS.includes(item?.paymentDocumentStatus)
        && GET_ENTITY.includes(item?.entityType?.toString());

	const { list = [], page = 1, totalRecords = 0 } = data;
	const onChangeTableHeaderCheckbox = (event) => {
		event.stopPropagation();

		const listIds = (list || []).map(({ id }) => id);

		if (event.target.checked) {
			setCheckedRows([
				...checkedRows,
				...((list || [])
					?.filter((item) => isCheckBoxAllowed(item))
					.map(({ id }) => id) || []),
			]);
		} else {
			setCheckedRows([
				...(checkedRows.filter((idChecked) => !(listIds || []).includes(idChecked))),
			]);
		}
	};

	const onChangeTableBodyCheckbox = (event, item) => {
		event.stopPropagation();
		if (event.target.checked) {
			setCheckedRows([
				...checkedRows,
				item?.id,
			]);
		} else {
			setCheckedRows([
				...((checkedRows || []).filter(
					(Id) => Id !== item?.id,
				) || []),
			]);
		}
	};

	const getTableBodyCheckbox = (item) => {
		const isChecked = (checkedRows || []).includes(
			item?.id,
		);

		return isCheckBoxAllowed(item) ? (
			<Checkbox
				checked={isChecked}
				disabled={loading}
				onChange={(event) => onChangeTableBodyCheckbox(event, item)}
			/>
		) : null;
	};

	const isAllChecked = isEmpty((list || [])?.filter((item) => isCheckBoxAllowed(item)
	&& !checkedRows.includes(item?.id)));

	const showHeaderCheckbox = !isEmpty((list || [])?.filter((item) => isCheckBoxAllowed(item)));

	return isEmpty(list) ? (
		<EmptyStateDocs />
	) : (
		<div className={styles.table}>
			<Header
				setGlobalFilters={setGlobalFilters}
				globalFilters={globalFilters}
				onChangeTableHeaderCheckbox={onChangeTableHeaderCheckbox}
				isAllChecked={isAllChecked}
				showHeaderCheckbox={showHeaderCheckbox}
				loading={loading}
			/>
			<List
				list={list}
				refetch={refetch}
				loading={loading}
				getTableBodyCheckbox={getTableBodyCheckbox}
			/>
			<Pagination
				className={styles.pagination}
				currentPage={page}
				totalItems={totalRecords}
				pageSize={10}
				onPageChange={onPageChange}
			/>
		</div>
	);
}

export default CustomTable;
