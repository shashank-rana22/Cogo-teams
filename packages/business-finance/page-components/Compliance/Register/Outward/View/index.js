import { Breadcrumb, Input } from '@cogoport/components';
import { IcMArrowBack, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Filter from '../../../../commons/Filters/index.tsx';
import StyledTable from '../../../../commons/StyledTable/index.tsx';
import { getSupplierData } from '../helper';

import ViewColumn from './ ViewColumn';
import filterControls from './filterControls';
import styles from './styles.module.css';

function View() {
	const [filters, setFilters] = useState({});
	const { push } = useRouter();
	const GoBack = () => {
		push(
			'/business-finance/compliance/[active_tab]/[sub_active_tab]',
			'/business-finance/compliance/register/outward',
		);
	};

	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Item label="Outward" onClick={GoBack} className={styles.breadcrumb} />
				<Breadcrumb.Item label="Supplier -  BLUE BELL LOGISTICS PRIVATE LIMITED.." />
			</Breadcrumb>

			<div className={styles.back_button} onClick={GoBack} role="presentation">
				<IcMArrowBack height="20px" width="20px" />
				<div className={styles.go_back}>GO BACK</div>
			</div>
			<div className={styles.supplier_card}>
				{getSupplierData().map((item) => (
					<div key={item?.heading} className={styles.name_value}>
						{item?.heading}
						<div className={styles.value_data}>{item?.value}</div>
					</div>
				))}
			</div>

			<div className={styles.filters_data}>
				<Filter controls={filterControls} setFilters={setFilters} filters={filters} pageKey="page" />

				<div>
					<Input
						value={filters?.search || ''}
						onChange={(value) => setFilters({
							...filters,
							search: value || undefined,
						})}
						placeholder="Search by Trade Party Name/PAN/GSTIN"
						size="sm"
						style={{ width: '340px' }}
						suffix={(
							<IcMSearchlight
								height={20}
								width={20}
							/>
						)}
					/>
				</div>
			</div>

			<div className={styles.table_body}>
				<StyledTable data={[{}]} columns={ViewColumn()} loading={false} imageFind="" />
			</div>

		</div>
	);
}
export default View;
