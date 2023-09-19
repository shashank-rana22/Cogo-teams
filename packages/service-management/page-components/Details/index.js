import { Button, Loader } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Link } from '@cogoport/next';

import useGetOrganizationServiceDetails from '../../hooks/useGetOrganizationServiceDetails';

import Service from './Service';

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
			<div>
				<Service item={data} />
			</div>
		</div>
	);
}
export default Details;
