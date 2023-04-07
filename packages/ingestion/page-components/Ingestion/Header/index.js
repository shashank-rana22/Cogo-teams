import { Button, Modal } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';
import { useState } from 'react';

import { CONSTANT_KEYS } from '../../../constants/header-mapping';
import usePostIngestionData from '../../../hooks/usePostIngestionData';

import ChooseModal from './Modals/ChooseModal/index';
import { ChooseFooter, OrgDetailsFooter, ProviderSelectFooter, UploadModalFooter } from './Modals/Footers';
import OrgDetailsModal from './Modals/OrgDetailsModal/index';
import ProviderSelectModal from './Modals/ProviderSelectModal';
import TemplateModal from './Modals/TemplateModal';
import UploadModal from './Modals/UploadModal';
import styles from './styles.module.css';

const {
	CHOOSE, ORG_DETAILS, PROVIDER_SELECT, UPLOAD,
} = CONSTANT_KEYS;

const INGESTION_COMPONENTS_MAPPING = {
	// [TEMPLATE]        : TemplateModal,
	[CHOOSE]          : ChooseModal,
	[ORG_DETAILS]     : OrgDetailsModal,
	[PROVIDER_SELECT] : ProviderSelectModal,
	[UPLOAD]          : UploadModal,
};

function Header({ refetch = () => {} }) {
	const [template, setTemplate] = useState('');
	const {
		setUploadData = () => {},
		uploadData = {},
		formProps = {},
		modalControls = [],
		show = {},
		setShow = () => {},
		onSubmit = () => {},
		loading = false,
	} = usePostIngestionData({ refetch });

	const onClose = () => {
		setShow((pv) => ({
			...pv,
			open: false,
		}));
	};

	const INGESTION_FOOTERS_MAPPING = {
		[CHOOSE]          : ChooseFooter,
		[ORG_DETAILS]     : OrgDetailsFooter,
		[PROVIDER_SELECT] : ProviderSelectFooter,
		[UPLOAD]          : UploadModalFooter,
	};

	const Footer = INGESTION_FOOTERS_MAPPING[show?.screen] || null;
	const Component = INGESTION_COMPONENTS_MAPPING[show?.screen] || null;

	return (
		<>
			<h1 style={{ margin: 0 }}>
				Ingestion
			</h1>
			<div className={styles.button_section}>

				<Button
					size="lg"
					themeType="secondary"
					style={{ marginRight: '16px' }}
					onClick={() => setShow({
						open   : true,
						screen : 'template',
					})}
				>
					<IcMDownload style={{ marginRight: '4px' }} />
					Download Templates
				</Button>

				<Button
					size="lg"
					themeType="primary"
					onClick={() => {
						setShow({
							open   : true,
							screen : 'chooseModal',
						});
					}}
				>
					<IcMUpload style={{ marginRight: '4px' }} />
					Upload

				</Button>
			</div>
			{show?.open && (
				<Modal size="md" show={show?.open} onClose={() => onClose()}>
					<Modal.Header title={(
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IcMUpload style={{ margin: '0 4px 0 0' }} />
							Upload CSV
						</div>
					)}
					/>
					<Modal.Body>
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
					</Modal.Body>

					<Modal.Footer>
						<Footer
							show={show}
							setShow={setShow}
							setUploadData={setUploadData}
							uploadData={uploadData}
							formProps={formProps}
							modalControls={modalControls}
							onSubmit={onSubmit}
							loading={loading}
						/>
					</Modal.Footer>

				</Modal>
			)}

			<TemplateModal setTemplate={setTemplate} template={template} />
		</>

	);
}

export default Header;
