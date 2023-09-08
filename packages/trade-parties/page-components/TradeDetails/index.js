import { Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import useGetOrganizationTradePartyDetail from '../../hooks/useGetOrganizationTradePartyDetail';

import BasicDetails from './BasicDetails';
import BasicDetailsList from './BasicDetailsList';
import SageMapping from './SageMapping';

const TWO = 2;

function TradeDetails() {
	const router = useRouter();

	const id = router.asPath?.split('/')?.pop();
	const trade_partner_id = router.asPath.split('/').reverse()[TWO];

	const { loading, data } = useGetOrganizationTradePartyDetail({ id });

	if (loading) return <Loader themeType="primary" />;
	return (
		<div>
			<Link href="[trade-partner-id]/trade-parties" as={`/${trade_partner_id}/trade-parties`}>
				<IcMArrowBack style={{ marginRight: 8 }} />
				Go Back
			</Link>

			<BasicDetails tradePartyDetails={{ tradePartyDetails: data }} loading={loading} />
			<BasicDetailsList trade_party_id={id} trade_partner_id={trade_partner_id} />
			<SageMapping tradePartyDetails={{ tradePartyDetails: data }} />
		</div>
	);
}
export default TradeDetails;
