import { Pagination, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';

import ListCard from './ListCard';
import styles from './styles.module.css';

// const list = [
// 	{
// 		id   : 1,
// 		role : {
// 			name              : 'IE Owner SME Demand',
// 			role_sub_function : 'SME',
// 		},
// 		user: {
// 			name: 'Mohit Nagar',
// 		},
// 		partner: {
// 			business_name: 'COGO Freight PVT LTD',
// 		},
// 		objectives: [
// 			{
// 				id             : 1,
// 				status         : 'verification_pending',
// 				name           : 'Objective 1',
// 				objective_type : 'comapny',
// 				channels       : ['SME', 'CP'],
// 				updated_at     : new Date(),
// 				activate_at    : new Date(),
// 				weightage      : 50,
// 			},
// 			{
// 				id             : 2,
// 				status         : 'verified',
// 				name           : 'Objective 2',
// 				objective_type : 'team',
// 				channels       : ['CP'],
// 				updated_at     : new Date(),
// 				activate_at    : null,
// 				weightage      : 50,
// 			},
// 		],
// 	},
// 	{
// 		id   : 2,
// 		role : {
// 			name              : 'KAM SME Demand',
// 			role_sub_function : 'SME',
// 		},
// 		user: {
// 			name: 'Mohit Nagar',
// 		},
// 		partner: {
// 			business_name: 'COGO Freight PVT LTD',
// 		},
// 		objectives: [
// 			{
// 				id             : 1,
// 				status         : 'verification_pending',
// 				name           : 'Objective 1',
// 				objective_type : 'comapny',
// 				channels       : ['SME', 'CP'],
// 				updated_at     : new Date(),
// 				activate_at    : new Date(),
// 				weightage      : 40,
// 			},
// 			{
// 				id             : 2,
// 				status         : 'verified',
// 				name           : 'Objective 2',
// 				objective_type : 'team',
// 				channels       : ['CP'],
// 				updated_at     : new Date(),
// 				activate_at    : null,
// 				weightage      : 20,
// 			},
// 			{
// 				id             : 4,
// 				status         : 'live',
// 				name           : 'Objective 4',
// 				objective_type : 'team',
// 				channels       : ['CP', 'SME'],
// 				updated_at     : new Date(),
// 				activate_at    : new Date(),
// 				weightage      : 40,
// 			},
// 		],
// 	},
// 	{
// 		id   : 2,
// 		role : {
// 			name              : 'KAM SME Enterprise',
// 			role_sub_function : 'Enterprise',
// 		},
// 		user: {
// 			name: 'Parth Sharma',
// 		},
// 		partner: {
// 			business_name: 'COGO Freight PVT LTD',
// 		},
// 		objectives: [
// 			{
// 				id             : 2,
// 				status         : 'verified',
// 				name           : 'Objective 2',
// 				objective_type : 'team',
// 				channels       : ['CP'],
// 				updated_at     : new Date(),
// 				activate_at    : null,
// 				weightage      : 100,
// 			},
// 		],
// 	},
// ];

function ListAgents(props) {
	const { setActiveTabDetails, list, loading, paginationData, getNextPage } = props;

	const { page, page_limit, total_count } = paginationData;

	if (loading) return <Loader />;

	if (isEmpty(list)) {
		return 			(
			<EmptyState
				flexDirection="column"
				height={400}
				width={700}
				textSize={24}
			/>
		);
	}

	return (
		<>
			{list.map((item) => (
				<ListCard
					key={item.id}
					item={item}
					setActiveTabDetails={setActiveTabDetails}
				/>
			))}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</>
	);
}

export default ListAgents;
