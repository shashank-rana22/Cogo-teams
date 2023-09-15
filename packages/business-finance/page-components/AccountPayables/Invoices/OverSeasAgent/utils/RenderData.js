import FinalConfirmation from '../FinalConfirmation';
import InvoiceBLCheck from '../InvoiceBLCheck';
import InvoiceSelection from '../InvoiceSelection';
import MergeDocuments from '../MergeDocuments';
import UploadDocuments from '../UploadDocuments';

function RenderData({
	active = '',
	setActive = () => {},
	bLData = {},
	setShowSaveAsDraft = () => {},
	setBLData = () => {},
	setShowHeader = () => {},
	showHeader = '',
	setShowPayableAmount = () => {},

}) {
	if (active === 'merge_documents') {
		return <MergeDocuments setActive={setActive} />;
	}
	if (active === 'invoice_bl_check') {
		return <InvoiceBLCheck setActive={setActive} bLData={bLData} />;
	}
	if (active === 'final_confirmation') {
		return (
			<FinalConfirmation
				setActive={setActive}
				setShowSaveAsDraft={setShowSaveAsDraft}
			/>
		);
	}
	if (active === 'upload_documents') {
		return <UploadDocuments setActive={setActive} />;
	}
	return (
		<InvoiceSelection
			setActive={setActive}
			active={active}
			setBLData={setBLData}
			setShowHeader={setShowHeader}
			showHeader={showHeader}
			setShowPayableAmount={setShowPayableAmount}
			setShowSaveAsDraft={setShowSaveAsDraft}
		/>
	);
}

export default RenderData;
