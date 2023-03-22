import { Toast } from '@cogoport/components';
import { useAllocationRequest } from '@cogoport/request';

function usePostProfileMasteryBadge(profileBadgeRefetch) {
	const [{ loading }, trigger] = useAllocationRequest({
		url     : '/kam_expertise_profile_mastery_badge',
		method  : 'POST',
		authkey : 'post_allocation_kam_expertise_profile_mastery_badge',
	}, { manual: true });

	const onPostingMastery = async (masteryPayload) => {
		try {
			const payload = {
				partner_user_id  : masteryPayload.partner_user_id,
				mastery_badge_id : masteryPayload.mastery_badge_id,
			};

			await trigger({
				data: payload,
			});

			profileBadgeRefetch();

			Toast.success('Mastery Badge Updated');
		} catch (error) {
			Toast.error(error?.message || 'Something went wrong');
		}
	};

	return {
		loading,
		onPostingMastery,
	};
}

export default usePostProfileMasteryBadge;
