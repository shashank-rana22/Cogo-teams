import { Input, Popover } from '@cogoport/components';
import {
	IcMArrowRotateUp,
	IcMArrowRotateDown,
	IcMCross,
} from '@cogoport/icons-react';
import { useState } from 'react';

import { SORTBY_OPTION } from '../constants/sortByOptions';

import FilterpopOver from './FilterpopOver';
import styles from './styles.module.css';

const COLOR_MAP = {
	Asc  : '#303B67',
	Desc : '#BDBDBD',
};

const COLOR_MAP_UP = {
	Desc : '#303B67',
	Asc  : '#BDBDBD',
};

function Filters({
	handleChange = () => {},
	handleInputReset = () => {},
	setOrderBy = () => {},
	orderBy = { key: '', order: '', label: '' },
	setParams = () => {},
	params = {},
	formFilters = {},
	setFormFilters = () => {},
	clearFilter = () => {},
	refetch = () => {},
}) {
	const [showSortPopover, setShowSortPopover] = useState(false);

	const { search = '' } = params || {};

	const onFilters = () => {
		setOrderBy((prev) => ({
			key   : prev.key,
			order : prev.order === 'Asc' ? 'Desc' : 'Asc',
			label : prev.label,
		}));
		setParams({ ...params, page: 1 });
	};

	return (
		<div className={styles.filter_container}>
			<div className={styles.upper_sort_div}>
				<div className={styles.sort_container}>
					<Popover
						placement="bottom"
						render={(
							<div className={styles.styled_row}>
								{SORTBY_OPTION.map((item) => (
									<div
										key={item.value}
										className={styles.styled_col}
										onClick={() => {
											setOrderBy({
												key   : item.value,
												order : 'Desc',
												label : item.label,
											});
											setShowSortPopover(
												!showSortPopover,
											);
											setParams({
												...params,
												page: 1,
											});
										}}
										role="presentation"
									>
										<div
											className={styles.tile_heading}
										>
											{item.label}
										</div>
									</div>
								))}
							</div>
						)}
					>
						<div
							style={{ display: 'flex', cursor: 'pointer' }}
							onClick={() => setShowSortPopover(!showSortPopover)}
							role="presentation"
						>
							Sort By:
							{' '}
							<div className={styles.filter_value}>
								{orderBy.label}
								{' '}
								<div className={styles.sort_icon_style}>
									{showSortPopover ? (
										<IcMArrowRotateUp />
									) : (
										<IcMArrowRotateDown />
									)}
								</div>
							</div>
						</div>
					</Popover>
				</div>
				<div
					role="presentation"
					className={styles.icon_div}
					onClick={onFilters}
				>
					<IcMArrowRotateUp style={{ color: COLOR_MAP[orderBy?.order] }} />
					<IcMArrowRotateDown style={{ color: COLOR_MAP_UP[orderBy?.order] }} />
				</div>

				<FilterpopOver
					filters={formFilters}
					setFilters={setFormFilters}
					clearFilter={clearFilter}
					refetch={refetch}
				/>
			</div>
			<div className={styles.flex_wrap}>
				<Input
					placeholder="Search"
					value={search}
					onChange={(e) => handleChange(e)}
					suffix={
								search ? (
									<IcMCross
										onClick={handleInputReset}
										cursor="pointer"
										className={styles.icon_style}
									/>
								) : null
							}
					prefix={null}
					className={styles.styled_input}
				/>
			</div>
		</div>
	);
}

export default Filters;
