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
	renderDropdown?: (p:any) => JSX.Element | null ;
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
	renderDropdown = () => null,
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
	}:any = useSelector((state: object) => state);

	const { totalRecords = 0 } = itemData?.totalRecords || {};

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
				{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
					<div className={styles.card_container}>
						<CardColumn
							fields={fields}
							itemStyles={itemStyles}
							singleitem={singleitem}
							config={config}
							loading={loading}
							functions={commonFunctions(functions)}
							isMobile={isMobile}
						/>
						{renderDropdown(singleitem)}
					</div>
				))}
			</div>
			{showPagination && (
				<div>
					{totalRecords ? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
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
