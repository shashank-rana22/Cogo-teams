import { Table } from '@cogoport/components';
import { memo, useMemo } from 'react';

import styles from './styles.module.css';
import tableColumns from './tableColumns';

function Footer({ services = [] }) {
	const data = useMemo(
		() => {
			const LINE_ITEMS = [];

			services.forEach((service) => {
				const { line_items = [], service_id = '' } = service || {};

				line_items.forEach((ltm) => LINE_ITEMS.push({ ...(ltm || {}), id: `${ltm?.code} ${service_id}` }));
			});

			return LINE_ITEMS;
		},
		[services],
	);

	console.log(data);
	return (
		<div className={styles.footer}>
			<div>
				<Table columns={tableColumns} data={data} />
			</div>
		</div>
	);
}

export default memo(Footer);
