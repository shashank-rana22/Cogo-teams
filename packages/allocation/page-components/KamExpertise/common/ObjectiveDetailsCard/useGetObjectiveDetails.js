import { useAllocationRequest } from '@cogoport/request';

const HS_CODE_ONE = 12345;
const HS_CODE_TWO = 68590;
const HS_CODES = [HS_CODE_ONE, HS_CODE_TWO];

const useGetObjectiveDetails = (props) => {
	const { activeObjectiveId } = props;

	const [{ loading = false, data }] = useAllocationRequest({
		url     : 'objective_details',
		method  : 'get',
		authkey : 'get_allocation_objective_details',
		params  : {
			objective_id: activeObjectiveId,
		},
	}, { manual: false });

	const objectiveData = {
		id      : activeObjectiveId,
		status  : 'verification_pending',
		name    : 'Objective 1',
		type    : 'comapny',
		partner : {
			business_name: 'COGO FREIGHT INDIA PVT. LTD. INDIA',
		},
		channel : ['SME', 'CP'],
		roles   : [
			{
				name: 'KAM SME Demand',
			},
			{
				name: 'IE Owner',
			},
			{
				name: 'KAM Manager',
			},
		],
		updated_at                   : new Date(),
		activate_at                  : new Date(),
		service_requirement_operator : 'and',
		service_requirements         : [
			{
				id              : 1,
				objective_id    : activeObjectiveId,
				shipment_mode   : 'ocean',
				service_type    : 'FCL',
				trade_type      : 'import',
				origin_location : {
					type : 'seaport',
					name : 'INNSA Nhava Sheva',
				},
				destination_location: {
					type : 'seaport',
					name : 'jebel ali',
				},
				inco_term       : ['cif', 'abd', 'mnm', 'pwl'],
				hs_codes        : HS_CODES,
				container_count : 2,
				container_size  : '40ft',
				weight          : 18,
			},
			{
				id              : 2,
				objective_id    : activeObjectiveId,
				shipment_mode   : 'air',
				service_type    : 'air_international',
				trade_type      : 'import',
				origin_location : {
					type : 'airport',
					name : 'New York',
				},
				destination_location: {
					type : 'country',
					name : 'India',
				},
				inco_term : ['cif', 'abd', 'mnm', 'pwl'],
				hs_codes  : HS_CODES,
				weight    : 18000,
				volume    : 2000,
			},
			{
				id              : 2,
				objective_id    : activeObjectiveId,
				shipment_mode   : 'air',
				service_type    : 'air_international',
				trade_type      : 'import',
				origin_location : {
					type : 'airport',
					name : 'New York',
				},
				destination_location: {
					type : 'country',
					name : 'India',
				},
				inco_term : ['cif', 'abd', 'mnm', 'pwl'],
				hs_codes  : HS_CODES,
				weight    : 18000,
				volume    : 2000,
			},
		],
		organization_details: {
			id           : 3,
			objective_id : activeObjectiveId,
			countries    : [
				{
					name: 'India',
				},
				{
					name: 'Vietnam',
				},
				{
					name: 'UAE',
				},
			],
			states: [
				{
					name: 'Rajasthan',
				},
				{
					name: 'Gujarat',
				},
			],
			cities: [
				{
					name: 'Jaipur',
				},
				{
					name: 'Surat',
				},
			],
			pincodes: [
				{
					name: '826004',
				},
				{
					name: '234211',
				},
				{
					name: '345324',
				},
			],
			segments: ['long_tail', 'mid_size'],
		},
		stats_details: {
			id              : 3,
			objective_id    : activeObjectiveId,
			start_date      : new Date(),
			end_date        : new Date(),
			qoutation_count : 10,
			search_count    : 30,
			shipment_count  : 10,
		},
	};

	return {
		objectiveData,
		data: data?.data || {},
		loading,
	};
};

export default useGetObjectiveDetails;
