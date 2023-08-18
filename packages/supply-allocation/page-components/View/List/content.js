import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import CustomProgressBar from '../../../commons/CustomProgressBar';
import BucketTable from '../BucketsTable';
import getSubBucketColumns from '../SubBucketColumns';

function Content({
	item = {},
	search_id = '',
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
	const formProps = useForm();

	const { control, unregister, formState, handleSubmit } = formProps;
	const { dirtyFields = {} } = formState;

	const { subBucketColumns } = getSubBucketColumns({ control, unregister });

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
				view="current_container_allocation"
			/>,
			flexBasis : '30%',
			key       : 'current_container_allocation',
		},
		{
			component: <CustomProgressBar
				promisedCount={past_fulfilled_containers}
				allocatedCount={past_allocated_containers}
				uploadText=" done"
				view="past_container_allocation"
			/>,
			flexBasis : '30%',
			key       : 'past_container_allocation',
		},
	];

	const onClickSaveChanges = (values) => {
		const payload = Object.entries(values).map(([key, value]) => ({ [key.split('_')[0]]: value }));
		console.log('payload:', payload);
	};

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
							borderBottom   : '1px solid #F9F9F9',
							background     : ' #FFF',
						}}
					>
						{component}
					</div>
				))}
			</div>

			{/*
			{!isEmpty(dirtyFields)
				? ( */}
			<div style={{
				display        : 'flex',
				justifyContent : 'space-between',
				marginTop      : '20px',
				opacity        : !isEmpty(dirtyFields) ? '1' : '0',
				...(isEmpty(dirtyFields) ? { pointerEvents: 'none' } : {}),
			}}
			>
				<div>Add New Allocation</div>
				<Button
					onClick={handleSubmit(onClickSaveChanges)}
					themeType="secondary"
				>
					Save Changes

				</Button>
			</div>
			{/* ) : null} */}

			{show
				? (
					<BucketTable
						control={control}
						unregister={unregister}
						id={search_id}
						bucket_type={bucket_type}
					/>
				) : null}

		</>
	);
}
export default Content;
