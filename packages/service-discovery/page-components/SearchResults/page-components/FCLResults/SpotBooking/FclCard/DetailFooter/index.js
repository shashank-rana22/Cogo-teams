import { cl } from '@cogoport/components';
import { useState } from 'react';

import BottomTabs from './BottomTabs';
import TermsConditions from './BottomTabs/TermsConditions';
import DetentionDemurrage from './DetentionDemurrage';
import styles from './styles.module.css';

function DetailFooter({ detail = {}, setDetentionValues = () => {}, detentionValues = {} }) {
	const [activeTab, setActiveTab] = useState('');

	const TABS_MAPPING = {
		terms_and_condition: {
			key       : 'terms_and_condition',
			label     : 'T&C',
			component : TermsConditions,
			props     : {
				detail,
			},
		},
	};

	return (
		<div>
			<div className={styles.container}>
				<DetentionDemurrage
					setDetentionValues={setDetentionValues}
					detentionValues={detentionValues}
				/>

				<div className={styles.other_details}>
					<div className={styles.wrapper}>
						{Object.keys(TABS_MAPPING).map((item) => {
							const { visible = true } = TABS_MAPPING[item];

							if (!visible) {
								return null;
							}

							return (
								<span
									role="presentation"
									key={item}
									className={cl`${styles.other_details_tag} 
								${activeTab === item ? styles.selected : {}}`}
									onClick={() => {
										if (activeTab === item) {
											setActiveTab('');
										} else setActiveTab(item);
									}}
								>
									<div className={styles.tab_label_container}>
										{TABS_MAPPING[item].label}
									</div>
								</span>
							);
						})}
					</div>
				</div>
			</div>

			{activeTab ? (
				<BottomTabs
					TABS_MAPPING={TABS_MAPPING}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					detail={detail}
				/>
			) : null}
		</div>
	);
}

export default DetailFooter;
