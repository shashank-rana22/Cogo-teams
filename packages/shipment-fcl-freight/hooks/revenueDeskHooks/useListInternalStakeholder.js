import { useEffect } from 'react';
import {useRequest} from "@cogoport/request"

const useListInternalStakeholders = ({ shipment_id }) => {
	

    const [{data:internalStakeHoldersList, loading: loading, error = error },trigger]= 
                                useRequest('/list_shipment_stakeholders',{manual:true}) 

	const getList = async () => {
		await trigger({
			params: {
				filters: {
					shipment_id,
				},
				format_by_stakeholder_type_required: true,
			},
		});
	};

	useEffect(() => {
		getList();
	}, [shipment_id]);

	return {
		internalStakeHoldersList,
		loading,
	};
};

export default useListInternalStakeholders;