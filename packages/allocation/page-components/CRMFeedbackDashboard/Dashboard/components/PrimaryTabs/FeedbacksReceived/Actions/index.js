import { Button, Popover } from '@cogoport/components';
import { IcMArrowRotateRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import EnrichmentRequest from '../../../../../common/EnrichmentRequest';
import ValidateRequest from '../../../../../common/ValidateRequest';

import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	create_enrichment_request   : EnrichmentRequest,
	validate_enrichment_request : ValidateRequest,
};

const getButtonsMapping = ({ t }) => [
	{
		name  : 'create_enrichment_request',
		label : t('allocation:create_enrichment_request'),
	},
	{
		name  : 'validate_enrichment_request',
		label : t('allocation:validate_enrichment_request'),
	},
];

function ButtonsComponent({ buttonsMapping, checkedRowsId, setShowPopover, setModalDetails }) {
	return buttonsMapping.map((button) => {
		const { name, label } = button;
		return (
			<div
				key={name}
				role="presentation"
				className={styles.cta}
				onClick={() => {
					setModalDetails(name); setShowPopover(false);
				}}
				disabled={isEmpty(checkedRowsId)}
			>
				<div className={styles.cta_text}>{label}</div>
				<IcMArrowRotateRight style={{ marginLeft: '4px' }} color="#356efd" />
			</div>
		);
	});
}

function Actions({	checkedRowsId = [],	setActiveTab = () => {}, refetchFeedbackTable = () => {} }) {
	const { t } = useTranslation(['allocation']);

	const [showPopover, setShowPopover] = useState(false);
	const [modalDetails, setModalDetails] = useState('');

	const buttonsMapping = getButtonsMapping({ t });

	const onCloseModal = () => {
		setModalDetails('');
	};

	const componentProps = {
		create_enrichment_request: {
			checkedRowsId,
			setActiveTab,
			modalDetails,
			setModalDetails,
			onCloseModal,
		},
		validate_enrichment_request: {
			checkedRowsId,
			modalDetails,
			setModalDetails,
			onCloseModal,
			refetchFeedbackTable,
		},

	};

	const Component = COMPONENT_MAPPING?.[modalDetails] || null;

	return (
		<>
			<div className={styles.popover_container}>
				<Popover
					visible={showPopover}
					placement="right"
					caret={false}
					render={(
						<ButtonsComponent
							buttonsMapping={buttonsMapping}
							checkedRowsId={checkedRowsId}
							setShowPopover={setShowPopover}
							setModalDetails={setModalDetails}
						/>
					)}
					onClickOutside={() => setShowPopover((prev) => !prev)}
				>
					<Button
						disabled={isEmpty(checkedRowsId)}
						className={styles.button}
						onClick={() => setShowPopover((prev) => !prev)}
					>
						{t('allocation:validity_enrichment_request_actions')}
					</Button>
				</Popover>
			</div>

			{modalDetails ? (
				<Component {...componentProps[modalDetails]} />) : null}
		</>
	);
}
export default Actions;
