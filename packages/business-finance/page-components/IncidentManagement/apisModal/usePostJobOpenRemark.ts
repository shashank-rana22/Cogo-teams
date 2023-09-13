import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'react-i18next';

interface Props {
	id?: string;
	remarks?: string;
	setShowModal?: (p: any) => void;
	refetch?: Function;
}

const usePostJobOpenRemark = ({
	id = '',
	remarks = '',
	setShowModal = () => {},
	refetch = () => {},
}: Props) => {
	const { t } = useTranslation(['incidentManagement']);

	const { user_id: userId = '' } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const [{ loading }, trigger] = useRequestBf(
		{
			url     : `/incident-management/incident/${id}`,
			method  : 'patch',
			authKey : 'patch_incident_management_incident_by_id',
		},
		{ manual: true },
	);

	const onSubmit = async (status: string) => {
		try {
			const payload = {
				remark    : remarks,
				status,
				updatedBy : userId,
			};

			const res = await trigger({
				data: payload,
			});

			if (res?.data?.message) {
				Toast.success(t('incidentManagement:request_updated_successfully_message'));
			}

			setShowModal(false);

			refetch();
		} catch (err) {
			Toast.error(err?.response?.data?.message || err?.response?.message);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default usePostJobOpenRemark;