import { Breadcrumb } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import { getSupplierData } from '../helper';

import styles from './styles.module.css';

function View() {
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

		</div>
	);
}
export default View;
