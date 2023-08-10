import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const formatAgentTypes = ({ list }) => (
	list?.map((eachType) => ({
		label : startCase(eachType),
		value : eachType,
	}))
);

const useGetOmnichannelAgentTypes = () => {
	const [{ data }] = useRequest({
		url    : '/get_omnichannel_agent_types',
		method : 'get',
	}, { manual: false });

	return {
		options: formatAgentTypes({ list: data || [] }),
	};
};

export default useGetOmnichannelAgentTypes;
