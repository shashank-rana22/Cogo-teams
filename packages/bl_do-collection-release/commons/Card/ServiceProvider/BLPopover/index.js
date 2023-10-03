import { cl } from '@cogoport/components';

import renderTooltip from '../../../renderTooltip';

import styles from './styles.module.css';

const COLLECTION_MODE = {
	physical_collection : 'Physical Visit',
	print               : 'Print',
	courier             : 'Delivery by Courier',
	email               : 'Email',
};
const SHOW_TOOLTIP_MAX_LENGTH = 12;
export default function BLPopver({ bl_do = '', blDoDetails = [] }) {
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
			{(blDoDetails || []).map((item) => {
				const {
					collection_details,
					collection_mode = '-',
					bl_number = '-',
					do_number = '-',
					document,
				} = item || {};
				const { name = '-' } = collection_details || {};
				const { document_url = '' } = document || {};
				return (
					<div className={cl`${styles.container} ${styles.card}`} key={bl_number}>
						<div
							className={document_url ? cl`${styles.item_content} ${styles.underline}` : undefined}
							role="button"
							tabIndex={0}
							onClick={() => (document_url ? window.open(
								document_url,
								'_blank',
							) : undefined)}
						>
							{bl_do === 'bl' ? bl_number : do_number}

						</div>
						<div className={styles.item_content}>
							{COLLECTION_MODE[collection_mode]}
						</div>
						<div className={cl`${styles.text} ${styles.bl_number}`}>
							{renderTooltip(name, SHOW_TOOLTIP_MAX_LENGTH)}
						</div>
					</div>
				);
			})}
		</div>
	);
}
