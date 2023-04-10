import { Input, Popover } from '@cogoport/components';
import { IcMArrowRotateUp, IcMArrowRotateDown, IcMCross, IcMSearchdark } from '@cogoport/icons-react';
import { useState } from 'react';

import { GenericObject } from '../../../commons/Interfaces';
import { SEARCH_OPTIONS, SORTBY_OPTION } from '../../../constants/index';

import FilterpopOver from './FilterpopOver';
import styles from './styles.module.css';

interface OrderBy {
	key: string
	order: string,
	label: string
}

interface OutstandingFilterProps {
	handleChange: (p:string) => void,
	handleInputReset: () => void,
	setOrderBy: Function,
	orderBy: OrderBy,
	setParams: (p: object) => void;
	params: GenericObject,
	formFilters: GenericObject,
	setFormFilters: (p: object) => void;
	clearFilter: () => void;
	queryKey: string,
	setQueryKey: (p:string) => void,
}

function Filters({
	handleChange,
	handleInputReset,
	setOrderBy,
	orderBy,
	setParams,
	params,
	formFilters,
	setFormFilters,
	clearFilter,
	queryKey,
	setQueryKey,
}: OutstandingFilterProps) {
	const [showSortPopover, setShowSortPopover] = useState(false);

	const [showSearchPopover, setShowSearchPopover] = useState(false);

	const sortStyleAsc = orderBy.order === 'Asc' ? '#303B67' : '#BDBDBD';

	const sortStyleDesc = orderBy.order === 'Desc' ? '#303B67' : '#BDBDBD';

	let placeholder;
	if (queryKey === 'q') {
		placeholder = 'Search By Business Name/Pan Number';
	} else if (queryKey === 'tradePartySerialId') {
		placeholder = 'Search By Trade Party';
	} else if (queryKey === 'sageId') {
		placeholder = 'Search By Sage Organization Id';
	} else if (queryKey === 'organizationSerialId') {
		placeholder = 'Search By Serial Id';
	}
	const { search } = params || {};

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>
				<div className={styles.sort_container}>

					<Popover
						placement="bottom"
						render={(
							<div className={styles.styled_row}>
								{SORTBY_OPTION.map((item) => (
									<div
										className={styles.styled_col}
										onClick={() => {
											setOrderBy({
												key   : item.value,
												order : 'Desc',
												label : item.label,
											});
											setShowSortPopover(!showSortPopover);
											setParams({ ...params, page: 1 });
										}}
										role="presentation"
									>
										<div className={styles.tile_heading}>{item.label}</div>
									</div>
								))}
							</div>
						)}
					>
						<div
							style={{ display: 'flex', cursor: 'pointer' }}
							onClick={() => setShowSortPopover(true)}
							role="presentation"
						>
							Sort By:
							{' '}
							<div className={styles.filter_value}>
								{orderBy.label}
								{' '}
							</div>
						</div>
					</Popover>
					<div
						role="presentation"
						className={styles.icon_div}
						onClick={() => {
							setOrderBy((prev) => ({
								key   : prev.key,
								order : prev.order === 'Asc' ? 'Desc' : 'Asc',
								label : prev.label,
							}));
							setParams({ ...params, page: 1 });
						}}
					>
						<IcMArrowRotateUp style={{ color: sortStyleAsc }} />

						<IcMArrowRotateDown style={{ color: sortStyleDesc }} />
					</div>

				</div>
				<div className={styles.flex_wrap}>
					<div className={styles.sort_container}>
						<Popover
							placement="bottom"
							render={(
								<div className={styles.styled_row}>
									{SEARCH_OPTIONS.map((item) => (
										<div
											className={styles.styled_col}
											onClick={() => {
												setQueryKey(item?.value || 'q');
												setShowSearchPopover(!showSearchPopover);
												setParams({ ...params, page: 1 });
											}}
											role="presentation"
										>
											<div className={styles.tile_heading}>{item.label}</div>
										</div>
									))}
								</div>
							)}
						>
							<div
								style={{ display: 'flex', cursor: 'pointer' }}
								onClick={() => setShowSearchPopover(true)}
								role="presentation"
							>
								Searched By:
								{' '}
								<div className={styles.filter_value}>
									{placeholder?.replace('Search By ', '')}
									{' '}
								</div>
							</div>
						</Popover>
					</div>
					<div className={styles.flex_wrap}>
						<Input
							placeholder={placeholder}
							value={search}
							onChange={(e) => handleChange(e)}
							suffix={(
								<IcMCross
									onClick={handleInputReset}
									cursor="pointer"
									className={styles.icon_style}
								/>
							)}
							prefix={(
								<IcMSearchdark />
							)}
							className={styles.styled_input}
						/>
					</div>
					<FilterpopOver
						filters={formFilters}
						setFilters={setFormFilters}
						clearFilter={clearFilter}
					/>
				</div>
			</div>
		</div>
	);
}

export default Filters;
