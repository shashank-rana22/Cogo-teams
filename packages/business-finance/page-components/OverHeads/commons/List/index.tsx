import { Pagination } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React, { ReactNode } from 'react';

import {
	ConfigType,
	NestedObj,
	FunctionObjects,
	ListDataProps,
} from '../Interfaces/index';

import CardColumn from './CardColumn';
import Header from './CardHeader';
import commonFunctions from './commonFunctions';
import styles from './styles.module.css';

export interface Props {
	config: ConfigType;
	sort?: NestedObj;
	setSort?: React.Dispatch<React.SetStateAction<NestedObj>>;
	itemData: ListDataProps;
	renderHeaderCheckbox?: () => ReactNode | '';
	functions?: FunctionObjects;
	loading?: boolean;
	page?: number;
	handlePageChange?: (currentPage: number) => void;
	pageSize?: number;
	showPagination?: boolean;
	renderDropdown?: (p: any) => JSX.Element | null;
	showRibbon?: boolean;
}

export const toTitleCase = (str: string) => {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	return titleCase;
};

function List({
	config,
	sort,
	setSort,
	itemData,
	renderHeaderCheckbox,
	functions = {},
	loading = false,
	page = 1,
	handlePageChange = () => {},
	pageSize = 10,
	showPagination = true,
	renderDropdown = () => null,
	showRibbon = false,
}: Props) {
	const {
		showHeader = true,
		fields,
		headerStyles,
		itemStyles,
		bodyStyles,
		showHeaderCheckbox,
	} = config;
	const { totalRecords = 0, list } = itemData || {};

	const {
		general: { isMobile = false },
	}: any = useSelector((state: object) => state);

	const isListEmpty = !itemData || list?.length === 0;

	const myRibbonStyle = (status) => {
		if (status === 'ACCEPTED' || status === 'FINANCE_ACCEPTED') {
			return `${styles.ribbon} ${styles.ribbon_accepted}`;
		}
		if (status === 'INITIATED' || status === 'LOCKED') {
			return `${styles.ribbon} ${styles.ribbon_pending}`;
		}
		if (status === 'REJECTED' || status === 'FINANCE_REJECTED') {
			return `${styles.ribbon} ${styles.ribbon_rejected}`;
		}

		return `${styles.ribbon}`;
	};

	return (
		<section>
			{showHeader && !isMobile && (
				<Header
					fields={fields}
					sort={sort}
					setSort={setSort}
					headerStyles={headerStyles}
					showHeaderCheckbox={showHeaderCheckbox}
					renderHeaderCheckbox={renderHeaderCheckbox}
				/>
			)}
			{!isListEmpty || loading ? (
				<div style={bodyStyles}>
					{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
						<div
							className={styles.card_container}
							key={singleitem.key || singleitem}
						>
							<CardColumn
								fields={fields}
								itemStyles={itemStyles}
								singleitem={singleitem}
								config={config}
								loading={loading}
								functions={commonFunctions(functions)}
								isMobile={isMobile}
							/>
							{showRibbon ? (
								<div className={myRibbonStyle(singleitem?.status)}>
									{toTitleCase(singleitem?.status || '')}
								</div>
							) : null}
							{renderDropdown(singleitem)}
						</div>
					))}
				</div>
			) : (
				<div className={styles.no_data}>
					<img
						style={{ width: '24%', margin: '8%' }}
						src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no ressult found.svg"
						alt="no data"
					/>
				</div>
			)}
			{showPagination && (
				<div>
					{totalRecords ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={totalRecords}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</div>
					) : null}
				</div>
			)}
		</section>
	);
}

export default List;
