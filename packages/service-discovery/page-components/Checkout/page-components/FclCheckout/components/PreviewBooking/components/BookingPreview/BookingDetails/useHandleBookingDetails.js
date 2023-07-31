import { useRouter } from '@cogoport/next';
import { useContext, useEffect, useRef } from 'react';

import getPrefillForm from '../../../../../../../../SearchResults/utils/getPrefillForm';
import useCreateSearch from '../../../../../../../../ServiceDiscovery/SpotSearch/hooks/useCreateSearch';
import { CheckoutContext } from '../../../../../../../context';
import handleTimer from '../../../../../../../utils/handleTimer';

const SECOND_TO_MILLISECOND = 1000;

const useHandleBookingDetails = ({ setShowBreakup = () => {}, showBreakup = false }) => {
	const router = useRouter();

	const {
		detail = {},
		primaryService = {},
	} = useContext(CheckoutContext);

	const timerRef = useRef({});

	const { createSearch, loading } = useCreateSearch();

	const {
		validity_end,
		services = {},
		primary_service,
		importer_exporter_id = '',
		importer_exporter_branch_id = '',
		user = {},
	} = detail;

	const { destination_port = {}, origin_port = {} } = primaryService;

	const mainServiceObject = Object.values(services).find(
		(item) => item.service_type === primary_service,
	);

	const { shipping_line = {} } = mainServiceObject || {};

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	useEffect(() => {
		let time;

		if (!hasExpired) {
			const interval = setInterval(() => {
				time = handleTimer(validity_end);

				if (time) {
					timerRef.current.innerText = time;
				}
			}, SECOND_TO_MILLISECOND);

			if (!validity_end) {
				return () => clearInterval(interval);
			}
			return () => clearInterval(interval);
		}
		return () => {};
	}, [hasExpired, validity_end]);

	const handleUnlockLatestRate = async () => {
		const formValues = getPrefillForm(
			{
				...detail,
				service_details : services,
				services        : undefined,
			},
			'primary_service',
		);

		const values = {
			organization_branch_id : importer_exporter_branch_id,
			organization_id        : importer_exporter_id,
			service_type           : primary_service,
			user_id                : user.id,
			origin                 : origin_port,
			destination            : destination_port,
			formValues,
		};

		const spot_search_id = await createSearch({ action: 'edit', values });

		if (spot_search_id && typeof spot_search_id === 'string') {
			router.push(
				'/book/[spot_search_id]',
				`/book/${spot_search_id}`,
			);
		}
	};

	const BUTTON_MAPPING = [
		{
			key       : 'coupon_code',
			label     : 'Have a Coupon Code?',
			themeType : 'link',
			style     : {},
			onClick   : () => {},
		},
		{
			key   : 'view_details',
			label : showBreakup
				? 'Hide Details & Break Up'
				: 'View Details & Break Up',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			loading,
			onClick   : () => setShowBreakup((prev) => !prev),
		},
		{
			key       : 'latest_rate',
			label     : 'Unlock Latest rate',
			themeType : 'link',
			style     : { marginLeft: '36px' },
			loading,
			onClick   : handleUnlockLatestRate,
		},
	];

	return {
		shipping_line,
		BUTTON_MAPPING,
		primary_service,
		mainServiceObject,
		services,
		hasExpired,
		timerRef,
	};
};

export default useHandleBookingDetails;
