import { useForm, useDebounceQuery } from '@cogoport/forms';
import { useAthenaRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useSearch = () => {
	const [params, setParams] = useState({});
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const { control, handleSubmit, reset, watch } = useForm();

	const [{ loading = false, data: responseData = {} }] = useAthenaRequest({
		url    : 'shipments_by_hscod',
		method : 'post',
		params,
	}, { manual: false });

	const handleClick = async (formValues) => {
		const {
			segment,
			enrichment_status,
			enrichment_type,
		} = formValues;
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				segment           : segment || undefined,
				enrichment_status : enrichment_status || undefined,
				enrichment_type   : enrichment_type || undefined,
			},
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	useEffect(() => {
		const subscription = watch((value) => {
			const { mode, origin_country_port, destination_country_port } = value;

			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					origin_country_id      : origin_country_port || undefined,
					destination_country_id : destination_country_port || undefined,
					mode,
				},
			}));
		});

		return () => subscription.unsubscribe();
	}, [watch, setParams]);

	return {
		loading,
		response: (responseData || []).list,
		control,
		handleClick,
		searchQuery,
		searchValue,
		setSearchValue,
		handleSubmit,
		debounceQuery,
		reset,
	};
};

export default useSearch;
