import { cl, Button } from '@cogoport/components';
import { IcMCross, IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useApproveUtr from '../../../../../hooks/useApproveUtr';

import styles from './styles.module.css';

const LAST_INDEX = 1;

function PlanApproval({ pending_orders = {} }) {
	const { transactions = [], id: checkoutId = '' } = pending_orders || {};

	const { loading, approveUtrHandler } = useApproveUtr();

	const clickHandler = (status) => {
		approveUtrHandler({
			checkoutId,
			action: status,
		});
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Approve Plans</h3>

			{!isEmpty(transactions) ? (
				<>
					<div className={cl`${styles.flex_box} ${styles.card_header}`}>
						<div>UTR No.</div>
						<div>UTR File</div>
					</div>

					<div className={styles.scroll_container}>
						{(transactions || []).map((item) => 	{
							const { id = '', url = '', utr = '' } = item || {};
							const fileArr = url.split('/') || [];
							const fileName = fileArr[fileArr.length - LAST_INDEX];

							return (
								<div key={id} className={cl`${styles.flex_box} ${styles.row}`}>
									<div>{utr}</div>

									<div
										className={styles.file_url}
										onClick={() => window.open(url, '_blank')}
										role="presentation"
									>
										<span>{fileName}</span>
									</div>
								</div>
							);
						})}
					</div>

					<div className={styles.cta_container}>
						<Button
							size="sm"
							themeType="secondary"
							loading={loading}
							onClick={() => clickHandler('reject')}
						>
							<IcMCross />
							Reject
						</Button>

						<Button
							size="sm"
							themeType="accent"
							loading={loading}
							onClick={() => clickHandler('approve')}
						>
							<IcMTick />
							Approve
						</Button>
					</div>
				</>
			)
				: <div>No UTR avaliable</div>}
		</div>
	);
}

export default PlanApproval;
