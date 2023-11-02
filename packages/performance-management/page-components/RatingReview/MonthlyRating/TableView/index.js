import { Input, Table, Button, Pagination, Modal, Checkbox } from '@cogoport/components';
// import { AsyncSelect } from '@cogoport/forms';
// import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMAppSearch, IcMArrowRotateRight, IcMError } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from './EmptyState';
import getColumns from './getColumns';
import styles from './styles.module.css';
import useTableView from './useTableView';

// const india_country_id = GLOBAL_CONSTANTS.country_ids.IN;
// const vietnam_country_id = GLOBAL_CONSTANTS.country_ids.VN;

// const india_constants = getCountryConstants({ country_id: india_country_id });
// const vietnam_constants = getCountryConstants({ country_id: vietnam_country_id });

// const OFFICE_LOCATIONS = [...india_constants.office_locations, ...vietnam_constants.office_locations];

// const REPORTING_CITY_OPTIONS = OFFICE_LOCATIONS.map((location) => (
// 	{ label: startCase(location), value: startCase(location) }));

function TableView({
	list = [],
	loading = false,
	paginationData = {},
	page = 1,
	setPage = () => {},
	search = '',
	setSearch = () => {},
	// location = '',
	// setLocation = () => {},
	// department = '',
	// setDepartment = () => {},
	props = '',
	showUnrated = false,
	setShowUnrated = () => {},
	refetch = () => {},
}) {
	const isVerticalHead = props?.activeTab === 'vertical_head' && props?.level === 'vertical_head';

	const {
		rating,
		setRating,
		feedback,
		setFeedback,
		showModal,
		setShowModal,
		onSubmitFinalRating,
		updateApiLoading,
		handleAllSelect,
		handleSelectId,
		selectedEmployees,
		setSelectedEmployees,
		setIsAllSelected,
		isAllSelected,
	} = useTableView({ props, refetch, list, isVerticalHead });

	const handleUnrated = () => {
		setShowUnrated((pv) => !pv);
		setPage(GLOBAL_CONSTANTS.one);
	};

	const handleRatingUpdate = async (item) => {
		const ratingData = {
			employee_id          : item.id,
			rating               : rating?.[item.id]?.value,
			comments             : feedback?.[item.id]?.value || '',
			reporting_manager_id : item.reporting_manager_id,
		};
		onSubmitFinalRating(false, ratingData);
	};

	const handleAllEmployeeSelect = (e) => {
		setSelectedEmployees([]);
		setIsAllSelected(e.target.checked);
	};

	const handleSearch = (e) => {
		setPage(GLOBAL_CONSTANTS.one);
		setSearch(e);
	};

	const columns = getColumns({
		rating,
		setRating,
		feedback,
		setFeedback,
		props,
		handleAllSelect,
		handleSelectId,
		selectedEmployees,
		list,
		handleRatingUpdate,
	});

	const { page_limit, total_count, total_unrated_employees } = paginationData || {};

	return (
		<div className={styles.container}>
			<div className={styles.filters}>
				<div className={styles.employee_filters}>
					{/* <AsyncSelect
						placeholder="Department"
						value={department}
						onChange={setDepartment}
						isClearable
						initialCall
						asyncKey="list_employee_departments"
						style={{ width: 200 }}
					/> */}

					{/* <Select
						options={REPORTING_CITY_OPTIONS}
						value={location}
						size="sm"
						onChange={setLocation}
						style={{ width: 200 }}
						placeholder="Location"
						isClearable
					/> */}
				</div>

				<Input
					value={search}
					onChange={(e) => handleSearch(e)}
					placeholder="Search Name/Email"
					prefix={<IcMAppSearch />}
					style={{ width: 300 }}
				/>
			</div>

			{isVerticalHead && !isEmpty(list) && (
				<div className={styles.checkbox_container}>
					<Checkbox
						label={`Select All ${total_count} Employees`}
						checked={isAllSelected}
						onChange={(e) => handleAllEmployeeSelect(e)}
					/>
				</div>
			)}

			<div className={styles.table_container}>
				{isEmpty(list) && !loading
					? <EmptyState />
					: <Table columns={columns} data={list} loading={loading} />}

				{total_count > page_limit ? (
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Pagination
							type="number"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={setPage}
						/>
					</div>
				) : null}
			</div>

			<div className={styles.bottom_banner}>
				<div className={styles.banner_text}>
					{showUnrated
						? 'Showing unrated employees.'
						: `${total_unrated_employees} Employees have not been rated.`}
					<div
						role="presentation"
						className={styles.link_text}
						onClick={handleUnrated}
					>
						{!showUnrated ? 'Show unrated employees' : 'Remove filter'}
					</div>
				</div>

				{!isEmpty(list) && (
					<Button
						onClick={() => setShowModal(true)}
						disabled={isVerticalHead && !isAllSelected && isEmpty(selectedEmployees)}
					>
						{`${isVerticalHead ? 'Publish' : 'Send'} Ratings`}
						<IcMArrowRotateRight
							height="16px"
							width="16px"
							style={{ marginLeft: 4 }}
						/>
					</Button>
				)}
			</div>

			<Modal
				show={showModal}
				size="sm"
				placement="center"
				onClose={() => setShowModal(false)}
			>
				<Modal.Body>
					<div className={styles.icon_container}>
						<IcMError width="40px" height="40px" color="#C26D1A" />
					</div>
					<div className={styles.modal_text}>
						Ratings once sent can not be edited. Are you sure you want to proceed?
					</div>
				</Modal.Body>

				<Modal.Footer>
					<div className={styles.button_container}>
						<Button
							themeType="secondary"
							onClick={() => setShowModal(false)}
							style={{ marginRight: 8 }}
							disabled={updateApiLoading}
						>
							Cancel
						</Button>

						<Button
							themeType="accent"
							onClick={() => onSubmitFinalRating(isVerticalHead)}
							disabled={updateApiLoading}
						>
							Yes, Proceed
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TableView;
