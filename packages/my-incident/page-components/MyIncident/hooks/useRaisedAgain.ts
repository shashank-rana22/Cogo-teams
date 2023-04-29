import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRaisedAgain = ({ id, FileUrl, refetch, setShowModal }) => {
	const {
		user_data:UserData,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id:userId = '' } } = UserData;

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident/raise-again',
			method  : 'POST',
			authKey : 'post_incident_management_incident_raise_again',
		},
		{ manual: true },
	);

	const onRaiseAgain = async () => {
		try {
			await trigger({
				data: {
					documentUrls : FileUrl,
					createdBy    : userId,
					id,
				},
			});
			Toast.success('Raised');
			refetch();
			setShowModal(false);
		} catch (e) {
			if (!loading) {
				Toast.error(e?.response?.data?.message || 'Something went Wrong');
			}
		}
	};

	return {
		onRaiseAgain,
		data,
		loadingOnRaise: loading,
	};
};
export default useRaisedAgain;
