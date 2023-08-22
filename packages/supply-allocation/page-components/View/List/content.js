import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import CustomProgressBar from '../../../commons/CustomProgressBar';
import useBulkUpdateFclFreightAllocation from '../../../hooks/useBulkUpdateFclFreightAllocation';
import BucketTable from '../BucketsTable';

function Content({ item = {}, search_id = '', bucketsArray = [] }) {
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

	const bucketControls = [
		{
			component: (
				<IcMArrowRotateRight onClick={() => setShow((prev) => !prev)} />
			),
			flexBasis: '5%',
			key: 'actions',
		},
		{
			component: <div>{startCase(bucket_type)}</div>,
			flexBasis: '15%',
			key: 'bucket_name',
		},
		{
			component: <div>{suppliers_count}</div>,
			flexBasis: '10%',
			key: 'supplier_count',
		},
		{
			component: <div>{allocation_percentage}</div>,
			flexBasis: '10%',
			key: 'allocation_percent',
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
			flexBasis: '30%',
			key: 'current_container_allocation',
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
			flexBasis: '30%',
			key: 'past_container_allocation',
		},
	];
	const { bulkUpdateFclFreightAllocation } =
		useBulkUpdateFclFreightAllocation();

	const onClickSaveChanges = (values) => {
		const modifiedValues = Object.entries(values).reduce(
			(acc, [key, obj]) => [...acc, { service_provider_id: key, ...obj }],
			[],
		);

		const payload = {
			rolling_fcl_freight_search_id: search_id,
			bucket_type,
			data: modifiedValues,
		};
		bulkUpdateFclFreightAllocation({ payload });
	};

	return (
		<>
			<div style={{ display: 'flex' }}>
				{bucketControls.map(({ component, flexBasis, key }) => (
					<div
						key={key}
						style={{
							flexBasis,
							padding: '20px 5px',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							borderBottom: '1px solid #f9f9f9',
							background: ' #fff',
						}}
					>
						{component}
					</div>
				))}
			</div>

			{!isEmpty(dirtyFields) ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginTop: '20px',
						opacity: !isEmpty(dirtyFields) ? '1' : '0',
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
			) : null}

			{show ? (
				<BucketTable
					control={control}
					unregister={unregister}
					id={search_id}
					current_allocated_containers={current_allocated_containers}
					bucket_type={bucket_type}
					bucketsArray={bucketsArray}
				/>
			) : null}
		</>
	);
}
export default Content;
