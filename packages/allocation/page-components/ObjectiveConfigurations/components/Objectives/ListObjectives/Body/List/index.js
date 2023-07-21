import { Collapse, Pagination } from '@cogoport/components';
import { useState, useMemo } from 'react';

import ObjectiveDetailsCard from '../../../../../common/ObjectiveDetailsCard';

import ListCard from './ListCard';
import getListColumnMapping from './ListCard/get-list-column-mapping';
import ListHeader from './ListHeader';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

// const list = [
// 	{
// 		id      : 1,
// 		status  : 'verification_pending',
// 		name    : 'Objective 1',
// 		type    : 'comapny',
// 		partner : {
// 			business_name: 'COGO FREIGHT INDIA PVT. LTD. INDIA',
// 		},
// 		channels : ['SME', 'CP'],
// 		roles   : [
// 			{
// 				name: 'KAM SME Demand',
// 			},
// 			{
// 				name: 'IE Owner',
// 			},
// 			{
// 				name: 'KAM Manager',
// 			},
// 		],
// 		updated_at  : new Date(),
// 		activate_at : new Date(),
// 	},
// 	{
// 		id      : 2,
// 		status  : 'verified',
// 		name    : 'Objective 2',
// 		type    : 'team',
// 		partner : {
// 			business_name: 'COGO INDIA',
// 		},
// 		channels : ['CP'],
// 		roles   : [
// 			{
// 				name: 'KAM SME Demand',
// 			},
// 			{
// 				name: 'IE Owner',
// 			},
// 			{
// 				name: 'KAM Manager',
// 			},
// 		],
// 		updated_at  : new Date(),
// 		activate_at : null,
// 	},
// 	{
// 		id      : 3,
// 		status  : 'rejected',
// 		name    : 'Objective 3',
// 		type    : 'team',
// 		partner : {
// 			business_name: 'COGO VIETNAM',
// 		},
// 		channels : ['SME'],
// 		roles   : [
// 			{
// 				name: 'KAM SME Demand',
// 			},
// 		],
// 		updated_at  : new Date(),
// 		activate_at : null,
// 	},
// 	{
// 		id      : 4,
// 		status  : 'live',
// 		name    : 'Objective 4',
// 		type    : 'team',
// 		partner : {
// 			business_name: 'COGO INDIA',
// 		},
// 		channels : ['CP', 'SME'],
// 		roles   : [
// 			{
// 				name: 'KAM SME Demand',
// 			},
// 			{
// 				name: 'IE Owner',
// 			},
// 			{
// 				name: 'KAM Manager',
// 			},
// 			{
// 				name: 'KAM 1',
// 			},
// 		],
// 		updated_at  : new Date(),
// 		activate_at : new Date(),
// 	},
// ];

const objectiveData = {
	// id      : activeObjectiveId,
	status  : 'verification_pending',
	name    : 'Objective 1',
	type    : 'comapny',
	partner : {
		business_name: 'COGO FREIGHT INDIA PVT. LTD. INDIA',
	},
	channels : ['SME', 'CP'],
	roles    : [
		{
			name: 'KAM SME Demand',
		},
		{
			name: 'IE Owner',
		},
		{
			name: 'KAM Manager',
		},
	],
	updated_at                   : new Date(),
	activate_at                  : new Date(),
	service_requirement_operator : 'and',
	service_requirements         : [
		{
			id              : 1,
			// objective_id    : activeObjectiveId,
			shipment_mode   : 'ocean',
			service_type    : 'FCL',
			trade_type      : 'import',
			origin_location : {
				type : 'seaport',
				name : 'INNSA Nhava Sheva',
			},
			destination_location: {
				type : 'seaport',
				name : 'jebel ali',
			},
			inco_term       : ['cif', 'abd', 'mnm', 'pwl'],
			// hs_codes        : [12345, 68590],
			container_count : 2,
			container_size  : ['40ft'],
			weight          : 18,
		},
		{
			id              : 2,
			// objective_id    : activeObjectiveId,
			shipment_mode   : 'air',
			service_type    : 'air_international',
			trade_type      : 'import',
			origin_location : {
				type : 'airport',
				name : 'New York',
			},
			destination_location: {
				type : 'country',
				name : 'India',
			},
			inco_term : ['cif', 'abd', 'mnm', 'pwl'],
			// hs_codes  : [12345, 68590],
			weight    : 18000,
			volume    : 2000,
		},
		{
			id              : 2,
			// objective_id    : activeObjectiveId,
			shipment_mode   : 'air',
			service_type    : 'air_international',
			trade_type      : 'import',
			origin_location : {
				type : 'airport',
				name : 'New York',
			},
			destination_location: {
				type : 'country',
				name : 'India',
			},
			inco_term : ['cif', 'abd', 'mnm', 'pwl'],
			// hs_codes  : [12345, 68590],
			weight    : 18000,
			volume    : 2000,
		},
	],
	organization_details: {
		id        : 3,
		// objective_id : activeObjectiveId,
		countries : [
			{
				name: 'India',
			},
			{
				name: 'Vietnam',
			},
			{
				name: 'UAE',
			},
		],
		states: [
			{
				name: 'Rajasthan',
			},
			{
				name: 'Gujarat',
			},
		],
		cities: [
			{
				name: 'Jaipur',
			},
			{
				name: 'Surat',
			},
		],
		pincodes: [
			{
				name: '826004',
			},
			{
				name: '234211',
			},
			{
				name: '345324',
			},
		],
		segments: ['long_tail', 'mid_size'],
	},
	stats_details: {
		id              : 3,
		// objective_id    : activeObjectiveId,
		start_date      : new Date(),
		end_date        : new Date(),
		qoutation_count : 10,
		search_count    : 30,
		shipment_count  : 10,
	},
};

function List(props) {
	const { setActiveTabDetails, loading, list, paginationData, getNextPage } = props;

	const { page, total_count, page_limit } = paginationData || {};

	const [activeObjectiveId, setActiveObjectiveId] = useState(null);

	const LIST_COLUMN_MAPPING = getListColumnMapping({ setActiveTabDetails });

	const objectiveList = useMemo(() => (list || []).map((item) => ({
		key      : item.id,
		children : <ObjectiveDetailsCard objectiveData={objectiveData} />,
		title    : <ListCard
			listItem={item}
			LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
		/>,
	})), [list, LIST_COLUMN_MAPPING]);

	if (loading) return <LoadingState />;

	return (
		<section>
			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />

			<Collapse
				className={styles.collapse}
				panels={objectiveList}
				type="card"
				activeKey={activeObjectiveId}
				setActive={setActiveObjectiveId}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</section>
	);
}

export default List;
