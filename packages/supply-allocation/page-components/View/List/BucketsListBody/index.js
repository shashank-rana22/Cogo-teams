import { IcMArrowRotateDown, IcMArrowRotateRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import CustomProgressBar from '../../../../commons/CustomProgressBar';
import ServiceProviders from '../ServiceProviders';

function BucketsListBody({ item = {}, searchId = '', refetchBucketsData = () => {} }) {
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
			component: show ? (
				<IcMArrowRotateDown onClick={() => setShow((prev) => !prev)} />
			) : (
				<IcMArrowRotateRight onClick={() => setShow((prev) => !prev)} />
			),
			flexBasis : '5%',
			key       : 'actions',
		},
		{
			component : <div>{startCase(bucket_type)}</div>,
			flexBasis : '10%',
			key       : 'bucket_name',
		},
		{
			component : <div>{suppliers_count}</div>,
			flexBasis : '12.5%',
			key       : 'supplier_count',
		},
		{
			component : <div>{allocation_percentage}</div>,
			flexBasis : '12.5%',
			key       : 'allocation_percent',
		},
		{
			component: (
				<CustomProgressBar
					allocatedCount={current_promised_containers}
					promisedCount={current_allocated_containers}
					uploadText=" done"
					view="current_container_allocation"
				/>
			),
			flexBasis : '30%',
			key       : 'current_container_allocation',
		},
		{
			component: (
				<CustomProgressBar
					promisedCount={past_fulfilled_containers}
					allocatedCount={past_allocated_containers}
					uploadText=" done"
					view="past_container_allocation"
				/>
			),
			flexBasis : '30%',
			key       : 'past_container_allocation',
		},
	];

	return (
		<>
			<div style={{ display: 'flex', background: '#fff' }}>
				{bucketControls.map(({ component, flexBasis, key }) => (
					<div
						key={key}
						style={{
							flexBasis,
							padding        : '20px 5px',
							display        : 'flex',
							justifyContent : 'center',
							alignItems     : 'center',
							borderBottom   : '1px solid #f9f9f9',
							background     : ' #fff',
						}}
					>
						{component}
					</div>
				))}
			</div>

			{show ? (
				<ServiceProviders
					searchId={searchId}
					bucketType={bucket_type}
					currentAllocatedContainers={current_allocated_containers}
					refetchBucketsData={refetchBucketsData}
				/>
			) : null}

		</>
	);
}

export default BucketsListBody;
