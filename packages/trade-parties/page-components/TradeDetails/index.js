import { IcMArrowBack } from '@cogoport/icons-react';
import { useRequest } from '@cogoport/request';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useCallback } from 'react';

import BasicDetails from './BasicDetails/index';
import BasicDetailsList from './BasicDetailsList/index';

function TradeDetails() {
	const router = useRouter();

	const id = router.query.partner_id;
	// console.log(id);
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/get_organization_trade_party_detail',
			params : {
				id,
			},
		},
		{ manual: true },
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger({});
			console.log('res', res.data);
		} catch (err) {
			console.log('error occured');
			console.log(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<Link href="/trade-parties">
				<IcMArrowBack style={{ marginRight: 8 }} />
				Go Back
			</Link>

			<BasicDetails tradePartyDetails={{}} />
			<BasicDetailsList trade_party_id={id} />
		</div>
	);
}
export default TradeDetails;
