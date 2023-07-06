import { Pagination } from '@cogoport/components';

import ListCard from './ListCard';
import styles from './styles.module.css';

const list = [
	{
		id   : 1,
		role : {
			name              : 'IE Owner SME Demand',
			role_sub_function : 'SME',
		},
		user: {
			name: 'Mohit Nagar',
		},
		partner: {
			business_name: 'COGO Freight PVT LTD',
		},
		objectives: [
			{
				id          : 1,
				status      : 'verification_pending',
				name        : 'Objective 1',
				type        : 'comapny',
				channel     : ['SME', 'CP'],
				updated_at  : new Date(),
				activate_at : new Date(),
				weightage   : 50,
			},
			{
				id          : 2,
				status      : 'verified',
				name        : 'Objective 2',
				type        : 'team',
				channel     : ['CP'],
				updated_at  : new Date(),
				activate_at : null,
				weightage   : 50,
			},
		],
	},
	{
		id   : 2,
		role : {
			name              : 'KAM SME Demand',
			role_sub_function : 'SME',
		},
		user: {
			name: 'Mohit Nagar',
		},
		partner: {
			business_name: 'COGO Freight PVT LTD',
		},
		objectives: [
			{
				id          : 1,
				status      : 'verification_pending',
				name        : 'Objective 1',
				type        : 'comapny',
				channel     : ['SME', 'CP'],
				updated_at  : new Date(),
				activate_at : new Date(),
				weightage   : 40,
			},
			{
				id          : 2,
				status      : 'verified',
				name        : 'Objective 2',
				type        : 'team',
				channel     : ['CP'],
				updated_at  : new Date(),
				activate_at : null,
				weightage   : 20,
			},
			{
				id          : 4,
				status      : 'live',
				name        : 'Objective 4',
				type        : 'team',
				channel     : ['CP', 'SME'],
				updated_at  : new Date(),
				activate_at : new Date(),
				weightage   : 40,
			},
		],
	},
	{
		id   : 2,
		role : {
			name              : 'KAM SME Enterprise',
			role_sub_function : 'Enterprise',
		},
		user: {
			name: 'Parth Sharma',
		},
		partner: {
			business_name: 'COGO Freight PVT LTD',
		},
		objectives: [
			{
				id          : 2,
				status      : 'verified',
				name        : 'Objective 2',
				type        : 'team',
				channel     : ['CP'],
				updated_at  : new Date(),
				activate_at : null,
				weightage   : 100,
			},
		],
	},
];

function ListAgents(props) {
	const { setActiveTabDetails } = props;

	return (
		<>
			<div>
				{list.map((item) => (
					<ListCard
						key={item.id}
						item={item}
						setActiveTabDetails={setActiveTabDetails}
					/>
				))}
			</div>

			<div className={styles.pagination_container}>
				<Pagination type="table" />
			</div>
		</>
	);
}

export default ListAgents;
