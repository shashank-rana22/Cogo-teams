import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import CustomProgressBar from '../../../commons/CustomProgressBar';
import StyledTable from '../../../commons/StyledTable';
import subBucketDummyData from '../../../Dummy Data/sub-bucket-data.json';
import subBucketColumns from '../SubBucketColumns';

function Content({
	item = {},
}) {
	const {
		bucket_type,
		allocation_percentage,
		suppliers_count,
		current_promised_containers,
		current_allocated_containers,
		past_fulfilled_containers,
		past_allocated_containers,
	} = item;

	const [show, setShow] = useState(false);

	const bucketControls = [
		{
			component : <IcMArrowRotateRight onClick={() => setShow((prev) => !prev)} />,
			flexBasis : '5%',
			key       : 'actions',
		},
		{
			component : <div>{startCase(bucket_type)}</div>,
			flexBasis : '15%',
			key       : 'bucket_name',
		},
		{
			component : <div>{suppliers_count}</div>,
			flexBasis : '10%',
			key       : 'supplier_count',
		},
		{
			component : <div>{allocation_percentage}</div>,
			flexBasis : '10%',
			key       : 'allocation_percent',
		},
		{
			component: <CustomProgressBar
				allocatedCount={current_promised_containers}
				promisedCount={current_allocated_containers}
				uploadText=" done"
			/>,
			flexBasis : '30%',
			key       : 'current_container_allocation',
		},
		{
			component: <CustomProgressBar
				promisedCount={past_fulfilled_containers}
				allocatedCount={past_allocated_containers}
				uploadText=" done"
			/>,
			flexBasis : '30%',
			key       : 'past_container_allocation',
		},
	];

	return (
		<>
			<div style={{ display: 'flex' }}>
				{bucketControls.map(({ component, flexBasis, key }) => (
					<div
						key={key}
						style={{
							flexBasis,
							padding        : '20px 5px',
							display        : 'flex',
							justifyContent : 'center',
							alignItems     : 'center',
							borderBottom   : '1px solid var(--balck-10, #F9F9F9)',
							background     : ' #FFF',
						}}
					>
						{component}
					</div>
				))}
			</div>

			{show
				? (
					<div style={{ padding: '0 20px', background: '#F9F9F9' }}>
						<StyledTable columns={subBucketColumns} data={subBucketDummyData} />
					</div>
				) : null}
		</>
	);
}
export default Content;
