import { cl, Button } from '@cogoport/components';
import { IcMCross, IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useApproveUtr from '../../../../../hooks/useApproveUtr';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const LAST_INDEX = 1;

const TITLE = {
	true  : 'Approve Plan',
	false : 'Current Plan',
};

function PlanApproval({ orders_info = {}, setEditModal, showCta }) {
	const { transactions = [], id: checkoutId = '', plan_name = '' } = orders_info || {};

	const [confirm, setConfirm] = useState({ open: false });

	const { loading, approveUtrHandler } = useApproveUtr();

	const clickHandler = async (status) => {
		await approveUtrHandler({
			checkoutId,
			action: status,
		});
		setConfirm({ open: false });
		setEditModal((prev) => ({ ...prev, apiCall: true }));
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>
				{`${TITLE[showCta]} : ${plan_name || ''}`}
			</h3>

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

					{showCta ? (
						<div className={styles.cta_container}>
							<Button
								size="sm"
								themeType="secondary"
								loading={loading}
								onClick={() => setConfirm({ open: true, action: 'reject' })}
							>
								<IcMCross />
								Reject
							</Button>

							<Button
								size="sm"
								themeType="accent"
								loading={loading}
								onClick={() => setConfirm({ open: true, action: 'approve' })}
							>
								<IcMTick />
								Approve
							</Button>
						</div>
					) : null}
				</>
			)
				: <div>No UTR avaliable</div>}

			<ConfirmModal confirm={confirm} setConfirm={setConfirm} clickHandler={clickHandler} loading={loading} />
		</div>
	);
}

export default PlanApproval;
