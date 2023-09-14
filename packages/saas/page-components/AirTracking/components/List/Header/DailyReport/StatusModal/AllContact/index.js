import { Button, Input, cl, Toast } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

import getContactListConfig from '../../../../../../configuration/contactListConfig';
import useCreateDsr from '../../../../../../hooks/useCreateDsr';
import useGetContactList from '../../../../../../hooks/useGetContactList';

import styles from './styles.module.css';

import AddContactModal from '@/ui/page-components/air-ocean-tracking/common/AddContactModal';
import Table from '@/ui/page-components/air-ocean-tracking/common/Table';

function AllContact({ selectedContact, setSelectedContact, setIsSingleReport, activeTab }) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const contactListConfig = getContactListConfig({ t });

	const [inputValue, setInputValue] = useState('');
	const [addContact, setAddContact] = useState(false);

	const { data, loading, setPage, fetchContactList } = useGetContactList();
	const { loading: createLoading, createDsr } = useCreateDsr();

	const { list = [] } = data || {};

	const filteredList = useMemo(() => {
		const inputValueLowerCase = inputValue.toLowerCase();
		return list.filter((item) => {
			const { name = '', email = '' } = item || {};
			const itemName = name ? name.toLowerCase() : '';
			const itemEmail = email ? email.toLowerCase() : '';
			return itemName.includes(inputValueLowerCase) || itemEmail.includes(inputValueLowerCase);
		});
	}, [inputValue, list]);

	const proceedHandler = async () => {
		if (isEmpty(selectedContact)) {
			Toast.warn(t('airOceanTracking:tracking_daily_report_toast_2'));
			return;
		}

		const resp = await createDsr({ contactId: selectedContact?.id });
		if (resp === null) return;

		setSelectedContact((prev) => ({ ...prev, dsrId: resp }));
		setIsSingleReport(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div className={cl`${styles.flex_box} ${styles.search_container}`}>
					<div className={styles.input_box}>
						<p>{t('airOceanTracking:tracking_daily_report_select_contact_text')}</p>
						<Input
							size="sm"
							value={inputValue}
							onChange={setInputValue}
							placeholder={t('airOceanTracking:tracking_daily_report_select_contact_placeholder')}
							suffix={<IcMSearchlight />}
						/>
					</div>

					<Button
						type="button"
						themeType="secondary"
						disabled={createLoading}
						onClick={() => setAddContact(true)}
					>
						{t('airOceanTracking:tracking_daily_report_add_contact_text')}
					</Button>
				</div>

				{!isEmpty(list) &&	(
					<Table
						title={t('airOceanTracking:tracking_daily_report_table_title')}
						configs={contactListConfig}
						filteredList={filteredList}
						data={data}
						loading={loading}
						setPage={setPage}
						selectedContact={selectedContact}
						setSelectedContact={setSelectedContact}
					/>
				)}
			</div>
			<div className={styles.footer}>
				<Button onClick={proceedHandler} type="button" themeType="accent" loading={createLoading}>
					{t('airOceanTracking:tracking_daily_report_next_button_label')}
				</Button>
			</div>
			{addContact &&	(
				<AddContactModal
					addContact={addContact}
					setAddContact={setAddContact}
					fetchContactList={fetchContactList}
					activeTab={activeTab}
				/>
			)}
		</div>
	);
}

export default AllContact;
