import { Loader, Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import Link from 'next/link';
import { useMemo } from 'react';

import useGetOrganizationTradePartyDetail from '../../hooks/useGetOrganizationTradePartyDetail';

import BasicDetails from './BasicDetails';
import BasicDetailsList from './BasicDetailsList';
import SageMapping from './SageMapping';

const ONE = 1;
function TradeDetails() {
	const router = useRouter();

	const getTradeId = (routerParams = []) => {
		const id = routerParams.pop();
		const trade_partner_id = routerParams.reverse()[ONE];
		return { id, trade_partner_id };
	};
	const { id = '', trade_partner_id = '' } = useMemo(() => getTradeId(router.asPath?.split('/')), [router?.asPath]);

	const { loading = false, data = {} } = useGetOrganizationTradePartyDetail({ defaultParams: { id } });

	if (loading) return <Loader themeType="primary" />;
	return (
		<div>
			<Link href="[trade-partner-id]/trade-parties" as={`/${trade_partner_id}/trade-parties`}>
				<Button themeType="link" size="lg" style={{ fontWeight: 'bold' }}>
					<IcMArrowBack style={{ marginRight: 8 }} />
					Go Back

				</Button>
			</Link>

			<BasicDetails tradePartyDetails={{ tradePartyDetails: data }} loading={loading} />
			<BasicDetailsList trade_party_id={id} trade_partner_id={trade_partner_id} />
			<SageMapping tradePartyDetails={{ tradePartyDetails: data }} />
		</div>
	);
}
export default TradeDetails;
