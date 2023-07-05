import { Pagination } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
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
	subActiveTab?: string;
	width?: string;
	rowStyle?: string;
	paginationType?: 'number' | 'table' | 'page' | 'compact';
}

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
	subActiveTab,
	width,
	rowStyle,
	paginationType = 'table',
}: Props) {
	const {
		showHeader = true,
		fields,
		headerStyles,
		itemStyles,
		bodyStyles,
		showHeaderCheckbox,
	} = config;
	const list = itemData?.list;

	const {
		general: { isMobile = false },
	}: any = useSelector((state: object) => state);

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
			<div style={bodyStyles}>
				{isEmpty(list) && !loading ? (
					<div className={styles.no_data}>
						<img
							style={{ width: '24%', margin: '8%' }}
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/no ressult found.svg"
							alt="no data"
						/>
					</div>
				) : (
					<div>
						{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
							<CardColumn
								key={singleitem.id}
								fields={fields}
								itemStyles={itemStyles}
								singleitem={singleitem}
								config={config}
								loading={loading}
								functions={commonFunctions(functions)}
								isMobile={isMobile}
								subActiveTab={subActiveTab}
								width={width}
								rowStyle={rowStyle}
							/>
						))}
					</div>
				)}
			</div>
			{showPagination && (
				<div>
					{itemData?.totalRecords ? (
						<div className={styles.pagination_container}>
							<Pagination
								type={paginationType}
								currentPage={page}
								totalItems={itemData?.totalRecords}
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
