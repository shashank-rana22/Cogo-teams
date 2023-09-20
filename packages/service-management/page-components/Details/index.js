import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import useGetOrganizationServiceDetails from '../../hooks/useGetOrganizationServiceDetails';

import BuySellServices from './BuySellServices';
import Service from './Service';
import styles from './styles.module.css';

function Details() {
	const { data = {}, loading = false } = useGetOrganizationServiceDetails();

	if (loading) return <Loader />;
	console.log('DATAAAAAaaaa', data);
	return (
		<div>
			<Link href="/service-management">
				<Button themeType="link" size="xl">
					<IcMArrowBack style={{ marginRight: 8 }} />
					{data?.organization_name}
				</Button>
			</Link>
			<div className={styles.flex}>
				<Service item={data} />
				<BuySellServices
					sell_services={data?.sell_services}
					buy_services={data?.buy_services}
					business_details={data?.business_details}
				/>
			</div>

		</div>
	);
}
export default Details;
