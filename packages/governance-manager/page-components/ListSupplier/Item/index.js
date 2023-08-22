import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import { SERVICE_NAME_MAPPING } from '../../utils/service-name-mapping';

import styles from './styles.module.css';

function Item({ isSupplierPage = false, item }) {
	const { push } = useRouter();

	return (
		<div className={styles.item}>
			{ isSupplierPage && (
				<div>
					<Button
						themeType="secondary"
						onClick={() => {
							push(
								'/governance-manager/',
								'/governance-manager/',
							);
						}}
					>
						Go Back
					</Button>
				</div>
			)}
			<div>
				<div className={styles.key}>Supplier Name</div>
				<div className={styles.value}>{item?.organization?.business_name}</div>
			</div>
			<div>
				<div className={styles.key}>Home Country</div>
				<div className={styles.value}>Australia</div>
			</div>
			<div>
				<div className={styles.key}>Service Provided</div>
				<div className={styles.value}>
					{SERVICE_NAME_MAPPING[item?.service]}
				</div>
			</div>

			{ !isSupplierPage && (
				<div className={styles.view_btn}>
					<Button
						themeType="accent"
						onClick={() => 	push(
							'/governance-manager/[id]',
							`/governance-manager/${item?.id}`,
						)}
					>
						View
					</Button>
				</div>
			)}

		</div>
	);
}

export default Item;
