import { Button, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';

import useGetOrganizationServiceDetails from '../../hooks/useGetOrganizationServiceDetails';

import BuySellServices from './BuySellServices';
import Form from './Form';
import Service from './Service';
import styles from './styles.module.css';

function Details() {
	const router = useRouter();
	const service_id = router?.asPath?.split('/')?.pop();
	const { data = {}, loading = false } = useGetOrganizationServiceDetails({
		defaultParams: { organization_service_id: service_id },
	});
	if (loading) return <Loader />;
	return (
		<div>
			<Link href="/service-management">
				<Button themeType="link" size="xl">
					<IcMArrowBack style={{ marginRight: 8 }} />
					{data?.organization_name}
				</Button>
			</Link>
			<div className={styles.flex}>
				<Service item={data} service_data={data?.requested_service?.service_data} />
				<BuySellServices
					sell_services={data?.sell_services}
					buy_services={data?.buy_services}
					business_details={data?.business_details}
				/>
			</div>
			<Form
				supply_agent={data?.supply_agent_details?.[GLOBAL_CONSTANTS.zero]?.name}
				organization_id={data?.organization_id}
				service={data?.requested_service?.service}
			/>

		</div>
	);
}
export default Details;
