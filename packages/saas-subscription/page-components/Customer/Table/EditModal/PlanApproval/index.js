import { cl, Button } from '@cogoport/components';
import { IcMCross, IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useApproveUtr from '../../../../../hooks/useApproveUtr';
import EmptyState from '../EmptyState';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const LAST_INDEX = 1;

const getTitle = ({ t }) => ({
	false : t('saasSubscription:utr_title_approve'),
	true  : t('saasSubscription:utr_title_current'),
});

function PlanApproval({ pending_orders = {}, approved_orders = {}, setEditModal, currentTab }) {
	const { t } = useTranslation(['saasSubscription']);

	const [confirm, setConfirm] = useState({ open: false });

	const TITLE_MAPPING = getTitle({ t });
	const plansArr = [approved_orders, pending_orders];
	const isPlanEmpty = isEmpty(approved_orders) && isEmpty(pending_orders);

	const { id: checkoutId = '' } = pending_orders || {};

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
		<div className={styles.main_container}>
			{!isPlanEmpty ? plansArr.map((plan) => {
				const { id: plan_id, transactions = [], plan_name, status } = plan || {};

				const isCompleted = status === 'COMPLETED';

				if (isEmpty(plan)) {
					return null;
				}

				return (
					<div key={plan_id} className={styles.container}>

						<h3 className={styles.title}>
							{`${TITLE_MAPPING[isCompleted]} : ${plan_name || ''}`}
						</h3>

						<div className={cl`${styles.flex_box} ${styles.card_header}`}>
							<div>{t('saasSubscription:utr_no')}</div>
							<div>{t('saasSubscription:utr_file')}</div>
						</div>

						<div key={plan_id} className={styles.scroll_container}>
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

						{!isCompleted ? (
							<div className={styles.cta_container}>
								<Button
									size="sm"
									themeType="secondary"
									loading={loading}
									onClick={() => setConfirm({ open: true, action: 'reject' })}
								>
									<IcMCross />
									{t('saasSubscription:utr_reject')}
								</Button>

								<Button
									size="sm"
									themeType="accent"
									loading={loading}
									onClick={() => setConfirm({ open: true, action: 'approve' })}
								>
									<IcMTick />
									{t('saasSubscription:utr_approve')}
								</Button>
							</div>
						) : null}
					</div>
				);
			}) : <EmptyState currentTab={currentTab} />}

			<ConfirmModal confirm={confirm} setConfirm={setConfirm} clickHandler={clickHandler} loading={loading} />
		</div>
	);
}

export default PlanApproval;
