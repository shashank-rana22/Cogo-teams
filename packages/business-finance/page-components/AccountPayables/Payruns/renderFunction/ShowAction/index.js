import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';
// import { useEffect } from 'react';

// import { StyledLink, ButtonContainer, Section } from './styles';
import styles from './styles.module.css';

function ShowAction({
	itemData,
	isInvoiceView,
	setIsInvoiceView,
	setGlobalFilters,
	setShowBackButton,
	confirmDeletePayrun,
}) {
	const { payrunName = '' } = itemData;

	const handleClick = () => {
		setIsInvoiceView(!isInvoiceView);
		setGlobalFilters((p) => ({ ...p, searchquery: payrunName }));
		setShowBackButton(true);
	};
	const tooltipContent = () => (
		<div>
			<div>
				<div className={styles.section}>Transaction Type:</div>
				<div role="presentation" className={styles.styled_link} onClick={handleClick}>{payrunName}</div>
			</div>
			<div>
				<Button
					size="sm"
					style={{ marginTop: '4px' }}
					themeType="primary"
					onClick={() => confirmDeletePayrun(itemData, 'invoice')}
				>
					Delete
				</Button>
			</div>
		</div>
	);
	// useEffect(() => {
	// 	setGlobalFilters((p) => ({ ...p, searchquery: undefined }));
	// 	setShowBackButton(false);
	// }, [isInvoiceView, setGlobalFilters, setShowBackButton]);

	return (
		<div>
			<Popover
				placement="left"
				render={tooltipContent()}
			>
				<div>
					<IcMOverflowDot height={16} width={16} style={{ cursor: 'pointer' }} />
				</div>
			</Popover>
		</div>
	);
}

export default ShowAction;
