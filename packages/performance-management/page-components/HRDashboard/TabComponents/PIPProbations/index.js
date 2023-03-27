import { Toast, Tabs, TabPanel, Button } from '@cogoport/components';
import { IcMDownload, IcMEdit, IcMUpload } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import pipModalComponentsMapping from '../../../../constants/pip-modal-components-mapping';
import tabPanelComponentMapping from '../../../../constants/tab-pannel-component-mapping';
import useCreateLog from '../../../../hooks/useCreateLog';

import styles from './styles.module.css';

function PIPProbations() {
	const [modal, setModal] = useState(''); // for update,logs,create,upload modals
	// for pip or probation (create,updateProbation,log=>updatePIP)
	const [item, setItem] = useState({}); // dor sending payload and setting the user id from the list
	const [activeTab, setActiveTab] = useState('dashboard'); // to switch between tabs
	const [disableNext, setDisableNext] = useState(true); // to enable the submit button in create and update

	const { onCreateLog = () => {} } = useCreateLog();
	// useEffect(() => debounceQuery(searchValue), [searchValue])
	// useEffect(() => setPipParams({ show: false, disableNext: false }), []);

	const onSubmit = () => {
		if (item?.tags?.find((x) => x === 'Final discusion held' && isEmpty(item?.final_decision))) {
			setModal('update');
		} else {
			onCreateLog({
				user_id        : item?.user_id,
				log_id         : item?.id,
				log_type       : item?.log_type,
				comment        : item?.comments,
				final_decision : item?.final_decision,
				tags           : item?.tags,
				is_reviewed    : item?.is_reviewed || modal === 'review',
			});
			setItem({});
			Toast.success('Updated Successfully');
			setModal('');
		}
	};

	const ModalComponent = pipModalComponentsMapping[modal]?.Component;

	return (
		<div className={styles.container}>
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
									// setType={setType}
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
						// setType('create');
						setModal('create');
					}}
				>
					<IcMEdit style={{ marginRight: '4px' }} />
					Create
				</Button>
			</div>

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
					/>
				)}

		</div>
	);
}

export default PIPProbations;
