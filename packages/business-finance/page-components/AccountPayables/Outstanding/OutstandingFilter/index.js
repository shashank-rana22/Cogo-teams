import { Button, Input, Popover } from '@cogoport/components';
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
						<Button
							size="lg"
							onClick={() => setShowSortPopover(!showSortPopover)}
							themeType="tertiary"
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
						</Button>
					</Popover>
				</div>
				<Button
					size="lg"
					onClick={onFilters}
					themeType="tertiary"
				>
					<div
						className={styles.icon_div}
					>
						<IcMArrowRotateUp style={{ color: COLOR_MAP[orderBy?.order] }} />
						<IcMArrowRotateDown style={{ color: COLOR_MAP_UP[orderBy?.order] }} />
					</div>
				</Button>

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
