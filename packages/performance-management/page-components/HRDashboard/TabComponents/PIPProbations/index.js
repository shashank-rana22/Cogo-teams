import { Toast, Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMDownload, IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import modalComponentsMapping from '../../../../constants/modal-components-mapping';
import tabPanelComponentMapping from '../../../../constants/tab-pannel-component-mapping';
import useDownloadLogCsv from '../../../../hooks/useDownloadLogCSV';
import useUpdateLog from '../../../../hooks/useUpdateLog';

import PendingReviews from './PendingReviews';
import styles from './styles.module.css';

function PIPProbations({ source = 'hr_dashboard', modal = '', setModal = () => {}, logType = '' }) {
	const [item, setItem] = useState({});
	const [activeTab, setActiveTab] = useState('dashboard');
	const [refetchList, setRefetchList] = useState(false);

	const { onUpdateLog = () => {} } = useUpdateLog();

	const { downloadLogCSV } = useDownloadLogCsv();

	const onSubmitReset = () => {
		setModal('');
		setItem({});
		setRefetchList(true);
	};

	const onSubmit = () => {
		if (item.tags?.find((x) => x === 'Final discussion held') && item.tags?.length !== 3) {
			Toast.error('All three boxes have to be ticked');
		} else if (item.tags?.find((x) => x === 'Final discussion held') && modal === 'logs') {
			setModal('update');
		} else {
			const {
				user_id, id, log_type, tags, final_decision, is_reviewed, comment, extended_date,
			} = item;
			const payload = {
				UserID        : user_id,
				LogID         : id,
				LogType       : log_type,
				Tags          : tags || undefined,
				FinalDecision : final_decision || undefined,
				IsReviewed    : is_reviewed || modal === 'review',
				Comment       : comment || undefined,
				ExtendedDate  : extended_date,
			};
			onUpdateLog(payload, onSubmitReset);
		}
	};

	const ModalComponent = modalComponentsMapping[modal]?.Component;

	return (
		<div className={styles.container}>
			{source === 'hr_dashboard' && (
				<>
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
										logType={logType}
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
							onClick={() => downloadLogCSV(logType)}
						>
							<IcMDownload style={{ marginRight: '4px' }} />
							{startCase(logType)}
							{' '}
							CSV
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
					logType={logType}
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
						modal={modal}
						setModal={setModal}
						onSubmit={onSubmit}
						setRefetchList={setRefetchList}
						source={source}
						logType={logType}
					/>
				)}

		</div>
	);
}

export default PIPProbations;
