import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const controls = () => [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		placeholder : 'Enter Name',
		rules       : { required: 'name is Required' },
	},
	{
		name        : 'email',
		label       : 'User Email',
		type        : 'email',
		placeholder : 'enter user Email',
		rules       : { required: 'email is Required' },
	},
];

const useShareModal = ({ rate = {}, onClose, source }) => {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);
	const newControls = controls();
	const newFormProps = useForm();

	const {
		formState: { errors },
		handleSubmit,
		control,
	} = newFormProps;

	const [inputValue, setInputValue] = useState('');

	const [modalType, setModalType] = useState('select_user');

	const [selectedUser, setSelectedUser] = useState({});

	const handleChange = (e) => {
		setInputValue(e?.target?.value);
	};

	const [{ loading }, trigger] = useRequest({
		url    : '/share_rate_card',
		method : 'POST',
	}, { manual: true });

	const handleShareRateCard = async () => {
		try {
			if (Object.keys(selectedUser).length) {
				const payload = {
					id            : source === 'checkout' ? query.checkout_id : query.spot_search_id,
					source        : source === 'checkout' ? 'checkout' : undefined,
					selected_card : rate.card,
					user_id       : selectedUser.id,
				};
				await trigger({ data: payload });
				onClose();
			} else {
				// toast.warn(t('checkoutCommon:shareToUsersModal_toast_error'));
			}
		} catch (err) {
			console.log(err);
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
					selected_card          : rate.card,
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
				onClose();
			} catch (err) {
				console.log(err);
				// toast.error(getApiErrorString(err.data));
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
