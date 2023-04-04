import { Button, TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import { TAB_PANEL_MAPPING, CONSTANT_KEYS } from '../../constants/table-panel-mapping';
import useGetExpertiseParameters from '../../hooks/useGetExpertiseParameters';
import useGetKamExpertiseConfig from '../../hooks/useGetKamExpertiseConfig';
import useGetKamExpertiseCurrentConfig from '../../hooks/useGetKamExpertiseCurrentConfig';
import usePublishDraft from '../../hooks/usePublishDraft';

import CurrentConfigurations from './CurrentConfigurations';
import PublishVersionModal from './PublishVersionModal';
import styles from './styles.module.css';

const { KAM_EXPERTISE_SCORE_CONFIG, KAM_LEVEL_CONFIG } = CONSTANT_KEYS;

function ViewAllConfigs() {
	const router = useRouter();

	const [activeConfigTab, setActiveConfigTab] = useState('kam-expertise-score-config');
	const [showPublishModal, setShowPublishModal] = useState(false);

	const onClickBack = () => {
		router.push('/allocation/kam-expertise');
	};

	const {
		list = [],
		configCardLoading,
		cardRefetch,
	} = useGetKamExpertiseCurrentConfig({ type: ['draft', 'live', 'expired'] });

	const { kamConfigDetails, levelLoading, refetch } = useGetKamExpertiseConfig();
	const { listExpertiseParams, expertiseLoading, expertiseRefetch } = useGetExpertiseParameters();
	const { onCreate, loading: publishLoading } =	usePublishDraft({
		setShowPublishModal,
		refetch,
		cardRefetch,
		expertiseRefetch,
		list,
	});

	const componentProps = {
		[KAM_EXPERTISE_SCORE_CONFIG]: {
			listExpertiseParams,
			expertiseLoading,
			expertiseRefetch,
			cardRefetch,
		},
		[KAM_LEVEL_CONFIG]: {
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
					list={list}
					configCardLoading={configCardLoading}
					refetch={refetch}
					expertiseRefetch={expertiseRefetch}
					cardRefetch={cardRefetch}
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
						disabled={levelLoading || expertiseLoading
							|| configCardLoading || isEmpty(list)}
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
