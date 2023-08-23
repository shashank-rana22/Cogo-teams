import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import { SERVICE_NAME_MAPPING } from '../../utils/service-name-mapping';

import styles from './styles.module.css';

function Item({ t, isSupplierPage = false, item }) {
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
						{
							t('supplier_page_card_go_back_btn_title')
						}
					</Button>
				</div>
			)}
			<div>
				<div className={styles.key}>
					{t('supplier_page_card_name_title')}
				</div>
				<div className={styles.value}>{item?.organization?.business_name}</div>
			</div>
			<div>
				<div className={styles.key}>
					{t('supplier_page_card_home_country_title')}
				</div>
				<div className={styles.value}>{item?.organization?.country?.name}</div>
			</div>
			<div>
				<div className={styles.key}>
					{t('supplier_page_card_service_provieded_title')}
				</div>
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
