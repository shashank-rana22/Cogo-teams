import { useForm, useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useMemo, useState, useEffect, useCallback } from 'react';

import sub_controls from '../configurations/sub-filter-controls';

const STRING_BOOL_MAPPINGS = {
	true  : true,
	false : false,
	null  : null,
};

const useGetLeadData = () => {
	const [params, setParams] = useState({
		page_limit               : 10,
		page                     : 1,
		pagination_data_required : true,
	});

	const [selectAll, setSelectAll] = useState(false);

	const [checkedRowsId, setCheckedRowsId] = useState([]);
	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [{ data, loading, error }] = useRequest({
		url    : '/list_leads',
		method : 'get',
		params,
	}, { manual: false });

	const { list: response = [], ...paginationData } = data || {};
	const currentPageListIds = useMemo(() => response?.map(({ id }) => id), [response]);

	const selectAllHelper = useCallback((listArgument = []) => {
		const isRowsChecked = currentPageListIds.every((id) => listArgument.includes(id));

		if (isRowsChecked !== selectAll) {
			setSelectAll(isRowsChecked);
		}
	}, [currentPageListIds, selectAll]);

	useEffect(() => {
		if (isEmpty(currentPageListIds)) {
			return;
		}

		selectAllHelper(checkedRowsId);
	}, [currentPageListIds, checkedRowsId, selectAllHelper]);

	const onChangeBodyCheckbox = (event, id) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedIds = [];

			if (event.target.checked) {
				newCheckedIds = [...previousIds, id];
			} else {
				newCheckedIds = previousIds.filter((selectedId) => selectedId !== id);
			}

			selectAllHelper(newCheckedIds);

			return newCheckedIds;
		});
	};

	const onChangeTableHeadCheckbox = (event) => {
		setCheckedRowsId((previousIds) => {
			let newCheckedRowsIds = [...previousIds];

			if (event.target.checked) {
				newCheckedRowsIds = [...newCheckedRowsIds, ...currentPageListIds];
			} else {
				newCheckedRowsIds = previousIds.filter((id) => !currentPageListIds.includes(id));
			}

			setSelectAll(event.target.checked);

			return [...new Set(newCheckedRowsIds)];
		});
	};

	const getFormattedParam = (param_attr) => {
		const formatted_attr = (param_attr || []).map((item) => STRING_BOOL_MAPPINGS[item] || item);
		return formatted_attr;
	};

	const handleClick = async (formValues) => {
		const {
			segment,
			registration_type,
			platform_lifecycle_stage,
			is_channel_partner,
			min_lead_score,
			org_enrichment_status,
			is_mobile_present,
			is_email_present,
			is_mobile_bounce_check,
			is_email_bounce_check,
			is_mobile_verified,
			is_email_verified,
			contact_count,
			shipment_count,
		} = formValues;

		const formatted_is_email_bounce_check = getFormattedParam(is_email_bounce_check);
		const formatted_is_mobile_bounce_check = getFormattedParam(is_mobile_bounce_check);
		const formatted_is_mobile_verified = getFormattedParam(is_mobile_verified);
		const formatted_is_email_verified = getFormattedParam(is_email_verified);

		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...(previousParams.filters || {}),
				platform_lifecycle_stage: platform_lifecycle_stage && !isEmpty(platform_lifecycle_stage)
					? platform_lifecycle_stage : undefined,
				is_channel_partner : is_channel_partner ? STRING_BOOL_MAPPINGS[is_channel_partner] : undefined,
				segment            : segment && !isEmpty(segment) ? segment : undefined,
				registration_type  : registration_type && !isEmpty(registration_type) ? registration_type : undefined,
				is_user_enriched   : org_enrichment_status
					? STRING_BOOL_MAPPINGS[org_enrichment_status] : undefined,
				objective_filters: {
					min_lead_score: min_lead_score || undefined,
				},
				users_filters: {
					is_mobile_present: is_mobile_present
						? STRING_BOOL_MAPPINGS[is_mobile_present] : undefined,
					is_email_present: is_email_present
						? STRING_BOOL_MAPPINGS[is_email_present] : undefined,
					is_mobile_bounce_check: !isEmpty(formatted_is_mobile_bounce_check)
						? formatted_is_mobile_bounce_check : undefined,
					is_email_bounce_check: !isEmpty(formatted_is_email_bounce_check)
						? formatted_is_email_bounce_check : undefined,
					is_mobile_verified: !isEmpty(formatted_is_mobile_verified)
						? formatted_is_mobile_verified : undefined,
					is_email_verified: !isEmpty(formatted_is_email_verified)
						? formatted_is_email_verified : undefined,
					contact_count: contact_count || undefined,
				},
				shipment_filters: {
					shipment_count: shipment_count || undefined,
				},
			},
		}));
	};
	const { control, handleSubmit, getValues, setValue, reset, watch } = useForm();

	const convertArrayToObject = (array, key) => array.reduce((obj, item) => ({
		...obj,
		[item[key]]: undefined,
	}), {});

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
			const {
				objective_id,
				services,
				org_enrichment_status,
				origin_country_port,
				destination_country_port,
			} = value;

			const unset_user_filters = convertArrayToObject(sub_controls.user_filters.fields, 'name');

			const is_value_present = Object.keys(unset_user_filters).some((k) => value[k] !== undefined);

			if ((!org_enrichment_status || org_enrichment_status === 'false') && is_value_present) {
				Object.keys(unset_user_filters).forEach((key) => {
					const val = unset_user_filters[key];
					if (value[key]) {
						setValue(key, val);
					}
				});
			}

			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...(previousParams.filters || {}),
					objective_filters: {
						...(previousParams.filters.objective_filters || undefined),
						objective_id: isEmpty(objective_id) ? undefined : objective_id,
					},
					shipment_filters: {
						...(previousParams.filters.shipment_filters || undefined),
						origin_country_id      : origin_country_port || undefined,
						destination_country_id : destination_country_port || undefined,
					},
					services: (services === 'null' ? null : (services || undefined)),
				},
			}));
		});

		return () => subscription.unsubscribe();
	}, [watch, setValue, setParams, getValues]);

	return {
		loading,
		response: (response || []),
		error,
		control,
		handleClick,
		searchQuery,
		handleSubmit,
		debounceQuery,
		reset,
		watch,
		setParams,
		paginationData,
		checkedRowsId,
		selectAll,
		onChangeTableHeadCheckbox,
		onChangeBodyCheckbox,
		params,
	};
};

export default useGetLeadData;
