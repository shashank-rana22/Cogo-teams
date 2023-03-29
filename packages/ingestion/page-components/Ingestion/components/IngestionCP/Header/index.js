import { Button } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import useGetIngestionList from '../../../hooks/useGetIngestionList';

import Filters from './Filters';
import ChooseModal from './Modals/ChooseModal/index';
import OrgDetailsModal from './Modals/OrgDetailsModal/index';
import ProviderSelectModal from './Modals/ProviderSelectModal';
import UploadModal from './Modals/UploadModal';
import styles from './styles.module.css';
// chooseModal      : false,
// 		moreDetailsModal : false,
// 		csvSelectModal   : false,
// 		csvUploadModal   : false,

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
	const [show, setShow] = useState('');

	const {
		setIngestionData = () => {},
		ingestionData = {},
		formProps,
	} = useGetIngestionList();
	console.log('formProps::::::::::', formProps);
	// const componentProps = {
	// 	[CHOOSE]: {

	// 	},
	// 	[ORG_DETAILS]: {

	// 	},
	// };

	const Component = INGESTION_COMPONENTS_MAPPING[show] || null;

	console.log('showModal::', show);
	return (
		<div style={{ marginTop: '16px' }}>
			{/* <h1>
				Ingestion
			</h1> */}
			<div className={styles.button_section}>

				<Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Download Org Template
				</Button>

				{/* <Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Download Lead Template
				</Button> */}

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

			<Filters />

			{/* <ChooseModal show={show} setShow={setShow} /> */}

			{
				Component && (
					<Component
						show={show}
						setShow={setShow}
						setIngestionData={setIngestionData}
						ingestionData={ingestionData}
						formProps={formProps}

					/>
				)
			}
		</div>

	);
}

export default Header;
