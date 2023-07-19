import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo?.uuid.cogoverse_admin_id,
	geo?.uuid.cogoverse_executive_id,
	geo?.uuid.cogoverse_kam_id,
];

const useCreateCheckout = ({
	rateCardData = {},
	spot_search_id = '',
	source = '',
}) => {
	const router = useRouter();

	const {
		scope = '',
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope       : general?.scope,
		query       : general?.query,
		userRoleIDs : profile?.partner?.user_role_ids,
	}));

	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search_checkout',
		method : 'POST',
	}, { manual: true });

	const handleCreateCheckout = async () => {
		const isCogoVerseMember = userRoleIDs.some((elem) => cogoVerseTeamIDS.includes(elem));

		const params = {
			id            : query?.search_id || spot_search_id,
			source        : source || null,
			selected_card : rateCardData?.id,
			tags:
				scope === 'partner'
				&& (query?.source === 'communication' || isCogoVerseMember)
					? ['cogoverse']
					: undefined,
		};

		try {
			const res = await trigger({ data: params });

			if (query.shipment_id) {
				router.push(
					'/checkout/[checkout_id]/[shipment_id]',
					`/checkout/${res?.data?.id}/${query.shipment_id}`,
				);
			} else {
				let partnerHref = '/checkout/[checkout_id]';
				let partnerAs = `/checkout/${res?.data?.id}`;

				if (query?.source) {
					partnerAs += `?source=${query.source}`;
					partnerHref += `?source=${query.source}`;
				}
				router.push(partnerHref, partnerAs);
			}
		} catch (e) {
			Toast.error(e?.response?.message);
		}
	};

	return {
		handleBook: handleCreateCheckout,
		loading,
	};
};

export default useCreateCheckout;
