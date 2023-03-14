import React from 'react';
import { Flex, Text } from '@cogo/commons/components';
import startCase from '@cogo/utils/startCase';
import taskDisplayNames from '../../../../configurations/display-name-mappings.js';
import incoTermMapping from '../../../../configurations/inco-term-mapping.json';

const TaskContainer = ({
	children = null,
	loading = false,
	pendingTask,
	actions,
	shipment_data = {},
}) => {
	const trade_type = incoTermMapping[shipment_data?.inco_term] || '';

	const taskName =
		taskDisplayNames(trade_type)[pendingTask?.task]?.display_name ||
		startCase(pendingTask?.task || '');

	return (
		<Flex
			display="block"
			borderRadius={8}
			padding={16}
			border="1px #E0E0E0 solid"
			marginBottom={16}
			bgColor="#FFF"
		>
			<Flex
				justifyContent="space-between"
				alignItems="center"
				marginBottom={16}
				paddingBottom={16}
				borderBottom="1px #EDEDED solid"
			>
				<Text size={16} bold>
					{taskName}
				</Text>
				{loading ? null : <Flex>{actions}</Flex>}
			</Flex>
			{loading ? <Text align="center">Loading ...</Text> : children}
		</Flex>
	);
};

export default TaskContainer;
