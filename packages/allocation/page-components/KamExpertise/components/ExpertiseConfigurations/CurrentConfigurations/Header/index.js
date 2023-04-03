import { Button, Modal } from '@cogoport/components';
import { format } from '@cogoport/utils';

import VERSION_KEYS from '../../../../constants/version-keys-mapping';
import useGetKamExpertiseVersionDetials from '../../../../hooks/useGetKamExpertiseVersionDetials';

import CreateModal from './CreateModal';
import Draft from './CreateModal/Draft';
import NewVersion from './CreateModal/NewVersion';
import Published from './CreateModal/Published';
import ModalFooter from './ModalFooter';
import styles from './styles.module.css';

const { PUBLISHED_VERSION, SAVED_DRAFT, NEW_VERSION, INITIAL_MODE } = VERSION_KEYS;

const CREATE_CONFIGURATION_MAPPING = {
	[PUBLISHED_VERSION] : Published,
	[SAVED_DRAFT]       : Draft,
	[NEW_VERSION]       : NewVersion,
	[INITIAL_MODE]      : CreateModal,
};

function Header(props) {
	const {
		list = [],
		refetch,
		expertiseRefetch,
		cardRefetch,
	} = props;

	const {
		getVersion, createModalLoading, selectedVersion, setSelectedVersion,
		mode, setMode, showModal, setShowModal, versionName, setVersionName,
	} = useGetKamExpertiseVersionDetials({
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
			getVersion,
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
							{ audit_data.updated_at
								? format(audit_data.updated_at, 'dd MMM yyyy') : ''}
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

			<div>
				<Button onClick={() => setShowModal(true)}>
					Create
				</Button>

				{showModal && (
					<Modal
						size="md"
						show={showModal}
						onClose={() => {
							setShowModal(false);
							setMode('initial-mode');
							setSelectedVersion({});
							setVersionName('');
						}}
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
									getVersion={getVersion}
									createModalLoading={createModalLoading}
									versionName={versionName}
								/>
							</Modal.Footer>
						) : null}
					</Modal>
				)}
			</div>
		</div>
	);
}

export default Header;
