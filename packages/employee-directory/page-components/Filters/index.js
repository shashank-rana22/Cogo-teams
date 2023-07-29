import { Input, Select, Popover, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMAppSearch, IcMDoubleFilter, IcMArrowRotateDown } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import { SORT_OPTIONS } from '../utils/constants';

import BulkAction from './BulkAction';
import PopoverFilters from './PopoverFilters';
import styles from './styles.module.css';

const LAST_ELEMENT = 1;

function Filters({
	setBulkActions = () => {}, setSelectedIds = () => {},
	debounceQuery = () => {}, setFilters = () => {},
	filters = {}, totalEmployeeCount = 0,
	searchText = '',
	setSearchText = () => {},
	sortType = '',
	setSortType = () => {},
	setemployeeFilters = () => {},
	employeeFilters = {},
}) {
	const [openFilterPopover, setOpenFilterPopover] = useState(false);

	const { control, handleSubmit, reset } = useForm();

	const handleSearch = (e) => {
		setSearchText(e);
		debounceQuery(e);
	};

	const handleSort = (e) => {
		setSortType(e);
	};

	useEffect(() => {
		const isEmptySort = isEmpty(sortType);

		const splitStr = sortType.split('_');
		const sortTypeKey = splitStr[splitStr.length - LAST_ELEMENT];
		splitStr.pop();
		const sortByKey = splitStr.join('_');

		setFilters((prev) => ({
			...prev,
			sort_by   : isEmptySort ? undefined : sortByKey,
			sort_type : isEmptySort ? undefined : sortTypeKey,
		}));
	}, [setFilters, sortType]);

	return (
		<div className={styles.container}>
			<div className={styles.left_container}>

				<div className={styles.total_employees}>
					Total No. of Employees :
					{' '}
					<span className={styles.employee_no}>{totalEmployeeCount}</span>
				</div>

				<Input
					size="md"
					className={styles.search_input}
					suffix={<IcMAppSearch className={styles.search_icon} width={20} height={20} />}
					placeholder="Search via COGO-ID or Employee Name"
					onChange={(e) => handleSearch(e)}
					value={searchText}
				/>
			</div>
			<div className={styles.right_container}>

				<Select
					className={styles.sort_by}
					value={sortType}
					onChange={(e) => handleSort(e)}
					placeholder="Sort by"
					options={SORT_OPTIONS}
					isClearable
				/>

				<Popover
					placement="bottom"
					visible={openFilterPopover}
					onClickOutside={() => setOpenFilterPopover(false)}
					interactive
					render={(
						openFilterPopover && (
							<PopoverFilters
								setFilters={setFilters}
								setOpenFilterPopover={setOpenFilterPopover}
								filters={filters}
								control={control}
								handleSubmit={handleSubmit}
								reset={reset}
								setemployeeFilters={setemployeeFilters}
							/>
						)
					)}
				>
					<Button
						size="lg"
						themeType="secondary"
						className={styles.filters}
						onClick={() => setOpenFilterPopover(!openFilterPopover)}
					>
						<div className={styles.flex}>
							<span className={styles.filter_text}>
								Filter
							</span>
							<IcMDoubleFilter />
						</div>
						{!isEmpty(employeeFilters) && <div className={styles.filter_dot} />}
					</Button>
				</Popover>

				<Popover
					placement="bottom"
					render={(
						<BulkAction
							setBulkActions={setBulkActions}
							setSelectedIds={setSelectedIds}
						/>
					)}
				>
					<Button size="lg" themeType="secondary">
						<div className={styles.flex}>
							<span className={styles.filter_text}>
								Bulk Action
							</span>
							<IcMArrowRotateDown />
						</div>
					</Button>
				</Popover>
			</div>
		</div>
	);
}

export default Filters;
