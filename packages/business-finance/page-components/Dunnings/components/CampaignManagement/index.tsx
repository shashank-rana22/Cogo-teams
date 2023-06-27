import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import CustomList from '../../../commons/CustomList';
import showOverflowingNumber from '../../../commons/showOverflowingNumber';

import ActionModal from './ActionModal';
import CreateCycleForm from './CreateCycleForm';
import FilterHeaders from './FilterHeaders';
import useListDunningCycle from './hooks/useListDunningCycle';
import { LIST_CONFIG } from './listConfig';
import RenderActions from './RenderActions';
import RenderViewMore from './RenderViewMore';
import ShowMore from './ShowMore';
import styles from './styles.module.css';

const DEFAULT_PAGE_INDEX = 1;
const DEFAULT_PAGE_SIZE = 10;

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
	const [dropdown, setDropdown] = useState([]);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [actionModal, setActionModal] = useState({
		visible : false,
		action  : '',
		rowData : null,
	});
	const [sort, setSort] = useState({});

	const { data, loading, getDunningList } = useListDunningCycle({ globalFilters, setGlobalFilters, sort });

	const showDropDown = (e) => <ShowMore dropdown={dropdown} rowId={e?.id} />;

	const functions = () => ({
		renderName: ({ name }) => (
			<div>{showOverflowingNumber(name, 20)}</div>
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
						{oneTimeDate
							? (
								<>
									<span className={styles.frequency_value}>
										{formatDate({
											date       : oneTimeDate,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											formatType : 'date',
										})}
									</span>
									<span className={styles.border} />

								</>
							)
							: ''}
						{dayOfMonth
							? (
								<span>
									{dayOfMonth}
								</span>
							)
							: ''}
						{week ? (
							<span>
								{week.slice(0, 3)}
							</span>
						) : ''}
					&nbsp;|&nbsp;
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
				getDunningList={getDunningList}
			/>
		),
		viewMore: ({ id }) => (
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
		renderType: ({ dunningCycleType }) => (
			<div>{(dunningCycleType || '').replaceAll('_', ' ')}</div>
		),
	});

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
					config={LIST_CONFIG}
					itemData={data}
					loading={loading}
					functions={functions()}
					sort={sort}
					setSort={setSort}
					page={globalFilters.page || 1}
					pageSize={DEFAULT_PAGE_SIZE}
					handlePageChange={(pageValue:number) => {
						setGlobalFilters((p) => ({ ...p, page: pageValue }));
					}}
					renderDropdown={showDropDown}
				/>
			</div>

			{showCreateForm && (
				<CreateCycleForm
					showCreateForm={showCreateForm}
					setShowCreateForm={setShowCreateForm}
					getDunningList={getDunningList}
				/>
			)}

			{actionModal?.visible && (
				<ActionModal
					actionModal={actionModal}
					setActionModal={setActionModal}
					getDunningList={getDunningList}
				/>
			)}

		</div>
	);
}

export default CampaignManagement;
