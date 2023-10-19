import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useState } from 'react';

import List from '../../../commons/List';
import useListExpense from '../../hooks/useListExpense';
import configs from '../../utils/config';
import functions from '../getFunctions';

import styles from './styles.module.css';

const MAX_LOADERS = 3;

function VendorList(props) {
	const {
		filters = {}, moreData = false, vendorId = '', expenseType = '',
	} = props || {};

	const [pageIndex, setPageIndex] = useState(1);

	const { EXPENSE_CONFIG } = configs();

	const { getList = () => {}, listData = {}, listLoading = false } = useListExpense({ filters });

	const handlePageChange = (pageValue) => {
		setPageIndex(pageValue);
	};

	useEffect(() => {
		if (moreData) {
			getList({ vendorId, expenseType, pageIndex, pageSize: 5 });
		}
	}, [expenseType, getList, moreData, pageIndex, vendorId]);

	useEffect(() => {
		setPageIndex(1);
	}, [expenseType]);

	if (listLoading) {
		return (
			<div>
				{[...Array(MAX_LOADERS).keys()].map((key) => (
					<div key={key} className={styles.flex}>
						{[...Array(MAX_LOADERS).keys()].map((val) => (
							<Placeholder
								key={val}
								height="50px"
								width="32%"
								margin="8px"
							/>
						))}
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(listData?.list)) {
		return (
			<div className={styles.no_data}>
				<div>No data found</div>
				<img
					src={GLOBAL_CONSTANTS.image_url.no_data_found}
					alt="no data"
				/>
			</div>
		);
	}

	return (
		<List
			config={EXPENSE_CONFIG}
			itemData={listData}
			loading={listLoading}
			functions={functions}
			page={pageIndex}
			pageSize={5}
			handlePageChange={handlePageChange}
			showPagination
		/>
	);
}

export default VendorList;
