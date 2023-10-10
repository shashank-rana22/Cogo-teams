import { Toast } from '@cogoport/components';

const showErrorsInToast = (messages, t = () => {}) => {
	Toast.error(
		Object.keys(messages || {})
			?.map((_) => messages[_])
			?.join(', ')
			|| t('common:default_error_toast'),
		{ hideAfter: 6 },
	);
};

export default showErrorsInToast;
