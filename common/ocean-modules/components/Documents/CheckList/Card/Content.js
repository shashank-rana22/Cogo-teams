import { Button, cl } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';

import VerticleLine from '../VerticleLine';

import styles from './styles.module.css';

function Content({
	extraItem,
	idx,
	data,
	isChecked,
	item,
	handleSave,
	handleView,
	primary_service,
}) {
	const isBlReleased = [
		'approved',
		'released',
		'surrendered',
		'delivered',
	].includes(extraItem?.bl_detail_status);

	const tradeType = primary_service?.trade_type;

	return (
		<div className={styles.single_item}>
			<VerticleLine
				checked={isChecked}
				isLast={data.length === idx + 1}
			/>
			<div className={isChecked ? styles.single_item_child : styles.upload_item}>

				<div className={styles.main}>
					<div className={styles.heading}>{item?.label.split('Upload').slice(-1)[0]}</div>
					{isChecked ? (
						<div className={styles.gap}>
							<div className={styles.upload_info}>
								Uploaded By:&nbsp;
								{extraItem?.uploaded_by_user?.name
									|| extraItem?.uploaded_by_org?.business_name}

							</div>
							<div className={styles.upload_info}>
								Uploaded On:&nbsp;
								{format(extraItem?.created_at, 'dd MMM yyyy')}

							</div>
							<div className={cl`${styles.document_status}
							 ${['document_amendment_requested', 'document_rejected'].includes(extraItem?.state)
								? styles.pending : styles.accepted}`}
							>
								{startCase(extraItem?.state?.split('_')?.[1])}
							</div>
						</div>
					) : (
						<div className={styles.gap}>
							{item?.pendingItem ? (
								<div className={styles.upload_info}>
									Due On:&nbsp;
									{format(item?.pendingItem?.deadline, 'dd MMM yyyy')}

								</div>
							) : null}
						</div>
					)}
				</div>
				{isChecked ? (
					<div className={styles.action_container}>

						{(!(
							[
								'draft_bill_of_lading',
								'house_bill_of_lading',
								'bill_of_lading',
							].includes(extraItem?.document_type) && tradeType === 'export'
						)
						|| isBlReleased)
							? (
								<>
									<Button
										themeType="link"
										onClick={() => handleView(extraItem?.document_url)}
									>
										View
									</Button>
									<Button
										themeType="link"
										onClick={() => handleSave(extraItem?.document_url)}
									>
										Download
									</Button>
								</>
							) : null}

					</div>
				) : null }

			</div>

		</div>
	);
}
export default Content;
