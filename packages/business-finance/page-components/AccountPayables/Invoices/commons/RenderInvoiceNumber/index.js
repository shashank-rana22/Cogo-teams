import { Tooltip } from '@cogoport/components';
import { getByKey, isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const FIRST_ELEMENT_INDEX = 0;

function RenderInvoiceNumber({ itemData = {}, field = {} }) {
	const { topKey, lowerKey } = field || {};

	function Element(type, key, maxLength) {
		if (type === 'href') {
			const content = getByKey(itemData, key) || '';
			if (content?.length > maxLength) {
				return (
					<Tooltip interactive placement="top" content={content}>
						<text
							className={styles.link}
							onClick={() => window.open(getByKey(itemData, topKey?.redirectKey), '_blank')}
						>
							{`${content.substring(FIRST_ELEMENT_INDEX, maxLength)}...`}
						</text>
					</Tooltip>
				);
			}
			return (
				<text
					className={styles.link}
					onClick={() => window.open(getByKey(itemData, topKey?.redirectKey), '_blank')}
				>
					{content}
				</text>
			);
		} if (type === 'tag') {
			return (
				<text className={styles.lower_keys}>
					{startCase(getByKey(itemData, key))}
				</text>
			);
		}
		return (<div>{getByKey(itemData, key)}</div>);
	}
	return (
		<div className={styles.flex_container}>
			{!isEmpty(topKey) ? Element(topKey?.type, topKey?.key, topKey?.maxLength) : null}
			{!isEmpty(lowerKey) ? Element(lowerKey?.type, lowerKey?.key) : null}
		</div>
	);
}

export default RenderInvoiceNumber;
