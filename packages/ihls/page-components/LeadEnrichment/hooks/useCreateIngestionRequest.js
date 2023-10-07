import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

const useCreateIngestionRequest = (props) => {
	const {
		profile: {
			user: {
				id: user_id = '',
			},
			partner: {
				partner_user_id,
			},
		},
	} = useSelector((rdxState) => rdxState);

	const { onCloseModal, params: listParams = {}, checkedRowsId = [] } = props;
	const [params, setParams] = useState({});

	const api = useRequest({
		url    : '/create_ingestion_request_platform',
		method : 'post',
	}, { manual: true });
	const [{ loading }, trigger] = api;

	const { control, handleSubmit, reset, setValue, watch, formState:{ errors = {} } } = useForm();

	const onSave = async (formValues) => {
		const {
			mode,
			file_name,
			description,
			ingestion_partner_id,
			account_type,
			agent_id,
			select_first,
		} = formValues || {};

		const payloadMode = mode === 'select_first' ? 'api_call' : mode;

		const is_channel_partner = account_type === 'channel_partner';

		const formatted_account_type = account_type === 'service_provider' ? 'service_provider' : 'importer_exporter';

		try {
			const payload = {
				file_name,
				ingestion_partner_id,
				user_id,
				partner_user_id,
				agent_id,
				is_channel_partner,
				ingestion_type    : 'lead',
				mode              : payloadMode,
				description       : description || undefined,
				account_type      : formatted_account_type,
				list_lead_filters : {
					...listParams.filters,
					allocation_lead_ids : mode === 'checked' ? checkedRowsId : undefined,
					select_first        : select_first || undefined,
				},
			};

			await trigger({ data: payload });

			onCloseModal();
			reset();
			Toast.success('Ingestion request raised successfully!');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'ingestion: save_error_default',
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

export default useCreateIngestionRequest;
