import { Button, Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import { getPlanDetailsConfig } from '../../../configuration/planListConfig';
import getValues from '../../../utils/getValues';
import itemFunction from '../../Plan/ItemFunction';

import MetaDataModal from './MetaData';
import styles from './styles.module.css';

function Header({ plan = {}, loading = false }) {
	const [metaData, setMetaData] = useState({});

	const { t } = useTranslation(['saasSubscription']);
	const colFunc = itemFunction({ t });

	const planListConfig = getPlanDetailsConfig({ isPlanDetail: true, t });

	return (
		<>
			<div className={styles.flex_box}>
				{planListConfig.map((config) => (
					<div key={config.key} className={styles.col}>
						<p className={styles.title}>{config?.title}</p>
						<div className={styles.col_value}>
							{loading
								? <Placeholder /> : getValues({ itemData: plan, config, itemFunction: colFunc })}
						</div>
					</div>
				))}

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
					Edit Meta Data

				</Button>
			</div>

			{metaData?.open ? <MetaDataModal metaData={metaData} setMetaData={setMetaData} /> : null}
		</>

	);
}

export default Header;
