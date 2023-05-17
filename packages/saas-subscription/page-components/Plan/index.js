import { cl, Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import planListConfig from '../../configuration/planListConfig';

import styles from './styles.module.css';

const dummy = [
	{
		id            : '100054',
		plan_name     : 'Standard',
		family        : 'Channel Partner',
		status        : 'active',
		last_modified : '30',
	},
	{
		id            : '100064',
		plan_name     : 'Standard',
		family        : 'Channel Partner',
		status        : 'active',
		last_modified : '30',
	},
	{
		id            : '100074',
		plan_name     : 'Standard',
		family        : 'Channel Partner',
		status        : 'active',
		last_modified : '30',
	},
];

function Plan() {
	const { push } = useRouter();
	const redirectHandler = (id) => {
		push('/saas-subscription/plan/[sub_id]', `/saas-subscription/plan/${id}`);
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
						<div className={styles.col} style={{ width: config?.width }}>{config?.title}</div>
					))}
				</div>
				{dummy.map((item) => (
					<div
						className={cl`${styles.row} ${styles.item_row}`}
						role="presentation"
						onClick={() => redirectHandler(item?.id)}
					>
						{planListConfig.map((config) => (
							<div className={styles.col} style={{ width: config?.width }}>{item?.[config.key]}</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
export default Plan;
