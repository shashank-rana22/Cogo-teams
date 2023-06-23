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
import EmptyState from '../StyledTable/EmptyState';

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
	renderDropdown?: (p:any) => JSX.Element | null ;
}

interface StateInterface {
	general?: {
		isMobile?: boolean;
	};
}

function CustomList({
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
	const { totalRecords = 0, list } = itemData || {};

	const {
		general: { isMobile = false },
	} = useSelector((state: StateInterface) => state);

	const isListEmpty = isEmpty(itemData) || isEmpty(list);

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
				<>
					<div style={bodyStyles}>
						{(list || [1, 2, 3, 4, 5]).map((singleitem) => (
							<div className={styles.card_container} key={singleitem?.id}>
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
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={totalRecords}
							pageSize={pageSize}
							onPageChange={handlePageChange}
						/>
					</div>
				</>
			) : (
				<div className={styles.no_data}>
					<EmptyState imageFind="NoDataFound" />
				</div>
			)}

		</section>
	);
}

export default CustomList;
