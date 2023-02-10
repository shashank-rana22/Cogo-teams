import { Button, Breadcrumb } from '@cogoport/components';

import DetailFilters from './DetailFilters';
import styles from './styles.module.css';

function Header({
	params,
	setParams,
	partner_id,
	locale,
}) {
	return (
		<div className={styles.header_container}>
			<Breadcrumb>
				<Breadcrumb.Item
					label={<a href={`/v2/${locale}/${partner_id}/allocation/core-engine/`}>Core Engine</a>}
				/>
				<Breadcrumb.Item label="Allocation Details" />
			</Breadcrumb>

			<DetailFilters params={params} setParams={setParams} />

			<Button size="md" themeType="accent" style={{ marginLeft: '8px' }}>Approve</Button>
		</div>
	);
}

export default Header;
