import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
import { useState } from 'react';

import DeleteInvoice from '../DeleteSingleInvoice/DeleteInvoice';

import styles from './styles.module.css';

function PopoverContent({ payrunName = '', itemData = {}, refetch = () => {}, overseasData = '' }) {
	const [showDeleteInvoiceModal, setShowDeleteInvoiceModal] = useState(false);

	return (
		<div>
			<div>
				<div className={styles.section}>Transaction Type:</div>
				<div className={styles.styled_link}>{payrunName}</div>
			</div>
			<div>
				<Button
					size="sm"
					style={{ marginTop: '4px' }}
					themeType="primary"
					onClick={() => setShowDeleteInvoiceModal(true)}
				>
					Delete
				</Button>
			</div>
			{showDeleteInvoiceModal
				? (
					<DeleteInvoice
						showDeleteInvoiceModal={showDeleteInvoiceModal}
						setShowDeleteInvoiceModal={setShowDeleteInvoiceModal}
						itemData={itemData}
						refetch={refetch}
						overseasData={overseasData}
					/>
				) : null}
		</div>
	);
}

function ShowAction({
	itemData = {}, refetch = () => {}, overseasData = '',
}) {
	const { payrunName = '' } = itemData;

	return (
		<div>
			<Popover
				placement="left"
				render={(
					<PopoverContent
						payrunName={payrunName}
						itemData={itemData}
						refetch={refetch}
						overseasData={overseasData}
					/>
				)}
			>
				<div>
					<IcMOverflowDot height={16} width={16} style={{ cursor: 'pointer' }} />
				</div>
			</Popover>
		</div>
	);
}

export default ShowAction;
