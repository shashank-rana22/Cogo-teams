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
function List({ bucketData = [] }) {
	const generateBucketTableData = bucketData.reduce((acc, curr) => {
		const {
			allocation_percentage,
			bucket_type,
			current_container_allocation = {},
			past_container_fulfillment = {},
			suppliers_count = 0,
		} = curr;

		const { current_promised_containers = 0, current_allocated_containers = 0 } = current_container_allocation;

		const { past_fulfilled_containers = 30, past_allocated_containers = 50 } = past_container_fulfillment;

		return [...acc, {
			bucket_type,
			allocation_percentage,
			suppliers_count,
			current_promised_containers,
			current_allocated_containers,
			past_fulfilled_containers,
			past_allocated_containers,
		}];
	}, []);

	return (
		<>
			<div style={{
				display    : 'flex',
				alignItems : 'center',
				background : '#FDFBF6',
				padding    : '20px 5px',
				marginTop  : '20px',
			}}
			>
				{ bucketControls.map(({ title, flexBasis }) => (
					<div key={title} style={{ flexBasis, display: 'flex', justifyContent: 'center' }}>

						{title}
					</div>
				))}

			</div>

			{generateBucketTableData.map((item, index) => <Content key={item.bucket_type} item={item} index={index} />)}

		</>
	);
}
export default List;
