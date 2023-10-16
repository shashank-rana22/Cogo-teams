import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import toastApiError from '../../../commons/toastApiError';
import { controls } from '../../Controller/Config/create-level-config';

import useUpdateLevel from './useUpdateLevel';

const DEFAULT_VALUE = 1;

const useCreateLevel = ({
	refetch = () => { },
	setShowCreateModal = () => { },
	lineItemsRef,
	ref,
	onCancelEdit = () => { },
	editData = {},
}) => {
	const {
		profile: profileData = {},
	} = useSelector((state) => state);

	const { id, name, email } = profileData?.user || {};

	const [{ loading }, trigger] = useRequestBf({
		url     : '/incident-management/incident-approval',
		method  : 'POST',
		authKey : 'post_incident_management_incident_approval',
	}, { manual: true });

	const onCancel = () => {
		setShowCreateModal(false);
		onCancelEdit();
	};

	const create = async (payload) => {
		try {
			await trigger({ data: payload });
			setShowCreateModal(false);
			Toast.success('Created successfully');
			refetch();
		} catch (e) {
			toastApiError(e);
		}
	};
	const {
		id: updateId = '',
		referenceId = '',
		createdBy = {},
	} = editData || {};

	const { update = {} } = useUpdateLevel({
		refetch, setShow: onCancelEdit, createdBy, referenceId, id: updateId,
	});
	const getData = (lineItemLevels) => {
		const { approvalLevelConditions } = lineItemLevels || {};
		const formatLineItems = approvalLevelConditions.map((item, index) => ({
			...item,
			level: index + DEFAULT_VALUE,
		}));
		const formData = ref.current.watch();

		if (!isEmpty(editData)) {
			const payload = {
				...(formData || {}),
				approvalLevelConditions : formatLineItems,
				createdBy               : { userId: id, userName: name, userEmail: email },
			};
			update(payload);
		}

		if (isEmpty(editData)
			&& !isEmpty(formData?.incidentType)
			&& !isEmpty(formData?.incidentSubtype)
			&& !isEmpty(formData?.approvalType)
			&& !isEmpty(formData?.entityCode)) {
			const payload = {
				...(formData || {}),
				approvalLevelConditions : formatLineItems,
				createdBy               : { userId: id, userName: name, userEmail: email },
			};
			create(payload);
		}
	};

	const getFormData = (formData) => formData;

	const onSubmit = async () => {
		lineItemsRef.current.handleSubmit(getData)();
		ref.current.formSubmit(getFormData)();
	};

	return {
		controls,
		onSubmit,
		loading,
		onCancel,
	};
};

export default useCreateLevel;
