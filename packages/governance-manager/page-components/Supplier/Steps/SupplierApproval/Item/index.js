/* eslint-disable no-magic-numbers */
import { Button } from '@cogoport/components';
import { IcCFtick, IcCFcrossInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Item({ t, title, verify, setOpen, type, role }) {
	return (
		<div className={styles.row}>
			<div className={styles.title}>{title}</div>
			<div className={styles.status_button}>
				{{
					verified:
						(
							<div className={styles.status_text}>
								<IcCFtick width={20} height={20} fill="#5CAF3F" />
								<span style={{ marginLeft: '8px', color: '#5CAF3F' }}>
									{t('supplier_page_supplier_approval_item_verified_label')}
								</span>
							</div>
						),
					rejected:
						(
							<div className={styles.status_text}>
								<IcCFcrossInCircle width={20} height={20} fill="#EE3425" />
								<span style={{ marginLeft: '8px', color: '#EE3425' }}>
									{t('supplier_page_supplier_approval_item_rejected_label')}
								</span>
							</div>
						),

				}[verify?.[type]]
				|| (
					<div className={styles.status_text}>
						<IcCFcrossInCircle width={20} height={20} fill="#EE3425" />
						<span style={{ marginLeft: '8px', color: '#EE3425' }}>
							{t('supplier_page_supplier_approval_item_pending_label')}
						</span>
					</div>
				)}
				{
					role === 'governance_lead'
					&& (
						<Button
							className={styles.button}
							size="md"
							themeType="accent"
							onClick={() => {
								setOpen(type);
							}}
							disabled={verify?.[type] && verify?.[type] !== 'pending'}
						>
							{t('supplier_page_supplier_approval_item_open_button_label')}
						</Button>
					)

				}
			</div>

		</div>
	);
}
export default Item;
