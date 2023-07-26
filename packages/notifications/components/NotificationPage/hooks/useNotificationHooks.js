/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const PAGE = 1;
const INCREMENT = 1;

const useNotificationHooks = () => {
	const [activeTab, setActiveTab] = useState('notifications');
	const [formattedmailData, setFormattedMailData] = useState({});
	const [pagination, setPagination] = useState(PAGE);
	const {
		general: { scope = '' },
	} = useSelector((state) => state);
	const { trigger, loading } = useRequest('get', false, scope, {
		encodeParams: false,
	})('/recent_notification?record_per_page=10');

	const setActiveTabFunction = (tab) => {
		setActiveTab(tab);
		if (tab === 'notifications') {
			setPagination(PAGE);
		}
	};

	const refetch = async () => {
		try {
			const res = await trigger({
				params: {
					page_no: pagination,
				},
			});

			const LIST = [];
			for (let i = 0; i < res?.data?.body?.length; i += INCREMENT) {
				LIST.push({
					is_clicked : true,
					is_seen    : true,
					is_rpa     : true,
					content    : {
						body         : res?.data?.body?.[i]?.notification_message || '',
						created_at   : res?.data?.body?.[i]?.created_at,
						mail_id      : res?.data?.body?.[i]?.mail_id,
						shipment_id  : res?.data?.body?.[i]?.shipment_id,
						redirect_url : res?.data?.body?.[i]?.redirect_url,
					},
					created_at: res?.data?.body?.[i]?.created_at,
				});
			}
			const mailData = {
				LIST,
				page_limit     : res?.data?.record_per_page,
				not_seen_count : 0,
				total_count    : res?.data?.total_records,
				page           : pagination,
			};
			setFormattedMailData(mailData);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		refetch();
	}, [activeTab, pagination]);

	return {
		activeTab,
		loading,
		formattedmailData,
		setPagination,
		setActiveTabFunction,
	};
};

export default useNotificationHooks;
