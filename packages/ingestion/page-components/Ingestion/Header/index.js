import { Button } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import usePostIngestionData from '../../../hooks/usePostIngestionData';

import ChooseModal from './Modals/ChooseModal/index';
import OrgDetailsModal from './Modals/OrgDetailsModal/index';
import ProviderSelectModal from './Modals/ProviderSelectModal';
import TemplateModal from './Modals/TemplateModal';
import UploadModal from './Modals/UploadModal';
import styles from './styles.module.css';

const CONSTANT_KEYS = {
	// LANDING     : '',
	CHOOSE          : 'chooseModal',
	ORG_DETAILS     : 'orgDetails',
	PROVIDER_SELECT : 'providerSelect',
	UPLOAD          : 'uploadModal',
};

const {
	CHOOSE, ORG_DETAILS, PROVIDER_SELECT, UPLOAD,
} = CONSTANT_KEYS;

const INGESTION_COMPONENTS_MAPPING = {
	[CHOOSE]          : ChooseModal,
	[ORG_DETAILS]     : OrgDetailsModal,
	[PROVIDER_SELECT] : ProviderSelectModal,
	[UPLOAD]          : UploadModal,
};

function Header() {
	const [showModal, setShowModal] = useState(false);

	const {
		setUploadData = () => {},
		uploadData = {},
		formProps,
		modalControls,
		show = '',
		setShow = () => {},
		onSubmit = () => {},
		loading,

	} = usePostIngestionData();
	// console.log('formProps::::::::::', formProps);
	// const componentProps = {
	// 	[CHOOSE]: {

	// 	},
	// 	[ORG_DETAILS]: {

	// 	},
	// };

	const Component = INGESTION_COMPONENTS_MAPPING[show] || null;

	// console.log('showModal::', show);
	return (
		<div>
			<h1>
				Ingestion
			</h1>
			<div className={styles.button_section}>

				{/* <Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Download Org Template
				</Button> */}

				<Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
					onClick={() => setShowModal(true)}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Download Templates
				</Button>

				<Button
					size="lg"
					themeType="primary"
					onClick={() => {
						setShow('chooseModal');
					}}
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					Upload

				</Button>
			</div>

			{
				Component && (
					<Component
						show={show}
						setShow={setShow}
						setUploadData={setUploadData}
						uploadData={uploadData}
						formProps={formProps}
						modalControls={modalControls}
						onSubmit={onSubmit}
						loading={loading}
					/>
				)
			}

			<TemplateModal setShowModal={setShowModal} showModal={showModal} />
		</div>

	);
}

export default Header;
