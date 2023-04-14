import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

function usePostProfileMasteryBadge({ profileBadgeRefetch }) {
	const [masteryId, setMasteryId] = useState('');
	const [showModal, setShowModal] = useState(false);

	const onCloseModal = () => {
		setShowModal(false);
	};

	const router = useRouter();

	const {
		profile: { partner = {} },
	} = useSelector((state) => state);

	const { partner_user_id = '' } = partner;

	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_profile_mastery_badge',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_profile_mastery_badge',
	}, { manual: true });

	const onSaveProfileMastery = async () => {
		try {
			const payload = {
				partner_user_id,
				mastery_badge_id: masteryId || undefined,
			};

			await trigger({
				data: payload,
			});

			profileBadgeRefetch();

			onCloseModal();

			Toast.success('Mastery Badge Updated');
		} catch (error) {
			Toast.error(error?.response?.data?.base[0] || 'Something went wrong');
		}
	};

	const onRedirectingToProfile = () => {
		if (partner_user_id) {
			router.push(
				'/my-profile/badges/[user_id]/?path=/my-profile',
				`/my-profile/badges/${partner_user_id}/?path=/my-profile`,
			);
		}
	};

	return {
		loading,
		masteryId,
		setMasteryId,
		showModal,
		setShowModal,
		onCloseModal,
		onRedirectingToProfile,
		onSaveProfileMastery,
	};
}

export default usePostProfileMasteryBadge;
