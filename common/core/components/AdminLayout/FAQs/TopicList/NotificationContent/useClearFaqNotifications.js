import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

const useClearFaqNotifications = ({
	setShowNotificationContent,
	faqNotificationData = {},
}) => {
	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = {}, partner = {} } = profile;
	const { scope = '' } = general || {};
	const { country_id = '', id : cogo_entity_id = '' } = partner;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;

	const roleSubFunction = !isEmpty(role_sub_functions)
		? role_sub_functions
		: undefined;

	const [{ loading = false }, trigger] = useRequest({
		url    : 'clear_faq_notifications',
		method : 'POST',
	}, { manual: true });

	const questionIds = (faqNotificationData || []).map(
		(questionnData) => questionnData?.id,
	);

	const params = {
		faq_question_ids  : questionIds,
		auth_function     : scope === 'partner' ? roleFunction : undefined,
		auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
		country_id,
		cogo_entity_id,
		persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
		platform          : scope === 'partner' ? 'admin' : 'app',
	};

	const onClickClearNotifications = async () => {
		try {
			await trigger({ params });
			setShowNotificationContent(false);
			Toast.success('Notifications cleared successfully!');
		} catch (err) {
			Toast.error(err?.message);
		}
	};

	return { onClickClearNotifications, loading };
};

export default useClearFaqNotifications;
