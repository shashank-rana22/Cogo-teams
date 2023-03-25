import { Breadcrumb, CheckboxGroup, Tooltip, Stepper } from '@cogoport/components';
import { IcMInfo, IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { useState } from 'react';

import { checkBoxOptions, stepperItems } from './contant';
import RevenueBifurcation from './RevenueBifurcation';
import styles from './styles.module.css';

function UploadReport() {
	const [global, setGlobal] = useState({ stepper: 'revenue', checkBox: '' });
	const { query } = useRouter();

	const { month } = query || {};

	return (
		<div>
			<div>
				<Breadcrumb>
					<Breadcrumb.Item
						label={(
							<Link
								href="/business-finance/cogo-book/pl_statement"
							>
								<div className={styles.title_item}>P&L Statement</div>
							</Link>
						)}
					/>
					<Breadcrumb.Item label="Upload & Generate Report" />
				</Breadcrumb>
			</div>

			<div className={styles.main_icon}>
				<div className={styles.back_icon}>
					<IcMArrowBack height="15px" width="15px" />
				</div>

				<div className={styles.title}>P&L Statement</div>
			</div>

			<div className={styles.stepper}>
				<Stepper
					active={global?.stepper}
					setActive={(val:string) => { setGlobal((prev) => ({ ...prev, stepper: val })); }}
					items={stepperItems}
					arrowed
				/>
			</div>

			<div className={styles.card}>
				<div className={styles.flex_card_header}>
					<div>
						<div className={styles.flex_card}>
							<div>Basis For Shipment Bifurcation</div>
							<Tooltip>
								<div className={styles.icon}>
									<IcMInfo />
								</div>

							</Tooltip>
						</div>
						<div className={styles.hr} />
					</div>

					<div className={styles.month}>
						Month -
						{' '}
						{month}
					</div>
				</div>

				<CheckboxGroup
					options={checkBoxOptions}
					onChange={(val:string) => { setGlobal((prev) => ({ ...prev, checkBox: val })); }}
					value={global?.checkBox}
				/>
			</div>
			{global?.stepper === 'revenue' && <RevenueBifurcation />}
		</div>
	);
}
export default UploadReport;
