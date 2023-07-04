const useGetObjectiveDetails = (props) => {
	const { activeObjectiveId } = props;

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
				hs_codes        : [12345, 68590],
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
				hs_codes  : [12345, 68590],
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
				hs_codes  : [12345, 68590],
				weight    : 18000,
				volume    : 2000,
			},
		],
		organization_details: {
			id           : 3,
			objective_id : activeObjectiveId,
			country      : {
				name: 'India',
			},
			state: {
				name: 'Rajasthan',
			},
			city: {
				name: 'Jaipur',
			},
			pincode: {
				name: '826004',
			},
			segments: ['long_tail', 'mid_size'],
		},
		stats_details: {
			id              : 3,
			objective_id    : activeObjectiveId,
			start_date      : new Date(),
			end_date        : new Date(),
			qoutation_count : 10,
			search_count    : 30,
		},
	};

	return { objectiveData };
};

export default useGetObjectiveDetails;
