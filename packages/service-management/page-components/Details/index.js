import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import useGetOrganizationServiceDetails from '../../hooks/useGetOrganizationServiceDetails';

import BuySellServices from './BuySellServices';
import Form from './Form';
import Service from './Service';
import styles from './styles.module.css';

const ZERO = 0;

function Details() {
	const { data = {}, loading = false } = useGetOrganizationServiceDetails();
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
				supply_agent={data?.supply_agent_details?.[ZERO]?.name}
				organization_id={data?.organization_id}
				service={data?.requested_service?.service}
			/>

		</div>
	);
}
export default Details;
