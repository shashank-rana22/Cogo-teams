import { Button } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';

import { CONSTANT_KEYS } from '../../../constants/header-mapping';
import usePostIngestionData from '../../../hooks/usePostIngestionData';

import ChooseModal from './Modals/ChooseModal/index';
import OrgDetailsModal from './Modals/OrgDetailsModal/index';
import ProviderSelectModal from './Modals/ProviderSelectModal';
import TemplateModal from './Modals/TemplateModal';
import UploadModal from './Modals/UploadModal';
import styles from './styles.module.css';

const {
	TEMPLATE, CHOOSE, ORG_DETAILS, PROVIDER_SELECT, UPLOAD,
} = CONSTANT_KEYS;

const INGESTION_COMPONENTS_MAPPING = {
	[TEMPLATE]        : TemplateModal,
	[CHOOSE]          : ChooseModal,
	[ORG_DETAILS]     : OrgDetailsModal,
	[PROVIDER_SELECT] : ProviderSelectModal,
	[UPLOAD]          : UploadModal,
};

function Header({ refetch = () => {} }) {
	const {
		setUploadData = () => {},
		uploadData = {},
		formProps = {},
		modalControls = [],
		show = '',
		setShow = () => {},
		onSubmit = () => {},
		loading = false,
	} = usePostIngestionData({ refetch });

	const Component = INGESTION_COMPONENTS_MAPPING[show] || null;

	return (
		<div>
			<h1 style={{ margin: 0 }}>
				Ingestion
			</h1>
			<div className={styles.button_section}>

				<Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
					onClick={() => setShow('template')}
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

			<TemplateModal setShow={setShow} show={show} />
		</div>

	);
}

export default Header;
