import { IcMCross, IcMListView } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState } from 'react';

import { ELEMENT_MAPPING, getFooterItems } from './getfooterHelpers';
import styles from './styles.module.css';

const EMPTY_FUNC = () => {};

function FooterItems({ response }) {
	const [showFooter, setShowFooter] = useState(false);
	const { list = [], type = '' } = getFooterItems(response);
	const mapFunc = ELEMENT_MAPPING[type] || EMPTY_FUNC;

	if (isEmpty(list)) {
		return null;
	}

	return (
		<>
			{type !== 'buttons' && (
				<div
					role="button"
					tabIndex={0}
					className={styles.list_button}
					onClick={() => setShowFooter((p) => !p)}
				>
					{showFooter ? (
						<span className={styles.btn_container}>
							<IcMCross className={styles.btn_icon} />
							Hide
						</span>
					) : (
						<span className={styles.btn_container}>
							<IcMListView className={styles.btn_icon} />
							{startCase(type)}
						</span>
					)}
				</div>
			)}
			{(showFooter || type === 'buttons') && (
				<div className={styles.list_container}>
					{(list || []).map(mapFunc)}
				</div>
			)}
		</>
	);
}
export default FooterItems;
