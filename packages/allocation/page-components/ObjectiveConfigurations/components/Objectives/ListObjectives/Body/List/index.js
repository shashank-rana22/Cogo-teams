import getListColumnMapping from './get-list-column-mapping';
import ListCard from './ListCard';
import ListHeader from './ListHeader';

const list = [
	{
		status  : 'verification_pending',
		name    : 'Objective 1',
		type    : 'comapny',
		partner : {
			business_name: 'COGO INDIA',
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

const LIST_COLUMN_MAPPING = getListColumnMapping();

function List() {
	return (
		<section>
			<ListHeader LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING} />

			{list.map((listItem) => (
				<ListCard
					key={listItem.id}
					listItem={listItem}
					LIST_COLUMN_MAPPING={LIST_COLUMN_MAPPING}
				/>
			))}
		</section>
	);
}

export default List;
