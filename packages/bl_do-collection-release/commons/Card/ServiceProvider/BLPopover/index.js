import { cl } from '@cogoport/components';
import { v4 as uuid } from 'uuid';

import renderTooltip from '../../../renderTooltip';

import styles from './styles.module.css';

const COLLECTION_MODE = {
	physical_collection : 'Physical Visit',
	print               : 'Print',
	courier             : 'Delivery by Courier',
	email               : 'Email',
};
const MAX_LENGTH = 12;
export default function BLPopver({ bl_do = '', blDetails = [] }) {
	return (
		<div className={cl`${styles.container} ${styles.main}`}>
			<div className={cl`${styles.container} ${styles.header}`}>
				<div className={cl`${styles.text} ${styles.title}`}>
					{bl_do.toUpperCase()}
					{' '}
					Number
				</div>
				<div className={cl`${styles.text} ${styles.title}`}>Collection Mode</div>
				<div className={cl`${styles.text} ${styles.title}`}>Collected By</div>
			</div>
			{(blDetails || []).map((item) => {
				const { collection_details } = item || {};
				const { name = '' } = collection_details || {};
				return (
					<div className={cl`${styles.container} ${styles.card}`} key={uuid()}>
						<div className={styles.item_content}>{item?.bl_number || '-'}</div>
						<div className={styles.item_content}>
							{COLLECTION_MODE[item?.collection_mode] || '-'}
						</div>
						<div className={cl`${styles.text} ${styles.bl_number}`}>
							{renderTooltip(name || '-', MAX_LENGTH)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
