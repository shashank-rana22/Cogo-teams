import { Breadcrumb, Tooltip, Stepper } from '@cogoport/components';
import { IcMInfo, IcMArrowBack } from '@cogoport/icons-react';
import { Link, useRouter } from '@cogoport/next';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import { stepperItems } from './contant';
import RevenueBifurcation from './RevenueBifurcation';
import Review from './Review';
import SalaryAndRent from './SalaryAndRent';
import styles from './styles.module.css';

function UploadReport() {
	const [globalStepper, setGlobalStepper] = useState('revenue');
	const { query } = useRouter();

	const { month, entity } = query || {};

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
					active={globalStepper}
					setActive={(val:string) => { setGlobalStepper(val); }}
					items={stepperItems}
					arrowed
				/>
			</div>

			<div className={styles.card}>
				<div className={styles.flex_card_header}>
					<div>
						<div className={styles.flex_card}>
							{globalStepper === 'revenue' && <div>Basis For Shipment Bifurcation</div>}
							{globalStepper === 'salaries' && <div>Salaries & Rent Bifurcation</div>}
							{globalStepper === 'review_details' && <div>Review Details</div>}
							<Tooltip>
								<div className={styles.icon}>
									<IcMInfo />
								</div>

							</Tooltip>
						</div>
						<div className={styles.hr} />
						<div className={styles.flex_card}>
							<div className={styles.month}>
								Month -
								{' '}
								{month}
							</div>
							<div className={styles.month}>
								Entity -
								{' '}
								{startCase(entity)}
							</div>
						</div>

						{globalStepper === 'salaries' && (
							<div className={styles.total_data_view}>
								<div>
									<div className={styles.text_data}>
										Total Unallocable Amount
									</div>
									<div className={styles.amount}>INR 40,00,000</div>
								</div>

								<div className={styles.text_data}>
									Total Allocable Amount
									<div>--------</div>

								</div>
							</div>
						)}
					</div>

				</div>
			</div>

			{globalStepper === 'revenue' && <RevenueBifurcation setGlobalStepper={setGlobalStepper} />}
			{globalStepper === 'salaries' && <SalaryAndRent setGlobalStepper={setGlobalStepper} />}
			{globalStepper === 'review_details' && <Review />}
		</div>
	);
}
export default UploadReport;
