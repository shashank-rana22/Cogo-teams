import { Pagination, Placeholder, cl } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useTranslation } from 'next-i18next';

import getPlanListConfig from '../../configuration/planListConfig';
import useGetPlanList from '../../hooks/useGetPlanList';
import getValues from '../../utils/getValues';

import itemFunction from './ItemFunction';
import styles from './styles.module.css';

const LOADER_COUNT = 5;

function Plan() {
	const { push } = useRouter();

	const { t } = useTranslation(['saasSubscription']);
	const planListConfig = getPlanListConfig({ t });
	const functions = itemFunction({ t });

	const { loading = false, planList = {}, pageChangeHandler } = useGetPlanList();
	const { list = [], page = 0, page_limit = 0, total_count = 0 } = planList || {};
	const newList = loading ? [...Array(LOADER_COUNT).keys()] : list;

	const redirectHandler = (id) => {
		push('/saas-subscription/plan/[plan_id]', `/saas-subscription/plan/${id}`);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.flex_box}>
				<h2>{t('saasSubscription:plan_title')}</h2>
			</div>
			<div className={styles.container}>

				<div className={cl`${styles.row} ${styles.card_header}`}>
					{planListConfig.map((config) => (
						<div
							key={config.key}
							className={styles.col}
							style={{ width: config?.width }}
						>
							{config?.title}
						</div>
					))}
				</div>

				{(newList || []).map((item) => (
					<div
						key={item?.id}
						className={cl`${styles.row} ${styles.item_row}`}
						role="presentation"
						onClick={() => redirectHandler(item?.id)}
					>
						{planListConfig.map((config) => (
							<div
								key={`${item?.id}_${config?.key}`}
								className={styles.col}
								style={{ width: config?.width }}
							>
								{loading ? <Placeholder height="30px" />
									: getValues({ itemData: item, config, itemFunction: functions })}

							</div>
						))}
					</div>
				))}

				{!loading && (
					<div className={styles.pagination_container}>
						<Pagination
							type="number"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={pageChangeHandler}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
export default Plan;
