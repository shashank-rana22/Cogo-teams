import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useCreateEnrichmentRequest = (props) => {
	const {
		profile: {
			user: {
				id: performed_by_id = '',
			},
		},
	} = useSelector((rdxState) => rdxState);
	const { setShowRequest, params: listParams = {}, checkedRowsId = [] } = props;
	const [params, setParams] = useState({});

	const api = useRequest({
		url    : '/create_enrichment_request',
		method : 'post',
	}, { manual: true });
	const [{ loading }, trigger] = api;

	const { control, handleSubmit, reset, setValue, watch, formState:{ errors = {} } } = useForm();

	const onSave = async (formValues) => {
		const {
			mode,
			name,
			constraints,
			select_first,
			enrichment_source_id,
		} = formValues || {};

		// console.log('herer');

		const payloadMode = mode === 'select_first' ? 'api_call' : mode;

		try {
			const payload = {
				mode              : payloadMode,
				name,
				constraints,
				enrichment_source_id,
				performed_by_id,
				performed_by_type : 'admin',
				list_lead_filters : {
					...listParams.filters,
					allocation_lead_ids : mode === 'checked' ? checkedRowsId : undefined,
					select_first        : select_first || undefined,
				},
			};

			await trigger({ data: payload });

			setShowRequest(false);
			reset();
			Toast.success('Enrichment request raised successfully!');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'enrichment: save_error_default',
			);
		}
	};

	useEffect(() => {
		const subscription = watch((value) => {
			const {
				mode,
				select_first,
			} = value;

			if (mode !== 'select_first' && select_first) {
				setValue('select_first', undefined);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	return {
		loading,
		control,
		onSave,
		handleSubmit,
		reset,
		watch,
		errors,
		setParams,
		params,
	};
};

export default useCreateEnrichmentRequest;
