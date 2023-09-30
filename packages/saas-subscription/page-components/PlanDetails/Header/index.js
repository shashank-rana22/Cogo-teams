import { Button, Placeholder, Toggle, cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

import { getPlanDetailsConfig } from '../../../configuration/planListConfig';
import useUpdatePlanData from '../../../hooks/useUpdatePlanData';
import getValues from '../../../utils/getValues';
import itemFunction from '../../Plan/ItemFunction';

import MetaDataModal from './MetaData';
import styles from './styles.module.css';

function Header({ plan = {}, loading = false, setFeatureModal }) {
	const { t } = useTranslation(['saasSubscription']);

	const initialRender = useRef(false);

	const [metaData, setMetaData] = useState({});
	const [planStatus, setPlanStatus] = useState(true);

	const colFunc = itemFunction({ t });

	const planListConfig = getPlanDetailsConfig({ isPlanDetail: true, t });
	const { loading: updatePlanLoading, submitHandler } = useUpdatePlanData();

	const changePlanStatusHandler = async (value) => {
		await submitHandler({
			payload: {
				id        : plan?.id,
				is_active : value,
			},
		});
		setFeatureModal({ apiCall: true });
	};

	useEffect(() => {
		if (!isEmpty(plan)) {
			setPlanStatus(plan?.is_active);
		}
	}, [plan]);

	return (
		<>
			<div className={styles.flex_box}>
				<div className={cl`${styles.flex_box} ${styles.first_sec}`}>
					{planListConfig.map((config) => (
						<div key={config.key} className={styles.col}>
							<p className={styles.title}>{config?.title}</p>
							<div className={styles.col_value}>
								{loading
									? <Placeholder /> : getValues({ itemData: plan, config, itemFunction: colFunc })}
							</div>
						</div>
					))}
				</div>

				<div className={cl`${styles.flex_box} ${styles.second_sec}`}>
					<div>
						<p className={styles.title}>Plan Status</p>
						<Toggle
							size="sm"
							onLabel="Active"
							offLabel="Inactive"
							checked={planStatus}
							disabled={updatePlanLoading}
							onChange={(e) => {
								initialRender.current = true;
								changePlanStatusHandler(e.target.checked);
							}}
						/>
					</div>

					<Button
						themeType="linkUi"
						onClick={() => {
							setMetaData({
								open : true,
								info : plan?.metadata,
								id   : plan?.id,
							});
						}}
					>
						{t('saasSubscription:edit_meta_data')}
					</Button>
				</div>

			</div>

			{metaData?.open ? (
				<MetaDataModal
					metaData={metaData}
					setMetaData={setMetaData}
					setFeatureModal={setFeatureModal}
				/>
			) : null}
		</>

	);
}

export default Header;
