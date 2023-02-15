import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRaisedAgain = ({ id, FileUrl, reftech }) => {
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
			authkey : 'get_incident_management_raise_again',
		},
		{ manual: true },
	);

	const onRaiseAgain = async () => {
		try {
			await trigger({
				data: {
					documentUrls : FileUrl,
					performedBy  : userId,
					id,
				},
			});
			reftech();
		} catch (err) {
			if (!loading) {
				Toast.error('Failed to get incident');
			}
		}
	};

	return {
		onRaiseAgain,
		data,
	};
};
export default useRaisedAgain;
