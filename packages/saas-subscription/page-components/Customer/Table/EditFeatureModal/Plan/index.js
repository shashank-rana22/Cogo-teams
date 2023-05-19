import { RadioGroup, Button, cl } from '@cogoport/components';
import { useState } from 'react';

import useUpdatePlan from '../../../../../hooks/useUpdatePlan';
import styles from '../styles.module.css';

const getOptions = (data = []) => (
	(data || [])?.map((ele) => ({
		value: ele?.id, label: ele?.name,
	}))
);

function Plan({ cancelHandler, subscriptionId = '', successHandler }) {
	const [plan, setPlan] = useState('R1');
	const { loading, changePlanHandler, listData = [] } = useUpdatePlan({ plan, subscriptionId, successHandler });
	const options = getOptions(listData?.list);
	return (
		<>
			<div className={styles.plan_container}>
				<RadioGroup options={options} onChange={setPlan} value={plan} />
			</div>
			<div className={cl`${styles.flex_box} ${styles.footer}`}>
				<Button themeType="secondary" loading={loading} onClick={cancelHandler}>Cancel</Button>
				<Button
					themeType="accent"
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
