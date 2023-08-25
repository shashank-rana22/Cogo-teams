import {
	Tabs, TabPanel, Input, Pagination, Toggle, Button, Select, Popover,
} from '@cogoport/components';
import { useDispatch, useSelector } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../StyledTable';

import BulkActionPopOverContent from './BulkActionPopOverContent';
import FilterPopover from './FilterPopover';
import styles from './styles.module.css';
import useRejectAction from './useRejectAction';
import useTableView from './useTableView';

const TOTAL_COUNT = 10;
const INITIAL_TOTAL_COUNT = 0;
const INITIAL_PAGE = 1;
const PAGE_LIMIT_OPTIONS = [
	{ label: 10, value: 10 },
	{ label: 50, value: 50 },
	{ label: 100, value: 100 },
	{ label: 200, value: 200 },
];

function TableView() {
	const profileData = useSelector(({ profile }) => profile);
	const dispatch = useDispatch();

	const { btnloading, updateEmployeeStatus } = useRejectAction();
	const [bulkAction, setBulkAction] = useState(false);
	const [selectedIds, setSelectedIds] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [showPopOver, setShowPopOver] = useState(false);

	const {
		columns, loading, list, setActiveTab, setSearch, search,
		activeTab, data, setPage, page, filters, setFilters, pageLimit, setPageLimit,
	} = useTableView({ btnloading, updateEmployeeStatus, bulkAction, selectedIds, setSelectedIds });

	useEffect(() => { if (!bulkAction) setSelectedIds([]); }, [bulkAction]);

	const updateProfileField = (fieldName, val) => {
		const modifiedProfileData = {
			...profileData,
			user: {
				...profileData?.user,
				new_hire_dashboard: {
					...profileData?.user?.new_hire_dashboard,
					[fieldName]: val,
				},
			},
		};

		switch (fieldName) {
			case 'page_limit':
				setPageLimit(val);
				break;
			case 'page':
				setPage(val);
				break;
			case 'activeTab':
				setActiveTab(val);
				setPage(INITIAL_PAGE);
				modifiedProfileData.user.new_hire_dashboard.page = 1;
				break;
			default:
				break;
		}

		dispatch(setProfileState(modifiedProfileData));
	};

	return (
		<div className={styles.container}>
			<div className={styles.filter_container}>
				<div className={styles.tab_conatiner}>
					<Tabs
						activeTab={activeTab}
						themeType="tertiary"
						onChange={(val) => updateProfileField('activeTab', val)}
						style={{ marginBottom: 6 }}
					>
						<TabPanel name="offered" title="Offered" />
						<TabPanel name="rejected" title="Rejected by HR" />
						<TabPanel name="rejected_by_user" title="Rejected By User" />
						<TabPanel name="no_show" title="No Show" />
					</Tabs>

					{activeTab === 'offered' && (
						<div className={styles.bulkupload_container}>
							BulkAction
							<Toggle
								onChange={(val) => setBulkAction(val?.target?.checked)}
								value={bulkAction}
								styles={{ marginBottom: '30px' }}
							/>
						</div>
					) }

					{(bulkAction && activeTab === 'offered') && (
						<div className={styles.styled_button}>
							<Popover
								placement="right"
								render={(
									<BulkActionPopOverContent
										setShowPopOver={setShowPopOver}
										setShowModal={setShowModal}
										showModal={showModal}
										selectedIds={selectedIds}
									/>
								)}
								visible={showPopOver}
								onClickOutside={() => setShowPopOver(false)}
							>
								<Button
									disabled={isEmpty(selectedIds)}
									onClick={() => setShowPopOver(true)}
								>
									Bulk Actions
								</Button>
							</Popover>
						</div>
					)}
				</div>

				<div className={styles.filter_options}>
					<Input
						value={search}
						onChange={setSearch}
						size="md"
						style={{ marginRight: '8px', width: 300, height: 40 }}
						placeholder="Search via Name or Email"
					/>

					<FilterPopover filters={filters} setFilters={setFilters} />
				</div>
			</div>

			{!isEmpty(list || []) || loading ? (
				<>
					<StyledTable
						columns={columns}
						data={list}
						loading={loading}
					/>

					{data?.total_count > TOTAL_COUNT && (
						<div className={styles.pagination_container}>
							<div className={styles.text}> Page Limit : </div>
							<Select
								onChange={(val) => updateProfileField('page_limit', val)}
								value={pageLimit}
								options={PAGE_LIMIT_OPTIONS}
								size="sm"
								placeholder="Page Limit"
								style={{ paddingRight: '10px', paddingTop: '5px' }}
							/>

							<Pagination
								totalItems={data?.total_count || INITIAL_TOTAL_COUNT}
								currentPage={page || INITIAL_PAGE}
								pageSize={data?.page_limit}
								onPageChange={(val) => updateProfileField('page', val)}
								type="table"
								style={{ paddingTop: '5px' }}
							/>
						</div>
					)}
				</>
			) : (
				<EmptyState
					flexDirection="column"
					emptyText="No Record Found"
					textSize={20}
				/>
			)}
		</div>
	);
}

export default TableView;
