import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useBulkUpdateFclFreightAllocation from '../../../../hooks/useBulkUpdateFclFreightAllocation';
import useGetRollingForecastBucketData from '../../../../hooks/useGetRollingForecastBucketData';

import BucketTable from './ServiceProvidersTable';
import WarningModal from './WarningModal';

function ServiceProviders({
	searchId = '',
	bucketType = '',
	currentAllocatedContainers = 0,
	refetchBucketsData = () => { },
}) {
	const [bulkEditMode, setBulkEditMode] = useState(false);
	const [showWarning, setShowWarning] = useState(false);

	const { data, loading, refetchServiceProvidersData } = useGetRollingForecastBucketData({
		id          : searchId,
		bucket_type : bucketType,
	});

	const formProps = useForm();

	const { bulkUpdateFclFreightAllocation, bulkUpdateLoading } = useBulkUpdateFclFreightAllocation({
		refetchServiceProvidersData,
	});

	const { control, unregister, formState, handleSubmit, reset } = formProps;

	const { dirtyFields = {} } = formState;

	const onClickSaveChanges = (values) => {
		const modifiedValues = Object.entries(values).reduce(
			(acc, [key, obj]) => [...acc, { service_provider_id: key, ...obj }],
			[],
		);

		const payload = {
			rolling_fcl_freight_search_id : searchId,
			bucket_type                   : bucketType,
			data                          : modifiedValues,
		};
		bulkUpdateFclFreightAllocation({ payload });
	};
	return (
		<div>
			<div
				style={{
					background: '#f9f9f9',
				}}
			>
				<div
					style={{
						display        : 'flex',
						justifyContent : 'flex-end',
						padding        : '20px 20px 10px 10px',
					}}
				>
					<Button
						style={{ marginRight: '10px' }}
						size="md"
						onClick={() => (bulkEditMode ? (reset(), setBulkEditMode(false)) : setShowWarning(true))}
						themeType="secondary"
					>
						{bulkEditMode ? 'Cancel' : 'Edit Allocation'}
					</Button>

					<Button
						onClick={handleSubmit(onClickSaveChanges)}
						themeType="primary"
						loading={bulkUpdateLoading}
						disabled={isEmpty(dirtyFields)}
					>
						Save Changes
					</Button>
				</div>

				<div style={{ padding: '10px 0', background: '#f9f9f9', marginBottom: '10px' }}>
					<BucketTable
						control={control}
						unregister={unregister}
						id={searchId}
						currentAllocatedContainers={currentAllocatedContainers}
						bucket_type={bucketType}
						bulkEditMode={bulkEditMode}
						serviceProvidersApiLoading={loading}
						refetchBucketsData={refetchBucketsData}
						serviceProvidersData={data}
					/>
				</div>
			</div>

			{showWarning ? (
				<WarningModal
					show={showWarning}
					setShowWarning={setShowWarning}
					setBulkEditMode={setBulkEditMode}
				/>
			) : (null)}

		</div>
	);
}

export default ServiceProviders;
