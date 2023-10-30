import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';

import CustomConfigListItem from './CustomConfigListItem';

function CustomConfigList({
	data = {},
	showCustomConfigForm = {},
	setViewAndEditConfigData = () => {},
}) {
	const { agent_rules = [] } = data || {};
	if (isEmpty(agent_rules)) {
		return <EmptyState />;
	}
	return (
		<div>
			{agent_rules?.map((item) => (
				<CustomConfigListItem
					key={item?.id}
					data={item}
					type={data.scope}
					showCustomConfigForm={showCustomConfigForm}
					setViewAndEditConfigData={setViewAndEditConfigData}
				/>
			))}
		</div>
	);
}

export default CustomConfigList;
