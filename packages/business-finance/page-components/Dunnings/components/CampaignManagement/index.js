import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CustomList from '../../../commons/CustomList/index.tsx';
import showOverflowingNumber from '../../../commons/showOverflowingNumber.tsx';

import ActionModal from './ActionModal';
import { CYCLE_LIST_CONFIG } from './config/cycleListConfig';
import CreateCycleForm from './CreateCycleForm/index.tsx';
import FilterHeaders from './FilterHeaders/index.tsx';
import useListDunningCycles from './hooks/useListDunningCycles';
import RenderActions from './RenderActions/index.tsx';
import RenderViewMore from './RenderViewMore/index.tsx';
import ShowExecutions from './ShowExecutions';
import styles from './styles.module.css';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_STRING_LIMIT = 20;
const WEEK_SECTION_END = 3;

const STATUS_COLOR_MAPPING = {
	SCHEDULED   : '#CFEAED',
	CANCELLED   : '#F7CDCD',
	COMPLETED   : '#DDEBC0',
	IN_PROGRESS : '#FEF199',
	FAILED      : '#F7CDCD',
};

function CampaignManagement() {
	const [globalFilters, setGlobalFilters] = useState({
		page: DEFAULT_PAGE_INDEX,
	});
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [actionModal, setActionModal] = useState({
		visible : false,
		action  : '',
		rowData : null,
	});
	const [sort, setSort] = useState({});
	const [dropdown, setDropdown] = useState(undefined);

	const {
		cycleData,
		cycleLoading,
		getDunningCycle,
	} = useListDunningCycles({ globalFilters, setGlobalFilters, sort, setDropdown });

	const functions = {
		renderName: ({ name }) => (
			<div>{showOverflowingNumber(name, MAX_STRING_LIMIT)}</div>
		),
		renderFrequency: ({ scheduleRule }) => {
			const {
				dunningExecutionFrequency = '', oneTimeDate = '',
				scheduleTime = '', dayOfMonth = '',
				week = '', scheduleTimeZone = '',
			} = scheduleRule || {};
			return (
				<div>
					<span style={{ marginRight: '6px' }}>
						{startCase(dunningExecutionFrequency.toLowerCase())}
					</span>
					<div className={styles.date_time}>
						(
						{oneTimeDate}
						{dayOfMonth
							? (
								<span>
									{dayOfMonth}
									th
								</span>
							)
							: ''}
						{week ? (
							<span>
								{week.slice(GLOBAL_CONSTANTS.zeroth_index, WEEK_SECTION_END)}
							</span>
						) : ''}
						{'  '}
						<span style={{ marginLeft: '4px' }}>
							{scheduleTime}
							{' '}
							{scheduleTimeZone}
						</span>
						)
					</div>
				</div>
			);
		},
		renderCreatedOn: ({ createdAt }) => (
			<div>
				{formatDate({
					date       : createdAt,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					formatType : 'dateTime',
				})}
			</div>
		),
		renderUpdatedAt: ({ updatedAt }) => (
			<div>
				{formatDate({
					date       : updatedAt,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
					formatType : 'dateTime',
				})}
			</div>
		),
		renderActions:	(rowData) => (
			<RenderActions
				setActionModal={setActionModal}
				rowData={rowData}
				getDunningList={getDunningCycle}
			/>
		),
		viewExecutions: ({ id }) => (
			<RenderViewMore
				id={id}
				dropdown={dropdown}
				setDropdown={setDropdown}
			/>
		),
		renderStatus: ({ status }) => (
			<div
				className={styles.status}
				style={{ background: STATUS_COLOR_MAPPING[status] }}
			>
				{(status || '').replaceAll('_', ' ')}

			</div>
		),
		renderType: ({ cycleType }) => (
			<div>{(cycleType || '').replaceAll('_', ' ')}</div>
		),
		renderCycleType: ({ dunningCycleType }) => (
			<div>{(dunningCycleType || '').replaceAll('_', ' ')}</div>
		),
	};

	const showExecutions = (cycleRow) => (
		<ShowExecutions
			rowId={cycleRow?.id}
			dropdown={dropdown}
		/>
	);

	return (
		<div>
			<div>
				<FilterHeaders
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
					setShowCreateForm={setShowCreateForm}
				/>
			</div>

			<div className={styles.custom_list}>
				<CustomList
					config={CYCLE_LIST_CONFIG}
					itemData={cycleData}
					loading={cycleLoading}
					functions={functions}
					sort={sort}
					setSort={setSort}
					page={globalFilters.page || DEFAULT_PAGE_INDEX}
					pageSize={DEFAULT_PAGE_SIZE}
					handlePageChange={(pageValue) => {
						setGlobalFilters((p) => ({ ...p, page: pageValue }));
					}}
					renderDropdown={showExecutions}
				/>
			</div>

			{showCreateForm && (
				<CreateCycleForm
					showCreateForm={showCreateForm}
					setShowCreateForm={setShowCreateForm}
					getDunningList={getDunningCycle}
				/>
			)}

			{actionModal?.visible && (
				<ActionModal
					actionModal={actionModal}
					setActionModal={setActionModal}
					getDunningList={getDunningCycle}
				/>
			)}

		</div>
	);
}

export default CampaignManagement;
