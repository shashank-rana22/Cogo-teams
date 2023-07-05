import { Collapse, Pagination } from '@cogoport/components';
import { useState, useMemo } from 'react';

import ObjectiveDetailsCard from '../../../../../common/ObjectiveDetailsCard';

import ListCard from './ListCard';
import getListColumnMapping from './ListCard/get-list-column-mapping';
import ListHeader from './ListHeader';
import styles from './styles.module.css';

const list = [
	{
		id      : 1,
		status  : 'verification_pending',
		name    : 'Objective 1',
		type    : 'comapny',
		partner : {
			business_name: 'COGO FREIGHT INDIA PVT. LTD. INDIA',
		},
		channel : ['SME', 'CP'],
		roles   : [
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
		updated_at  : new Date(),
		activate_at : new Date(),
	},
	{
		id      : 2,
		status  : 'verified',
		name    : 'Objective 2',
		type    : 'team',
		partner : {
			business_name: 'COGO INDIA',
		},
		channel : ['CP'],
		roles   : [
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
		updated_at  : new Date(),
		activate_at : null,
	},
	{
		id      : 3,
		status  : 'rejected',
		name    : 'Objective 3',
		type    : 'team',
		partner : {
			business_name: 'COGO VIETNAM',
		},
		channel : ['SME'],
		roles   : [
			{
				name: 'KAM SME Demand',
			},
		],
		updated_at  : new Date(),
		activate_at : null,
	},
	{
		id      : 4,
		status  : 'live',
		name    : 'Objective 4',
		type    : 'team',
		partner : {
			business_name: 'COGO INDIA',
		},
		channel : ['CP', 'SME'],
		roles   : [
			{
				name: 'KAM SME Demand',
			},
			{
				name: 'IE Owner',
			},
			{
				name: 'KAM Manager',
			},
			{
				name: 'KAM 1',
			},
		],
		updated_at  : new Date(),
		activate_at : new Date(),
	},
];

function List(props) {
	const { setActiveTabDetails } = props;

	const [activeObjectiveId, setActiveObjectiveId] = useState(null);

	const LIST_COLUMN_MAPPING = getListColumnMapping({ setActiveTabDetails });

	const objectiveList = useMemo(() => list.map((item) => ({
		key      : item.id,
		children : <ObjectiveDetailsCard activeObjectiveId={item.id} />,
		title    : <ListCard
			listItem={item}
			LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
		/>,
	})), [LIST_COLUMN_MAPPING]);

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
				<Pagination type="table" />
			</div>
		</section>
	);
}

export default List;
