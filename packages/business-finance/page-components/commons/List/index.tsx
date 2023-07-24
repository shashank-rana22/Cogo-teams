import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
	idKey?: string;
	showId?: string;
	RenderAccordianData?: any;
	paginationType?: 'number' | 'table' | 'page' | 'compact';
}

function List({
	config = { fields: [] },
	sort = {},
	setSort = () => {},
	itemData = {},
	renderHeaderCheckbox = () => '',
	functions = {},
	loading = false,
	page = 1,
	handlePageChange = () => {},
	pageSize = 10,
	showPagination = true,
	showId = '',
	idKey = 'id',
	RenderAccordianData = () => null,
	subActiveTab = undefined,
	width = null,
	rowStyle = null,
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
							src={
								GLOBAL_CONSTANTS.image_url.list_no_result_found
							}
							alt="no data"
						/>
					</div>
				) : (
					(list || [1, 2, 3, 4, 5]).map((singleitem) => (
						<React.Fragment key={singleitem.id || singleitem}>
							<CardColumn
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
							{showId === singleitem?.[idKey] ? (
								<RenderAccordianData
									singleitem={singleitem}
								/>
							) : null}
						</React.Fragment>
					))
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
