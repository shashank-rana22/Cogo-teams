import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

const controls = () => [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter Name',
		rules       : { required: 'Name is required' },
	},
	{
		name        : 'email',
		label       : 'User Email',
		type        : 'email',
		placeholder : 'Enter user email',
		rules       : {
			required : 'Email is required',
			pattern  : {
				value   : GLOBAL_CONSTANTS.regex_patterns.email,
				message : 'Email address in invalid',
			},
		},
	},
];

const getModifiedPayload = (rateData = {}) => {
	const payload = Object.entries(rateData).map(([shipping_line, lineItemsArray]) => {
		const obj = {
			shipping_line      : shipping_line.split('-')?.[GLOBAL_CONSTANTS.zeroth_index],
			code_pair_mappings : (lineItemsArray || [])
				.filter((ele) => ele.code !== 'book_and_lock'),
		};

		return obj;
	});

	return payload;
};

const useShareModal = ({
	rate = {},
	shareType = '',
	onSuccess = () => {},
	source,
	comparedRateCardDetails = [],
}) => {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const [inputValue, setInputValue] = useState('');
	const [modalType, setModalType] = useState('select_user');
	const [selectedUser, setSelectedUser] = useState({});

	let apiEndPoint = 'share_rate_card';

	if (shareType === 'compareRates') {
		apiEndPoint = 'send_spot_search_rate_comparison_emails';
	}

	const [{ loading }, trigger] = useRequest({
		url    : apiEndPoint,
		method : 'POST',
	}, { manual: true });

	const newControls = controls();
	const newFormProps = useForm();

	const {
		formState: { errors },
		handleSubmit,
		control,
	} = newFormProps;

	const handleChange = (e) => {
		setInputValue(e?.target?.value);
	};

	const handleShareRateCard = async () => {
		try {
			if (selectedUser && !isEmpty(selectedUser)) {
				let payload = {};

				if (shareType === 'compareRates') {
					payload = {
						id                  : query.spot_search_id,
						compared_rate_cards : getModifiedPayload(comparedRateCardDetails),
						user_ids            : [selectedUser.user_id],
					};
				} else {
					payload = {
						id            : source === 'checkout' ? query.checkout_id : query.spot_search_id,
						source        : source === 'checkout' ? 'checkout' : undefined,
						selected_card : rate.id,
						user_id       : selectedUser.id,
					};
				}

				await trigger({ data: payload });
				onSuccess();
			} else {
				Toast.error('Please select a user first');
			}
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	const onCreate = async (values = {}) => {
		if (modalType === 'select_user') {
			handleShareRateCard();
		} else {
			try {
				const params = {
					id                     : source === 'checkout' ? query.checkout_id : query.spot_search_id,
					source                 : source === 'checkout' ? 'checkout' : undefined,
					selected_card          : rate.id,
					user_id                : selectedUser.id,
					invite_user_attributes : {
						account_types : ['importer_exporter'],
						user_details  : [
							{
								name  : values.name || undefined,
								email : values.email || undefined,
								mobile_country_code:
									values.phone_number?.mobile_country_code || undefined,
								mobile_number: values.phone_number?.mobile_number || undefined,
							},
						],
					},
				};

				await trigger({ data: params });
				onSuccess();
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error.response?.data));
				}
			}
		}
	};

	const handleModalType = () => {
		if (modalType === 'select_user') {
			setModalType('invite_user');
		} else {
			setModalType('select_user');
		}
	};

	return {
		modalType,
		handleModalType,
		inputValue,
		shareRateCardLoading: loading,
		handleChange,
		newControls,
		selectedUser,
		setSelectedUser,
		handleSubmit,
		onCreate,
		control,
		errors,
	};
};

export default useShareModal;
