import { RadioGroup, Button, cl } from '@cogoport/components';
import { useState } from 'react';

import useUpdatePlan from '../../../../../hooks/useUpdatePlan';
import styles from '../styles.module.css';

const getOptions = (data = []) => (
	(data || []).map((ele) => ({
		value: ele?.id, label: ele?.name,
	}))
);

function Plan({ subscriptionId = '', modalChangeHandler }) {
	const [planId, setPlanId] = useState('');
	const {
		loading = false,
		changePlanHandler, listData = {},
	} = useUpdatePlan({ planId, subscriptionId, modalChangeHandler });

	const { list = [] } = listData || {};
	const options = getOptions(list);
	return (
		<>
			<div className={styles.plan_container}>
				<RadioGroup options={options} onChange={setPlanId} value={planId} />
			</div>
			<div className={cl`${styles.flex_box} ${styles.footer}`}>
				<Button
					themeType="secondary"
					type="submit"
					loading={loading}
					onClick={modalChangeHandler}
				>
					Cancel
				</Button>
				<Button
					themeType="accent"
					type="submit"
					className={styles.save_btn}
					loading={loading}
					onClick={changePlanHandler}
				>
					Save
				</Button>
			</div>
		</>
	);
}

export default Plan;
