import { bucketControls } from '../../../configs/bucket-controls';

import Content from './content';

const ALASKA = 300;
const BERLIN = 200;
const CANNADA = 300;
const ARRAY = [ALASKA, BERLIN, CANNADA];
const itemsArray = [
	{
		key                          : ALASKA,
		bucket_name                  : 'Sample Bucket 1',
		supplier_count               : BERLIN,
		allocation_percent           : BERLIN,
		current_container_allocation : ALASKA,
		past_container_allocation    : ARRAY,
	},
	{
		key                          : BERLIN,
		bucket_name                  : 'Sample Bucket 2',
		supplier_count               : BERLIN,
		allocation_percent           : BERLIN,
		current_container_allocation : ALASKA,
		past_container_allocation    : ARRAY,
	},
	{
		key                          : CANNADA,
		bucket_name                  : 'Sample Bucket 3',
		supplier_count               : CANNADA,
		allocation_percent           : CANNADA,
		current_container_allocation : ALASKA,
		past_container_allocation    : ARRAY,
	},
];

function List() {
	return (
		<>
			<div style={{ display: 'flex', alignItems: 'center', background: '#FDFBF6', padding: '20px 5px' }}>
				{ bucketControls.map(({ title, flexBasis }) => (
					<div key={title} style={{ flexBasis, display: 'flex', justifyContent: 'center' }}>

						{title}
					</div>
				))}

			</div>

			{itemsArray.map((item, index) => <Content key={item.key} item={item} index={index} />)}

		</>
	);
}
export default List;
