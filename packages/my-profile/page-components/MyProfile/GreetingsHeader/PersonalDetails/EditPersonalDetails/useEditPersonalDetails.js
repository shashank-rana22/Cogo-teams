/* eslint-disable no-console */
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

const getPayload = {
	name(values) {
		return {
			name: values.name,
		};
	},
	language(values) {
		return {
			preferred_languages: values.preferred_languages,
		};
	},
};

const useEditPersonalDetails = ({
	refetch = () => {},
	setShowModal = () => {},
	partner_user_id,
	editNameModal,
	setEditNameModal,

}) => {
	const [{ loading = false }, trigger] = useRequest({
		url    : 'update_partner_user',
		method : 'post',
	}, { manual: false });

	const onCreate = async (values = {}) => {
		const payload = getPayload[editNameModal.from](values);
		try {
			await trigger({
				data: {
					id: partner_user_id,
					...payload,
				},
			});

			refetch();
			// eslint-disable-next-line no-undef
			window.location.reload();

			setShowModal(false);
			setEditNameModal((prev) => ({ ...prev, from: 'language', state: false }));
			Toast.success(`${startCase(editNameModal.from)} updated successfully!`);
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
