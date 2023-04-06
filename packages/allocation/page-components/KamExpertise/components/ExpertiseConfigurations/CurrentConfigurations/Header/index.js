import { Button, Modal, Toast } from '@cogoport/components';
import { format } from '@cogoport/utils';

import VERSION_KEYS from '../../../../constants/version-keys-mapping';
import useSetVersionFilter from '../../../../hooks/useSetVersionFilter';

import InitialMode from './ModalComponents/InitialMode';
import NewVersion from './ModalComponents/NewVersion';
import Published from './ModalComponents/Published';
import ModalFooter from './ModalFooter';
import styles from './styles.module.css';

function Draft({ setMode = () => {}, setShowModal = () => {} }) {
	setShowModal(false);
	setMode('initial-mode');
	Toast.success('New Draft Loaded');
}

const { PUBLISHED_VERSION, SAVED_DRAFT, NEW_VERSION, INITIAL_MODE } = VERSION_KEYS;

const CREATE_CONFIGURATION_MAPPING = {
	[PUBLISHED_VERSION] : Published,
	[SAVED_DRAFT]       : Draft,
	[NEW_VERSION]       : NewVersion,
	[INITIAL_MODE]      : InitialMode,
};

function Header(props) {
	const {
		list = [],
		refetch,
		expertiseRefetch,
		cardRefetch,
		onClickViewAllConfig,
	} = props;

	const {
		onCreate, createModalLoading, selectedVersion, setSelectedVersion,
		mode, setMode, showModal, setShowModal, versionName, setVersionName,
	} = useSetVersionFilter({
		refetch,
		expertiseRefetch,
		cardRefetch,
	});

	const componentProps = {
		[PUBLISHED_VERSION]: {
			setSelectedVersion,
			list,
			versionName,
			setVersionName,
		},
		[SAVED_DRAFT]: {
			setMode,
			setShowModal,
		},
		[NEW_VERSION]: {
			setMode,
			setSelectedVersion,
			onCreate,
			createModalLoading,
			versionName,
			setVersionName,
		},
		[INITIAL_MODE]: {
			setMode,
			list,
		},
	};

	const liveVersionList = list.filter((item) => item?.status === 'live')?.[0] || {};
	const { version_number = '', audit_data = {} } = liveVersionList;

	const Component = CREATE_CONFIGURATION_MAPPING[mode] || null;

	const onClose = () => {
		setShowModal(false);
		setMode('initial-mode');
		setSelectedVersion({});
		setVersionName('');
	};

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>
					Live Configuration
					{' '}
					:
					{' '}
					<strong>
						{version_number ? `Version ${version_number}` : ' '}
					</strong>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.left_text}>
						Published On
						{' '}
						:
						{' '}
						<strong>
							{ audit_data?.updated_at
								? format(audit_data?.updated_at, 'dd MMM yyyy') : ''}
						</strong>
					</div>

					<div>
						Published by
						{' '}
						:
						{' '}
						<strong>{audit_data?.name || ''}</strong>
					</div>
				</div>
			</div>

			<div className={styles.button_container}>
				<Button
					onClick={onClickViewAllConfig}
					themeType="secondary"
					className={styles.configButton}
				>
					View All Configurations
				</Button>

				<Button onClick={() => setShowModal(true)}>
					Create
				</Button>
			</div>
			{showModal && (
				<Modal
					size="md"
					show={showModal}
					onClose={onClose}
					placement="top"
				>
					<Modal.Header title="Create" />

					<Modal.Body>
						{Component && (
							<Component
								key={mode}
								{...(componentProps[mode] || {})}
							/>
						)}
					</Modal.Body>

					{mode === PUBLISHED_VERSION ? (
						<Modal.Footer className={styles.test}>
							<ModalFooter
								setMode={setMode}
								setSelectedVersion={setSelectedVersion}
								setShowModal={setShowModal}
								selectedVersion={selectedVersion}
								mode={mode}
								onCreate={onCreate}
								createModalLoading={createModalLoading}
								versionName={versionName}
							/>
						</Modal.Footer>
					) : null}
				</Modal>
			)}
		</div>
	);
}

export default Header;
