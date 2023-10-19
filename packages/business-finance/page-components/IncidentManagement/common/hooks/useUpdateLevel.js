import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';

import toastApiError from '../../../commons/toastApiError';
import { controls } from '../../Controller/Config/create-level-config';

const DEFAULT_VALUE = 1;

const useUpdateLevel = ({
	refetch = () => { },
	setShow = () => { },
	id = '',
	referenceId = '',
	createdBy = {},
}) => {
	const { t } = useTranslation(['incidentManagement']);
	const {
		profile: profileData = {},
	} = useSelector((state) => state);

	const { id: userId, name, email } = profileData?.user || {};

	const [{ loading }, trigger] = useRequestBf({
		url     : '/incident-management/incident-approval',
		method  : 'PUT',
		authKey : 'put_incident_management_incident_approval',
	}, { manual: true });

	const onCancel = () => {
		setShow(false);
	};

	const update = async (payload) => {
		try {
			await trigger({
				data: {
					approvalLevelConditions : payload?.approvalLevelConditions,
					approvalType            : payload?.approvalLevelConditions?.length <= DEFAULT_VALUE
						? 'SINGLE' : payload?.approvalType,
					id,
					referenceId,
					createdBy,
					updatedBy: {
						userId,
						userName  : name,
						userEmail : email,
					},
				},
			});
			setShow(false);
			Toast.success(t('incidentManagement:updated_successfully_message'));
			refetch();
		} catch (e) {
			toastApiError(e);
		}
	};

	return {
		controls,
		update,
		createApi: { loading },
		onCancel,
	};
};

export default useUpdateLevel;
