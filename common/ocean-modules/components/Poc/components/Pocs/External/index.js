import { Button } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import getExternalPocData from '../../../helpers/getExternalPocData';

import Card from './Card';
import styles from './styles.module.css';

function External({ tradePartnersData = {}, setAddPoc = () => {}, rolesPermission = {} }) {
	const { external_poc_details: { poc_data = [] } = {} } = tradePartnersData || {};
	const [showDetail, setShowDetail] = useState({});

	const externalData = getExternalPocData(poc_data);

	const relativeData = {
		import : externalData.import || [],
		export : externalData.export || [],
	};
	const { organization_branch_name = '' } = poc_data[0] || {};

	const addPermission = {
		import : !!rolesPermission?.add_external_import_poc,
		export : !!rolesPermission?.add_external_import_poc,
	};

	return ['import', 'export'].map((trade) => (
		<div key={trade}>
			<div className={styles.header}>
				<div className={styles.heading}>
					External:&nbsp;
					{startCase(trade)}
				</div>

				<div className={styles.row}>
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

					{addPermission[trade] ? (
						<div>
							<Button
								size="sm"
								onClick={() => {
									setAddPoc({
										poc_type   : 'external',
										organization_branch_name,
										trade_type : trade,
									});
								}}
								themeType="accent"
							>
								+ ADD POC
							</Button>
						</div>
					) : null}
				</div>
			</div>

			{showDetail[trade]
				? (
					<div>
						{(relativeData[trade] || []).map((item) => <Card key={item?.id} data={item} />)}
					</div>
				)
				: null}
		</div>
	));
}

export default External;
