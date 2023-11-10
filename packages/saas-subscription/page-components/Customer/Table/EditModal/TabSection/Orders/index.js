import { Pagination, Placeholder, cl } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import getOrdersConfig from '../../../../../../configuration/ordersConfig';
import useGetSubscriptionOrder from '../../../../../../hooks/useGetSubscriptionOrder';
import getValues from '../../../../../../utils/getValues';
import EmptyState from '../../EmptyState';

import itemFunction from './itemFunctions';
import styles from './styles.module.css';

function Orders({ info = {}, currentTab = '' }) {
	const { t } = useTranslation(['saasSubscription']);

	const { loading, data, setPage } = useGetSubscriptionOrder({ info });

	const orderConfig = getOrdersConfig({ t });
	const { list = [], page, total_count, page_limit } = data || {};

	const newList = loading ? [...Array(5).keys()] : list;

	if (isEmpty(list)) {
		return (
			<EmptyState currentTab={currentTab} />
		);
	}

	return (
		<>
			<div className={styles.table_container}>
				<div className={cl`${styles.header} ${styles.flex_box}`}>
					{orderConfig.map((config) => (
						<div
							key={config.key}
							className={cl`${styles.col} ${styles[config?.key]}`}
						>
							{startCase(config.label)}

						</div>
					))}
				</div>

				<div className={styles.scroll_container}>
					{(newList || []).map((order) => (
						<div key={order?.id || order} className={styles.flex_box}>

							{orderConfig.map((config) => (
								<div
									key={config.key}
									className={cl`${styles.col} ${styles[config?.key]}`}
								>
									{loading
										? <Placeholder />
										: getValues({
											itemData: order,
											config,
											itemFunction,
										})}
								</div>
							))}
						</div>
					))}
				</div>

			</div>
			<div
				className={styles.flex_box}
				style={{ justifyContent: 'center' }}
			>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>
		</>
	);
}

export default Orders;
