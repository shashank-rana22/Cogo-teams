// import { useSelector } from '@cogoport/store';

import { useAllocationRequest } from '@cogoport/request';

const useKamExpConfigList = () => {
	// const {
	// 	general: { scope = '' },
	// } = useSelector((state) => state);

	// const { organizationData } = props;
	// const organizationId = organizationData?.twin_importer_exporter_id;

	// const params = { organization_id: organizationId };

	const [{ data = {}, loading }] = useAllocationRequest({
		url     : 'allocation/kam_expertise_configuration_list',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_configuration_list',
		params  : {},
	}, { manual: false });

	return {
		listKamConfigDetails: data,
		loading,
	};
};

export default useKamExpConfigList;
