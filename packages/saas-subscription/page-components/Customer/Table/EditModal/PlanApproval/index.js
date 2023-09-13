import { cl, Button } from '@cogoport/components';
import { IcMCross, IcMTick } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import useApproveUtr from '../../../../../hooks/useApproveUtr';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const LAST_INDEX = 1;

const getTitle = ({ t }) => ({
	true  : t('saasSubscription:utr_title_approve'),
	false : t('saasSubscription:utr_title_current'),
});

function PlanApproval({ orders_info = {}, setEditModal, showCta }) {
	const { transactions = [], id: checkoutId = '', plan_name = '' } = orders_info || {};

	const { t } = useTranslation(['saasSubscription']);

	const [confirm, setConfirm] = useState({ open: false });

	const { loading, approveUtrHandler } = useApproveUtr();

	const TITLE_MAPPING = getTitle({ t });

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
				{`${TITLE_MAPPING[showCta]} : ${plan_name || ''}`}
			</h3>

			{!isEmpty(transactions) ? (
				<>
					<div className={cl`${styles.flex_box} ${styles.card_header}`}>
						<div>{t('saasSubscription:utr_no')}</div>
						<div>{t('saasSubscription:utr_file')}</div>
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
				</>
			)
				: <div>{t('saasSubscription:utr_empty')}</div>}

			<ConfirmModal confirm={confirm} setConfirm={setConfirm} clickHandler={clickHandler} loading={loading} />
		</div>
	);
}

export default PlanApproval;
