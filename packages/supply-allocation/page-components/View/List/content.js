import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { useState } from 'react';

import CustomProgressBar from '../../../commons/CustomProgressBar';
import StyledTable from '../../../commons/StyledTable';
import subBucketDummyData from '../../../Dummy Data/sub-bucket-data.json';
import subBucketColumns from '../SubBucketColumns';

function Content({
	item = {},
	// index = 0
}) {
	const {
		bucket_name = 'default_bucket_name',
		supplier_count = 0,
		allocation_percent = 0.0,
		// current_container_allocation = null,
		// past_container_allocation = [],
	} = item;

	const [show, setShow] = useState(false);
	// const [edit, setEdit] = useState(false);

	const bucketControls = [
		{
			component : <IcMArrowRotateRight onClick={() => setShow((prev) => !prev)} />,
			flexBasis : '5%',
			key       : 'actions',
		},
		{
			component : <div>{bucket_name}</div>,
			flexBasis : '15%',
			key       : 'bucket_name',
		},
		{
			component : <div>{supplier_count}</div>,
			flexBasis : '10%',
			key       : 'supplier_count',
		},
		{
			component : <div>{allocation_percent}</div>,
			flexBasis : '10%',
			key       : 'allocation_percent',
		},
		{
			component : <CustomProgressBar progress="60" uploadText=" done" />,
			flexBasis : '30%',
			key       : 'current_container_allocation',
		},
		{
			component : <CustomProgressBar progress="60" uploadText=" done" />,
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
