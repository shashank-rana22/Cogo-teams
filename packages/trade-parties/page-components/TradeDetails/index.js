import { IcMArrowBack } from '@cogoport/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useGetOrganizationTradePartyDetail from '../../hooks/useGetOrganizationTradePartyDetail';

import BasicDetails from './BasicDetails/index';
import BasicDetailsList from './BasicDetailsList/index';
import SageMapping from './SageMapping/index';

const TWO = 2;
function TradeDetails() {
	const router = useRouter();

	const id = router.asPath.split('/').pop();
	const trade_partner_id = router.asPath.split('/').reverse()[TWO];
	const { loading, data } = useGetOrganizationTradePartyDetail({ id });

	if (loading) return <div>Loading...</div>;
	return (
		<div>
			<Link href="/trade-parties">
				<IcMArrowBack style={{ marginRight: 8 }} />
				Go Back
			</Link>

			<BasicDetails tradePartyDetails={{ tradePartyDetails: data }} />
			<BasicDetailsList trade_party_id={id} trade_partner_id={trade_partner_id} />
			<SageMapping tradePartyDetails={{ tradePartyDetails: data }} />
		</div>
	);
}
export default TradeDetails;
