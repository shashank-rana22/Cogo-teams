/* eslint-disable no-console */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useEditPersonalDetails = ({
	refetch = () => {},
	setShowModal = () => {},
	partner_user_id,
	setEditNameModal,
}) => {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_partner_user',
		method : 'post',
	}, { manual: false });

	const onCreate = async (values = {}) => {
		const { name } = values || {};

		try {
			const payload = {
				id: partner_user_id,
				name,

			};

			await trigger({
				data: payload,
			});

			refetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			setEditNameModal(false);
			Toast.success('Name updated successfully!');
		} catch (e) {
			console.log(e);
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default useEditPersonalDetails;
