import { IcMArrowRotateDown, IcMArrowRotateRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import CustomProgressBar from '../../../../commons/CustomProgressBar';
import ServiceProviders from '../ServiceProviders';

import styles from './styles.module.css';

function BucketsListBody({ item = {}, searchId = '', refetchBucketsData = () => {} }) {
	const {
		bucket_type,
		allocation_percentage,
		suppliers_count,
		current_allocated_containers,
		current_forecast,
		past_fulfilled_containers,
		past_allocated_containers,
	} = item;

	const [show, setShow] = useState(false);

	const bucketControls = [
		{
			component: show ? (
				<IcMArrowRotateDown
					height={20}
					width={20}
					onClick={() => setShow((prev) => !prev)}
					style={{ cursor: 'pointer' }}
				/>
			) : (
				<IcMArrowRotateRight
					height={20}
					width={20}
					onClick={() => setShow((prev) => !prev)}
					style={{ cursor: 'pointer' }}
				/>
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
					currentForecastCount={current_forecast}
					currentAllocatedCount={current_allocated_containers}
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
					pastFulfilledCount={past_fulfilled_containers}
					pastAllocatedCount={past_allocated_containers}
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
			<div className={styles.container}>
				{bucketControls.map(({ component, flexBasis, key }) => (
					<div
						key={key}
						className={styles.component}
						style={{ flexBasis }}
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
