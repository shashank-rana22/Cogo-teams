import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useEditPersonalDetails = ({
	refetch = () => {},
	setShowModal = () => {},
	partner_user_id,
}) => {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_partner_user',
		method : 'post',
	}, { manual: false });

	const onCreate = async (values = {}) => {
		const { email, mobileNumber, name, preferred_languages } = values || {};

		const { country_code, number } = mobileNumber || {};

		try {
			const payload = {
				id                  : partner_user_id,
				name,
				email,
				preferred_languages,
				mobile_number       : number,
				mobile_country_code : country_code,

			};

			await trigger({
				data: payload,
			});

			refetch();
			// eslint-disable-next-line no-undef
			// window.location.reload();

			setShowModal(false);
			Toast.success('Personal Details updated successfully!');
		} catch (e) {
			Toast.error('Mobile number is invalid');
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useEditPersonalDetails;
