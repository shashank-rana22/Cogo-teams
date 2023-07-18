import React, { useState } from 'react';

import useListShipmentPendingTasks from '../hooks/useListShipmentPendingTasks';

import ApprovedAWB from './ApprovedAWB';
import AWBDocument from './AWBDocument';
import EditAWB from './EditAWB';
import HandedOver from './HandedOver';
import Header from './Header';

const TABS_COMPONENT_MAPPING = {
	approved_awb : ApprovedAWB,
	handed_over  : HandedOver,
};

function PrintingDesk() {
	const [activeTab, setActiveTab] = useState('approved_awb');
	const [filters, setFilters] = useState({});
	const [relevantToMe, setRelevantToMe] = useState(false);
	const [item, setItem] = useState({});
	const [viewDoc, setViewDoc] = useState(false);
	const [edit, setEdit] = useState(false);

	const ActiveTabComponent = TABS_COMPONENT_MAPPING[activeTab] || undefined;

	const {
		data, loading, page,
		setPage, listAPI, searchValue, setSearchValue,
	} = useListShipmentPendingTasks({ activeTab, filter: filters, relevantToMe });

	return (
		<div>
			<Header
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				filters={filters}
				setFilters={setFilters}
				setRelevantToMe={setRelevantToMe}
			/>

			{ActiveTabComponent && (
				<ActiveTabComponent
					key={activeTab}
					data={data}
					loading={loading}
					setItem={setItem}
					setViewDoc={setViewDoc}
					edit={edit}
					setEdit={setEdit}
					page={page}
					setPage={setPage}
					listAPI={listAPI}
					activeTab={activeTab}
				/>
			)}

			{(viewDoc) && (
				<AWBDocument
					viewDoc={viewDoc}
					setViewDoc={setViewDoc}
					item={item}
					edit={edit}
					setEdit={setEdit}
					setItem={setItem}
				/>
			)}

			{edit && (
				<EditAWB
					item={item}
					edit={edit}
					setEdit={setEdit}
					listAPI={listAPI}
				/>
			)}
		</div>
	);
}

export default PrintingDesk;
