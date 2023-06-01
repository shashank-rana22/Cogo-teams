import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMEdit, IcMUndo } from '@cogoport/icons-react';

import SplitAthAmount from './SplitAthAmountModal';
import { DocumentType, EditAdvancedAmount } from './styles';

export const serviceProviderTableColumns = ({
	isEdit,
	setIsEdit,
	setFinalGetHookData = () => {},
}) => {
	const setAdvancedAmount = (item) => {
		const tempItem = item;
		tempItem.updated_advance_amount = tempItem?.advanced_amount;
		setIsEdit(!isEdit);
	};

	const control = [
		{
			label  : 'Service Provider',
			render : (item) => (
				<DocumentType>
					{item?.service_provider_name
						? item.service_provider_name
						: 'Service Provider'}
				</DocumentType>
			),
			span: 1.9,
		},
		{
			label  : 'User Name',
			render : (item) => (
				<DocumentType>
					{item?.user_name ? item.user_name : ' User Name'}
				</DocumentType>
			),
			span: 1.9,
		},
		{
			label  : 'Contact Number',
			render : (item) => (
				<DocumentType>
					{item?.user_contact ? item.user_contact : 'Contact Number'}
				</DocumentType>
			),
			span: 1.9,
		},
		{
			label  : 'Source of Rate',
			render : (item) => (
				<DocumentType>
					{item?.last_updated_at
						? formatDate({
							date       : item.last_updated_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})
						: '-'}
				</DocumentType>
			),
			span: 1.8,
		},
		{
			label  : 'Per Truck',
			render : (item) => <DocumentType>{item?.buy_rate || '-'}</DocumentType>,
			span   : 1.8,
		},
		{
			label  : 'ATH Amount',
			render : (item) => (!isEdit ? (
				<DocumentType>{item?.advanced_amount || 0}</DocumentType>
			) : (
				<input
					type="text"
					style={{
						height     : 30,
						width      : 70,
						fontWeight : 'bold',
						fontSize   : 'small',
					}}
					value={item?.updated_advance_amount || 0}
					onChange={(e) => {
						const tempItem = item;
						tempItem.updated_advance_amount = +e.target.value;
						setFinalGetHookData((prev) => ({ ...prev }));
					}}
				/>
			)),
			span: 0.7,
		},
		{
			label  : '',
			render : (item) => (
				<EditAdvancedAmount>
					<IcMEdit
						style={{ marginBottom: 5, cursor: 'pointer' }}
						onClick={() => setIsEdit(!isEdit)}
					/>
					<IcMUndo
						style={{ cursor: 'pointer' }}
						onClick={() => setAdvancedAmount(item)}
					/>
				</EditAdvancedAmount>
			),
			span: 1,
		},
		{
			label  : '',
			render : (item) => (
				<SplitAthAmount item={item} setFinalGetHookData={setFinalGetHookData} />
			),
			span: 0.8,
		},
	];

	return control;
};
