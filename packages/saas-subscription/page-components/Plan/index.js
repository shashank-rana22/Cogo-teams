import { Pagination, Placeholder, cl, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import planListConfig from '../../configuration/planListConfig';
import useGetPlanList from '../../hooks/useGetPlanList';
import getValues from '../../utils/getValues';

import itemFunction from './ItemFunction';
import styles from './styles.module.css';

function Plan() {
	const { push } = useRouter();

	const { loading = false, planList = {}, pageChangeHandler } = useGetPlanList();
	const { list, page, page_limit, total_count } = planList || {};
	const newList = loading ? [1, 2, 3, 4, 5] : list;

	const redirectHandler = (id) => {
		push('/saas-subscription/plan/[plan_id]', `/saas-subscription/plan/${id}`);
	};

	return (
		<div className={styles.main_container}>
			<div className={styles.flex_box}>
				<h2>Plans</h2>
				<Button themeType="accent">Add </Button>
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
									: getValues({ itemData: item, config, itemFunction })}

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
