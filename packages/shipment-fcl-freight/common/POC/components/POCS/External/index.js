import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getExternalPocData from '../../../helpers/getExternalPocData';

import Card from './Card';
import styles from './styles.module.css';

function External({ tradePartnersData = {} }) {
	const { external_poc_details: { poc_data = [] } = {} } = tradePartnersData || {};
	const [showDetail, setShowDetail] = useState({});

	const externalData = getExternalPocData(poc_data);

	const relativeData = {
		import : externalData.import || [],
		export : externalData.export || [],
	};

	return ['import', 'export'].map((trade) => (
		<div>
			<div className={styles.header}>
				<div className={styles.heading}>
					External:
					{' '}
					{startCase(trade)}
				</div>

				<div className={styles.row}>
					<div>
						<Button size="sm">+ ADD POC</Button>
					</div>

					<div>
						<Button
							onClick={() => {
								setShowDetail({ ...showDetail, [trade]: !showDetail[trade] });
							}}
							themeType="linkUi"
						>
							{showDetail[trade] ? <IcMArrowRotateUp /> : <IcMArrowRotateDown />}
						</Button>
					</div>
				</div>
			</div>

			{showDetail[trade]
				? (
					<div>
						{(relativeData[trade] || []).map((item) => <Card data={item} />)}
					</div>
				)
				: null}
		</div>
	));
}

export default External;
