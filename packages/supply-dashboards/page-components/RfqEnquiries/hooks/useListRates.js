import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetRates = ({ service }) => {
	const apiMapping = {
		lcl_freight     : '/list_lcl_freight_rates',
		fcl_freight     : '/list_fcl_freight_rates',
		air_freight     : '/list_air_freight_rates',
		trailer_freight : './list_haulage_freight_rates',
		haulage_freight : './list_haulage_freight_rates',
		ltl_freight     : './list_ltl_freight_rates',
		ftl_freight     : './list_ftl_freight_rates',
		fcl_customs     : './list_fcl_customs_rates',
		lcl_customs     : './list_lcl_customs_rates',
		air_customs     : './list_air_customs_rates',
		fcl_cfs         : './list_fcl_cfs_rates',
	};

	const api = apiMapping[service?.service];

	const [systemPage, setSystemPage] = useState(1);
	const [revertedPage, setRevertedPage] = useState(1);

	const [{ data:systemData, loading: loadingSystemRates }, triggerSystemData] = useRequest({
		method : 'get',
		url    : api,
	}, { manual: true });

	const [{ data:revertedData, loading: loadingRevertedRates }, triggerRevertedData] = useRequest({
		method : 'get',
		url    : '/list_spot_negotiation_rates',
	}, { manual: true });
	const fetchSystemData = async () => {
		try {
			await triggerSystemData({
				params: {
					filters: {
						origin_port_id      : service?.data?.origin_port_id,
						destination_port_id : service?.data?.destination_port_id,
						is_rate_available   : service?.service === 'fcl_freight'
						|| service?.service === 'ftl_freight' ? true : undefined,
						origin_airport_id       : service?.data?.origin_airport_id,
						rate_type               : service?.service === 'air_freight' ? 'general' : undefined,
						destination_airport_id  : service?.data?.destination_airport_id,
						container_size          : service?.data?.container_size,
						container_type          : service?.data?.container_type,
						commodity               : service?.data?.contaner_type,
						origin_location_id      : service?.data?.origin_location_id,
						destination_location_id : service?.data?.destination_location_id,
						location_id             : service?.data?.location_id || service?.data?.port_id,
					},
					page_limit               : 5,
					pagination_data_required : true,
					page                     : systemPage,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};
	const fetchRevertedData = async () => {
		try {
			await triggerRevertedData({
				params: {
					audit_data_required : true,
					filters             : {
						past_similar_negotiation_reverts_for_negotiation_id: service?.id,
					},
					page_limit : 5,
					page       : revertedPage,
				},
			});
		} catch (err) {
			// console.log(err);
		}
	};

	useEffect(() => {
		fetchSystemData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [systemPage]);

	useEffect(() => {
		fetchRevertedData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [revertedPage]);

	return {
		systemData,
		revertedData,
		loadingSystemRates,
		loadingRevertedRates,
		systemPage,
		revertedPage,
		setRevertedPage,
		setSystemPage,
	};
};
export default useGetRates;
