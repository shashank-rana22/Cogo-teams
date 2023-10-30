import { Button, Input, Popover } from '@cogoport/components';
import {
	IcMArrowRotateUp,
	IcMArrowRotateDown,
	IcMAppSearch,
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

const SEARCH_WIDTH = 20;

function Filters({
	handleChange = () => { },
	handleInputReset = () => { },
	setOrderBy = () => { },
	orderBy = { key: '', order: '', label: '' },
	setParams = () => { },
	params = {},
	formFilters = {},
	setFormFilters = () => { },
	clearFilter = () => { },
	refetch = () => { },
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
									<Button
										size="lg"
										key={item.value}
										className={styles.buttons}
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
										themeType="tertiary"
									>
										<div
											className={styles.tile_heading}
										>
											{item.label}
										</div>
									</Button>
								))}
							</div>
						)}
					>
						<div className={styles.flexjustifiy}>
							<Button
								size="lg"
								onClick={() => setShowSortPopover(!showSortPopover)}
								themeType="tertiary"
							>
								Sort By:
								{' '}
								<div className={styles.filter_value}>
									{orderBy.label}

								</div>
							</Button>
						</div>
					</Popover>
					<div
						className={styles.icon_div}
						onClick={onFilters}
						role="presentation"
					>
						<IcMArrowRotateUp style={{ color: COLOR_MAP[orderBy?.order] }} />
						<IcMArrowRotateDown style={{ color: COLOR_MAP_UP[orderBy?.order] }} />
					</div>
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
					placeholder="BusinessName/Pan/Organization ID"
					value={search}
					onChange={(e) => handleChange(e)}
					suffix={(
						<IcMAppSearch
							onClick={handleInputReset}
							cursor="pointer"
							className={styles.icon_style}
							height={SEARCH_WIDTH}
							width={SEARCH_WIDTH}
						/>
					)}
					prefix={null}
					className={styles.styled_input}
				/>
			</div>
		</div>
	);
}

export default Filters;
