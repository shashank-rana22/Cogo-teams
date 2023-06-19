import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import React, { useState } from 'react';

import CustomList from '../../../commons/CustomList';

import ActionModal from './ActionModal';
import CreateCycleForm from './CreateCycleForm';
import FilterHeaders from './FilterHeaders';
import useListDunningCycle from './hooks/useListDunningCycle';
import { listConfig } from './listConfig';
import RenderActions from './RenderActions';
import RenderViewMore from './RenderViewMore';
import ShowMore from './ShowMore';
import styles from './styles.module.css';

function CampaignManagement() {
	const [globalFilters, setGlobalFilters] = useState({
		page: 1,
	});
	const [dropdown, setDropdown] = useState('');
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [actionModal, setActionModal] = useState({
		visible : false,
		action  : '',
		rowData : null,
	});

	const { data, loading, getDunningList } = useListDunningCycle({ globalFilters, setGlobalFilters });

	const showDropDown = (e) => <ShowMore dropdown={dropdown} rowId={e?.id} />;

	const STATUS_COLOR_MAPPING = {
		SCHEDULED   : '#CFEAED',
		CANCELLED   : '#F7CDCD',
		COMPLETED   : '#DDEBC0',
		IN_PROGRESS : '#FEF199',
		FAILED      : '#F7CDCD',
	};

	const functions = () => ({
		renderFrequency: ({ scheduleRule }) => (
			<div>{(scheduleRule?.dunningExecutionFrequency || '').replaceAll('_', ' ')}</div>
		),
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
				{status}

			</div>
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
					config={listConfig()}
					itemData={data}
					loading={loading}
					functions={functions()}
					page={globalFilters.page || 1}
					pageSize={10}
					handlePageChange={(pageValue:number) => {
						setGlobalFilters((p) => ({ ...p, page: pageValue }));
					}}
					showPagination
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
