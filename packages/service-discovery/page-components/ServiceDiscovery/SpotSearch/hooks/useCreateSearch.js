import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import getDefaultPayload from '../utils/getDefaultPayload';
import getEditPayload from '../utils/getEditPayload';

const useCreateSearch = ({ setRouterLoading = () => {}, setHeaderProps = () => {} } = {}) => {
	const { query = {}, userRoleIDs = [] } = useSelector(({ profile, general }) => ({
		query       : general?.query,
		userRoleIDs : profile?.partner?.user_role_ids,
	}));

	const [{ loading, data }, trigger] = useRequest({
		method : 'post',
		url    : '/create_spot_search',
	}, { manual: true });

	const createSearch = async ({ action, values }) => {
		try {
			let payload = {};

			const {
				organization_branch_id,
				organization_id,
				service_type,
				user_id,
				origin = {},
				destination = {},
				formValues = {},
				ftlFormData = {},
			} = values;

			if (action === 'default') {
				const defaultPayload = getDefaultPayload({
					service_type,
					origin,
					destination,
					ftlFormData,
				});

				payload = { ...defaultPayload };
			} else if (['edit', 'quick-search'].includes(action)) {
				const editPayload = getEditPayload(service_type, {
					origin,
					destination,
					formValues,
				});

				payload = { ...editPayload };
			}

			if (isEmpty(payload)) {
				return false;
			}

			if (setRouterLoading) {
				setRouterLoading(true);
			}

			const geo = getGeoConstants();

			const cogoVerseTeamIDS = [
				geo?.uuid.cogoverse_admin,
				geo?.uuid.cogoverse_executive,
				geo?.uuid.cogoverse_kam,
			];

			const isCogoverseMember = (userRoleIDs || []).some((elem) => (cogoVerseTeamIDS || []).includes(elem));

			const fromCogoverse = query?.source === 'communication' || isCogoverseMember;

			payload = {
				...payload,
				importer_exporter_branch_id : organization_branch_id,
				importer_exporter_id        : organization_id,
				source                      : 'platform',
				search_type                 : service_type,
				user_id,
				tags                        : ['version2', ...(fromCogoverse ? ['cogoverse'] : [])],
			};

			if (setHeaderProps) {
				setHeaderProps({});
			}

			const res = await trigger({ data: payload });

			return res?.data?.id;
		} catch (err) {
			if (err?.response?.data) {
				Toast.error(getApiErrorString(err?.response?.data));
			}

			setRouterLoading(false);

			return err;
		}
	};

	return {
		createSearch,
		data,
		loading,
	};
};
export default useCreateSearch;
