import React from 'react';
import startCase from '@cogo/utils/startCase';
import { Flex, Text } from '@cogo/commons/components';
import { Button } from '@cogoport/front/components/admin';
import TaskContainer from '../commons/TaskContainer';
import Create from './Create';
import UploadFlow from './UploadFlow';
import useManifestCopy from './hooks/useManifestCopy';

const UploadManifestCopy = ({
	summary = {},
	pendingTask = {},
	refetch = () => {},
	clearTask = () => {},
	services = [],
}) => {
	const {
		submit = () => {},
		saveAll = () => {},
		loading = false,
		canUseSwitch = true,
		mode = '',
		shipmentListDocsAPI = {},
		requiredShipmentListDocsAPI = {},
		setMode = () => {},
		ref,
	} = useManifestCopy({
		summary,
		pendingTask,
		refetch,
		clearTask,
		services,
	});

	return (
		<TaskContainer
			loading={
				shipmentListDocsAPI?.loading || requiredShipmentListDocsAPI?.loading
			}
			pendingTask={pendingTask}
			actions={
				<>
					{canUseSwitch &&
					requiredShipmentListDocsAPI?.data?.list?.length >= 2 ? (
						<Button
							disabled={
								shipmentListDocsAPI?.loading ||
								requiredShipmentListDocsAPI?.loading ||
								loading
							}
							onClick={() => setMode(mode === 'create' ? 'upload' : 'create')}
							size="sm"
							id="bm_pt_switch_bl_upload"
							style={{ marginRight: '10px' }}
						>
							{mode === 'create' ? 'Switch to upload' : 'Switch to create'}
						</Button>
					) : null}

					{mode === 'create' &&
					requiredShipmentListDocsAPI?.data?.list?.length !== 2 ? null : (
						<Button
							disabled={loading}
							onClick={submit}
							size="sm"
							id="bm_pt_bl_upload_submit"
						>
							Submit
						</Button>
					)}
				</>
			}
		>
			{mode === 'create' ? (
				<Flex
					display="block"
					border="1px solid #EDEDED"
					padding={16}
					borderRadius={8}
					marginBottom={8}
				>
					<Text size={12} marginBottom={8} bold>
						{startCase(summary?.bl_category).toLocaleUpperCase()}
					</Text>
					<Create
						completed={shipmentListDocsAPI?.data?.list?.length > 0}
						createData={
							shipmentListDocsAPI?.data?.list?.length > 0
								? JSON.parse(shipmentListDocsAPI?.data?.list?.[0]?.data)
								: shipmentListDocsAPI?.data?.list?.[0]?.data
						}
						onSave={(v) => saveAll(v)}
						summary={summary}
						services={services}
						loading={loading}
						requiredTasks={requiredShipmentListDocsAPI?.data?.list}
					/>
				</Flex>
			) : null}

			{mode === 'upload' ? (
				<UploadFlow ref={ref} summary={summary} pendingTask={pendingTask} />
			) : null}
		</TaskContainer>
	);
};

export default UploadManifestCopy;
