import { RadioGroup, Button, cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useUpdatePlan from '../../../../../hooks/useUpdatePlan';
import styles from '../styles.module.css';

const getOptions = (data = []) => (
	(data || []).map((ele) => ({
		value: ele?.id, label: ele?.name,
	}))
);

function Plan({ extraInfo: featureInfo = {}, modalChangeHandler }) {
	const { t } = useTranslation(['saasSubscription']);
	const [planId, setPlanId] = useState('');

	const {
		loading = false,
		changePlanHandler, listData = {},
	} = useUpdatePlan({ planId, featureInfo, modalChangeHandler });

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
					type="button"
					loading={loading}
					onClick={() => modalChangeHandler(false)}
				>
					{t('saasSubscription:cancel')}
				</Button>
				<Button
					themeType="accent"
					type="button"
					className={styles.save_btn}
					loading={loading}
					onClick={changePlanHandler}
				>
					{t('saasSubscription:save')}
				</Button>
			</div>
		</>
	);
}

export default Plan;
