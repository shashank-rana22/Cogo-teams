import { Select } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import StyledTable from '../../common/StyledTable';
import { ASYNC_SELECT_MAPPING } from '../../configurations/asyncSelectMapping';
import useGetEmployeeLevels from '../../hooks/useGetEmployeeLevel';
import useGetRatingCycle from '../../hooks/useGetRatingCycle';
import useGetRatingDetails from '../../hooks/useGetRatingDetails';
import useGetRatingReviewDetails from '../../hooks/useGetReviewDetails';
import KraModal from '../KRAModal';

import EmployeeList from './EmployeeList';
import styles from './styles.module.css';
import useGetColumns from './useGetColumns';
import useGetRatingColumns from './useGetRatingColumns';

function ManagerDashboard() {
	const [employeeId, setEmployeeId] = useState();
	const [openKraModal, setOpenKraModal] = useState(false);
	const [ratingCycle, setRatingCycle] = useState('');

	const ratingColumns = useGetRatingColumns();

	const { level } = useGetEmployeeLevels();

	const {
		data, filters, setFilters,
		loading, isReportingManager,
	} = useGetRatingReviewDetails({ level, ratingCycle });

	const { data : ratingData, loading : ratingLoading } = useGetRatingDetails(ratingCycle);

	const columns = useGetColumns({
		setEmployeeId,
		level,
		setOpenKraModal,
	});

	const { ratingOptions } = useGetRatingCycle(setRatingCycle);

	const handleModalClose = () => {
		setOpenKraModal(false);
		setEmployeeId();
	};

	const renderLabel = (item) => {
		const { label } = item;
		const splitItem = label?.split('-');
		const [firstItem, secondItem] = splitItem || [];
		return (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{firstItem}
				<IcMArrowNext style={{ margin: '0 8px' }} />
				{secondItem}
			</div>
		);
	};

	return (
		<div>
			<div className={styles.flex}>
				<div className={styles.header}>
					Manager Dashboard
				</div>
				<Select
					className={styles.rating_cycle_select}
					options={ratingOptions}
					value={ratingCycle}
					renderLabel={(item) => renderLabel(item)}
					onChange={(e) => setRatingCycle(e)}
					size="sm"
				/>
			</div>

			<div className={styles.select_container}>
				{ASYNC_SELECT_MAPPING.map((val) => (
					<div key={val.asyncKey} className={styles.async_select}>
						<div className={styles.label}>{val.placeholder}</div>
						<AsyncSelect
							value={filters[val.key]}
							onChange={(e) => setFilters((prev) => ({ ...prev, [val.key]: e }))}
							{...val}
						/>
					</div>
				))}
			</div>

			<div className={styles.table_container}>
				{!loading && isEmpty(data) ? (
					<div className={styles.flexitem_1}>
						<EmptyState />
					</div>
				) : (
					<div className={styles.flexitem_1}>
						{isReportingManager ? (
							<EmployeeList
								data={data}
								setEmployeeId={setEmployeeId}
								level={level}
								setOpenKraModal={setOpenKraModal}
								loading={loading}
							/>
						) : <StyledTable columns={columns} data={data} loading={loading} emptyText="No Data Found" /> }
					</div>
				)}
				<div className={styles.flexitem_2}>
					<StyledTable
						columns={ratingColumns}
						data={ratingData}
						emptyText="No Data Found"
						loading={ratingLoading}
					/>
				</div>
			</div>

			{openKraModal ? (
				<KraModal
					show={openKraModal}
					onHide={handleModalClose}
					employeeId={employeeId}
					ratingCycle={ratingCycle}
				/>
			) : null}
		</div>
	);
}

export default ManagerDashboard;
