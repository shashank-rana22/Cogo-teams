import { Button, Modal } from '@cogoport/components';
import { IcMDownload, IcMUpload } from '@cogoport/icons-react';

import { CONSTANT_KEYS } from '../../../constants/header-mapping';
import useGetTemplate from '../../../hooks/useGetTemplate';
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
		show = {},
		setShow = () => {},
		onSubmit = () => {},
		loading = false,
		onClose = () => {},
	} = usePostIngestionData({ refetch });

	const { getTemplateCsv = () => {}, template = '', setTemplate = () => {} } = useGetTemplate();

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
					onClick={() => setTemplate('template')}
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
				<Modal
					size="md"
					show={show?.open}
					onClose={() => onClose()}
					closeOnOuterClick={false}
					scroll={false}
				>
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

			<TemplateModal getTemplateCsv={getTemplateCsv} template={template} setTemplate={setTemplate} />
		</>

	);
}

export default Header;
