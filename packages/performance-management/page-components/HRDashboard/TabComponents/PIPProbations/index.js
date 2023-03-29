import { Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMDownload, IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import modalComponentsMapping from '../../../../constants/modal-components-mapping';
import tabPanelComponentMapping from '../../../../constants/tab-pannel-component-mapping';
import useUpdateLog from '../../../../hooks/useUpdateLog';

import PendingReviews from './PendingReviews';
import styles from './styles.module.css';

function PIPProbations({ source = 'hr_dashboard', modal = '', setModal = () => {} }) {
	const [item, setItem] = useState({});
	const [activeTab, setActiveTab] = useState('dashboard');
	const [disableNext, setDisableNext] = useState(true);
	const [refetchList, setRefetchList] = useState(false);

	const { onUpdateLog = () => {} } = useUpdateLog();

	const onSubmit = () => {
		if (item?.tags?.find((x) => x === 'Final discusion held' && isEmpty(item?.final_decision))) {
			setModal('update');
		} else {
			const {
				user_id,
				id:log_id,
				log_type,
				comments:comment,
				final_decision,
				is_reviewed,
				tags,
			} = item;
			onUpdateLog({
				user_id,
				log_id,
				log_type,
				comment,
				final_decision,
				tags,
				is_reviewed: is_reviewed || modal === 'review',
			}, setRefetchList, setModal);
			setItem({});
		}
	};

	const ModalComponent = modalComponentsMapping[modal]?.Component;

	return (
		<div className={styles.container}>
			{source === 'hr_dashboard' && (
				<>
					<div>
						<Tabs
							activeTab={activeTab}
							themeType="secondary"
							onChange={setActiveTab}
						>
							{Object.values(tabPanelComponentMapping).map((tabPanelItem) => {
								const { name = '', title = '', Component } = tabPanelItem;

								if (!Component) return null;

								return (
									<TabPanel
										key={name}
										name={name}
										title={title}
									>
										<Component
											activeTab={activeTab}
											item={item}
											setItem={setItem}
											setModal={setModal}
											refetchList={refetchList}
											setRefetchList={setRefetchList}
										/>
									</TabPanel>
								);
							})}
						</Tabs>
					</div>

					<div className={styles.button_container}>
						<Button
							size="lg"
							themeType="tertiary"
							style={{ marginRight: '16px' }}
							onClick={() => setModal('upload')}
						>
							<IcMUpload style={{ marginRight: '4px' }} />
							Upload CSV
						</Button>

						<Button
							size="lg"
							themeType="tertiary"
							style={{ marginRight: '16px' }}
							onClick={() => setModal('download')}
						>
							<IcMDownload style={{ marginRight: '4px' }} />
							Probation CSV
						</Button>

						<Button
							size="lg"
							themeType="primary"
							onClick={() => {
								setModal('create');
							}}
						>
							<IcMEdit style={{ marginRight: '4px' }} />
							Create
						</Button>
					</div>
				</>
			)}

			{source === 'manager_dashboard' && (
				<PendingReviews
					activeTab={activeTab}
					item={item}
					setItem={setItem}
					setModal={setModal}
					refetchList={refetchList}
					setRefetchList={setRefetchList}
					source="manager_dashboard"
				/>
			)}

			{modal
				&& (
					<ModalComponent
						item={item}
						setItem={setItem}
						setDisableNext={setDisableNext}
						modal={modal}
						setModal={setModal}
						disableNext={disableNext}
						onSubmit={onSubmit}
						setRefetchList={setRefetchList}
					/>
				)}

		</div>
	);
}

export default PIPProbations;
