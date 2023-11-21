import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { IcMAirport } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetPriorityAirlineOptions = () => {
	const [{ loading = false, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_priority_airlines',
	}, { manual: true });

	const priorityAirlineOptions = useCallback((params) => {
		try {
			trigger({
				params: {
					filters: { operator_type: 'airline', status: 'active' },
					...params,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		}
	}, [trigger]);

	const AIRLINE_OPTIONS = [];

	if (!loading) {
		(data?.list || []).forEach((option) => {
			AIRLINE_OPTIONS.push({
				label: (
					<div style={{
						display        : 'flex',
						alignItems     : 'center',
						justifyContent : 'space-between',
						width          : '100%',
						padding        : '0 12px',
					}}
					>
						<span style={{
							display    : 'flex',
							alignItems : 'center',
						}}
						>
							{option?.airline?.logo_url ? (
								<img
									alt="logo"
									src={option?.airline?.logo_url}
									style={{ maxWidth: '16px', marginRight: '20px' }}
								/>
							) : (
								<IcMAirport
									width={16}
									height={16}
									fill="#888888"
									style={{ marginRight: '20px' }}
								/>
							)}

							<p>{option?.airline?.business_name || ''}</p>
						</span>
						<p>{option?.airline?.iata_code}</p>
					</div>
				),
				id: option?.airline?.id,
			});
		});
	}
	return {
		priorityAirlineOptions,
		airlineOptions: AIRLINE_OPTIONS,
	};
};
export default useGetPriorityAirlineOptions;
