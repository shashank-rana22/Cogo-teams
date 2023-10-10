import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState, useCallback } from 'react';

import extractNavLinks from '../../helpers/extractNavLinks';
import notificationsRedirectLink from '../../helpers/notificationsRedirectLink';
import useBulkUpdateCommunication from '../../hooks/useBulkUpdateCommunication';
import useListCommunication from '../../hooks/useListCommunication';
import useUpdateCommunication from '../../hooks/useUpdateCommunication';
import showErrorsInToast from '../../utils/showErrorsInToast';

import RenderContent from './RenderContent';

function NewNotifications({
	notificationPopover = true,
	setNotificationPopover = () => {},
	setResetSubnavs = () => {},
}) {
	const { push } = useRouter();
	const { t } = useTranslation(['common']);

	const { partner_id } = useSelector(({ general }) => ({
		partner_id: general?.query?.partner_id,
	}));

	const navigationMappingAdmin = navigationMapping({ t });
	const NAVIGATION_LINKS = extractNavLinks(navigationMappingAdmin);

	const [dataRequired, setDataRequired] = useState(false);

	const {
		trigger = () => {},
		formattedData = {},
		is_not_seen_count = GLOBAL_CONSTANTS.zeroth_index,
	} = useListCommunication();
	const {
		triggerCommunication = () => {},
	} = useUpdateCommunication();

	const {
		triggerBulkCommunication = () => {},
	} = useBulkUpdateCommunication();

	const updateAction = useCallback(async (action) => {
		try {
			const payload = {
				filters     : { type: 'platform_notification' },
				action_name : action,
			};

			await triggerBulkCommunication({
				data: payload,
			});
		} catch (err) {
			showErrorsInToast(err?.data, t);
		}
	}, [t, triggerBulkCommunication]);

	const handleNotificationClick = async (item) => {
		const {
			content = {},
			is_clicked = false,
			id = '',
		} = item || {};

		try {
			if (content?.link) {
				notificationsRedirectLink({ link: content?.link, push, partner_id, NAVIGATION_LINKS });
			}

			if (is_clicked) {
				const updateRes = await triggerCommunication({
					data: { id, is_clicked: true },
				});
				if (updateRes?.hasError) {
					showErrorsInToast(updateRes?.messages);
				} else {
					trigger({
						params: {
							data_required                  : dataRequired,
							not_seen_count_required        : true,
							filters                        : { type: 'platform_notification' },
							communication_content_required : dataRequired,
						},
					});
				}
			}

			setNotificationPopover(false);
			setResetSubnavs(false);
		} catch (err) {
			showErrorsInToast(err?.data || 'Something went wrong !');
		}
	};

	const onShowToggle = useCallback(async (show) => {
		if (show) {
			try {
				setDataRequired(true);
				await trigger({
					params: {
						data_required                  : true,
						communication_content_required : true,
						not_seen_count_required        : true,
						filters                        : { type: 'platform_notification' },
					},
				});
			} catch (err) {
				Promise.reject();
			}
		} else {
			setDataRequired(false);
			if (is_not_seen_count >= GLOBAL_CONSTANTS.zeroth_index) {
				await updateAction('seen');
			}
		}
	}, [is_not_seen_count, trigger, updateAction]);

	const onMarkAllAsRead = async () => {
		await updateAction('seen');
		setNotificationPopover(false);
		setResetSubnavs(false);
	};
	const onSeeAll = () => {
		push('/notifications');
		setNotificationPopover(false);
		setDataRequired(false);
		setResetSubnavs(false);
	};

	useEffect(() => {
		onShowToggle(notificationPopover);
	}, [notificationPopover, onShowToggle]);

	return (
		<RenderContent
			formattedData={formattedData}
			handleNotificationClick={handleNotificationClick}
			onMarkAllAsRead={onMarkAllAsRead}
			onSeeAll={onSeeAll}
		/>
	);
}
export default NewNotifications;
