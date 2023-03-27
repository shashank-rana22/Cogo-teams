import { Button, TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetExpertiseParameters from '../../hooks/useGetExpertiseParameters';
import useGetKamExpertiseConfig from '../../hooks/useGetKamExpertiseConfig';
import useGetKamExpertiseCurrentConfig from '../../hooks/useGetKamExpertiseCurrentConfig';
import usePublishDraft from '../../hooks/usePublishDraft';

import CurrentConfigurations from './CurrentConfigurations';
import PublishVersionModal from './PublishVersionModal';
import styles from './styles.module.css';
import KamExpertiseScoreConfig from './Tabs/KamExpertiseScore';
import KamLevel from './Tabs/KamLevel';

const TAB_PANEL_MAPPING = {
	configurations: {
		name      : 'kam-expertise-score-config',
		title     : 'Kam Expertise Score Config',
		Component : KamExpertiseScoreConfig,
	},
	relations: {
		name      : 'kam-level-config',
		title     : 'Kam Level Config',
		Component : KamLevel,
	},
};

function ViewAllConfigs() {
	const router = useRouter();

	const [activeConfigTab, setActiveConfigTab] = useState('kam-expertise-score-config');
	const [responseId, setResponseId] = useState('');
	const [mainLoading, setMainLoading] = useState();
	const [showPublishModal, setShowPublishModal] = useState(false);
	const [onPublish, setOnPublish] = useState('');

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const { listKamExpertiseCurrentConfigs = {}, ConfigCardLoading, cardRefetch } = useGetKamExpertiseCurrentConfig();
	const { kamConfigDetails, levelLoading, refetch } = useGetKamExpertiseConfig({ responseId });
	const { listExpertiseParams, expertiseLoading, expertiseRefetch } = useGetExpertiseParameters();
	const { onCreate, loading: publishLoading } = usePublishDraft({ setShowPublishModal, setOnPublish });

	const componentProps = {
		'kam-expertise-score-config': {
			setMainLoading,
			listExpertiseParams,
			expertiseLoading,
			expertiseRefetch,
			cardRefetch,
		},
		'kam-level-config': {
			setMainLoading,
			levelLoading,
			kamConfigDetails,
			refetch,
			cardRefetch,
		},
	};

	return (
		<section className={styles.main_container}>
			<div className={styles.back_container} role="presentation" onClick={onClickBack}>
				<div className={styles.icon_container}>
					<IcMArrowBack width={16} height={16} />
				</div>
				<div className={styles.back_text}>
					Back to Dashboard
				</div>
			</div>

			<section className={styles.container}>
				<div className={styles.heading_container}>
					Configurations
				</div>

				<CurrentConfigurations
					listKamExpertiseCurrentConfigs={listKamExpertiseCurrentConfigs}
					ConfigCardLoading={ConfigCardLoading}
					responseId={responseId}
					setResponseId={setResponseId}
					refetch={refetch}
					expertiseRefetch={expertiseRefetch}
					cardRefetch={cardRefetch}
					onPublish={onPublish}
					setOnPublish={setOnPublish}
				/>

				<div className={styles.tab_list}>
					<Tabs activeTab={activeConfigTab} themeType="secondary" onChange={setActiveConfigTab}>
						{Object.values(TAB_PANEL_MAPPING).map((item) => {
							const { name = '', title = '', Component } = item;

							return Component ? (
								<TabPanel key={name} name={name} title={title}>
									<Component
										{...componentProps[name] || {}}
									/>
								</TabPanel>
							) : null;
						})}
					</Tabs>

					<Button
						themeType="primary"
						className={styles.pub_button}
						disabled={mainLoading || ConfigCardLoading || isEmpty(listKamExpertiseCurrentConfigs)}
						onClick={() => setShowPublishModal(true)}
					>
						Publish

					</Button>

					{showPublishModal && (
						<PublishVersionModal
							setShowPublishModal={setShowPublishModal}
							showPublishModal={showPublishModal}
							onCreate={onCreate}
							publishLoading={publishLoading}
						/>
					)}
				</div>
			</section>
		</section>
	);
}

export default ViewAllConfigs;
