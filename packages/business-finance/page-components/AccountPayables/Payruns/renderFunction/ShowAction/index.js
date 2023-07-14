import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';

import useDeleteInvoice from '../../hooks/useDeleteInvoice';

import styles from './styles.module.css';

function PopoverContent({ payrunName = '', id = '' }) {
	const {
		deleteinvoiceLoading,
		deleteInvoice,
	} = useDeleteInvoice({});
	return (
		<div>
			<div>
				<div className={styles.section}>Transaction Type:</div>
				<div className={styles.styled_link}>{payrunName}</div>
			</div>
			<div>
				<Button
					size="sm"
					disabled={deleteinvoiceLoading}
					style={{ marginTop: '4px' }}
					themeType="primary"
					onClick={() => deleteInvoice(id)}
				>
					Delete
				</Button>
			</div>
		</div>
	);
}

function ShowAction({
	itemData = {},
}) {
	const { payrunName = '', id = '' } = itemData;

	return (
		<div>
			<Popover
				placement="left"
				render={<PopoverContent payrunName={payrunName} id={id} />}
			>
				<div>
					<IcMOverflowDot height={16} width={16} style={{ cursor: 'pointer' }} />
				</div>
			</Popover>
		</div>
	);
}

export default ShowAction;
