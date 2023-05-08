import { Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

function LeftComponent({ activeTab, setActiveTab }) {
	console.log('activeTab', activeTab);

	return (
		<div className={styles.container}>
			{MAPPING.map((item) => {
				const { key, title, children } = item || {};

				if (isEmpty(children)) {
					return (
						<div
							key={key}
							role="presentation"
							onClick={() => setActiveTab(key)}
							className={styles.ind_container}
						>
							{title}
						</div>
					);
				}

				return (
					<div className={styles.item}>
						<Accordion type="text" title={title}>
							{children.map((childItem) => {
								const { key:childKey, title:childTitle } = childItem || {};

								return (
									<div
										key={childKey}
										role="presentation"
										onClick={() => setActiveTab(childKey)}
										className={`${styles.child_container}
                                         ${activeTab === childKey && styles.active}`}
									>
										{childTitle}
									</div>
								);
							})}
						</Accordion>
					</div>
				);
			})}
		</div>
	);
}

export default LeftComponent;
