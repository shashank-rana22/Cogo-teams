// import { useSelector } from '@cogoport/store';

import { useAllocationRequest } from '@cogoport/request';

const useKamExpertiseConfig = () => {
	// const {
	// 	general: { scope = '' },
	// } = useSelector((state) => state);

	// const { organizationData } = props;
	// const organizationId = organizationData?.twin_importer_exporter_id;

	// const params = { organization_id: organizationId };

	const [{ data = {}, loading }] = useAllocationRequest({
		url     : 'allocation/kam_expertise_configuration',
		method  : 'get',
		authkey : 'get_allocation_kam_expertise_configuration',
		params  : {},
	}, { manual: false });

	return {
		KamConfigDetails: data,
		loading,
	};
};

export default useKamExpertiseConfig;
