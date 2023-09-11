import { useGetPermission } from '@cogoport/request';
import { useState } from 'react';

import useListSageOrganizationIdMappings from '../../../hooks/useListSageOrganizationIdMappings';
import conditions from '../../../utils/sage-conditions';

import getTableColumns from './getTableColumns';

const useSageMapping = ({ tradePartyDetails }) => {
	const [showDeactivate, setShowDeactivate] = useState(null);
	const {
		data = {}, loading = false,
		apiTrigger:refetch = () => {},
	} = useListSageOrganizationIdMappings({
		filterParams: {
			trade_party_detail_serial_id: tradePartyDetails.serial_id,
		},
		defaultParams: { sage_details_required: true },
	});
	const { isConditionMatches } = useGetPermission();

	const isAllowedToDeleteMapping = isConditionMatches(
		conditions.CAN_DEACTIVATE_SAGE_ORG_MAPPING,
	);
	const tableColumns = getTableColumns({ isAllowedToDeleteMapping, setShowDeactivate });

	return {
		data,
		loading,
		tableColumns,
		showDeactivate,
		setShowDeactivate,
		refetch,
	};
};

export default useSageMapping;
