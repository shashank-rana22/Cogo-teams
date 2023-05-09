import { Accordion } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import MAPPING from './MAPPING';
import styles from './styles.module.css';

function LeftComponent({ activeTab, setActiveTab }) {
	return (
		<div className={styles.container}>
			{MAPPING.map((item, index) => {
				const { key, title, children } = item || {};

				if (isEmpty(children)) {
					return (
						<div
							key={key}
							role="presentation"
							onClick={() => setActiveTab(key)}
							className={`${styles.ind_container} ${activeTab === key && styles.active_tab}`}
						>
							<div className={styles.number}>
								<div className={styles.index}>{index + 1}</div>
							</div>
							<div>{title}</div>
						</div>
					);
				}

				const isActiveTab = children.map((childItem) => childItem.key).includes(activeTab);

				return (
					<div className={`${styles.item} ${isActiveTab && styles.active_tab}`}>
						<Accordion
							type="text"
							title={(
								<div className={styles.flex}>
									<div className={styles.number}>
										<div className={styles.index}>{index + 1}</div>
									</div>
									<div>{title}</div>
								</div>
							)}
						>
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
