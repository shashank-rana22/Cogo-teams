import getLineItemsMappedColor from '../../../../../utils/getLineItemsMappedColor';

const extraFunctions = ({ chargesTable = [] }) => ({
	renderName: (row) => <div style={{ color: getLineItemsMappedColor({ row, chargesTable }) }}>{row?.name}</div>,

	renderCurrency: (row) => {
		const { currency = '-' } = row || {};
		return (
			<div style={{ color: getLineItemsMappedColor({ row, chargesTable }) }}>
				{currency}
			</div>
		);
	},
	renderPrice: (row) => {
		const { price = '-' } = row || {};
		return <div style={{ color: getLineItemsMappedColor({ row, chargesTable }) }}>{price}</div>;
	},
	renderQuantity: (row) => {
		const { quantity = '-' } = row || {};
		return <div style={{ color: getLineItemsMappedColor({ row, chargesTable }) }}>{quantity}</div>;
	},
	renderExchangeRate: (row) => {
		const { exchangeRate = '-' } = row || {};
		return <div style={{ color: getLineItemsMappedColor({ row, chargesTable }) }}>{exchangeRate}</div>;
	},
	renderTaxAmount: (row) => {
		const { taxAmount = '-' } = row || {};
		return <div>{taxAmount}</div>;
	},
	renderTotalCost: (row) => {
		const { total = 0, exchangeRate = 1 } = row || {};
		const totalAmount = (total * exchangeRate);
		return <div>{totalAmount}</div>;
	},
});

export default extraFunctions;
