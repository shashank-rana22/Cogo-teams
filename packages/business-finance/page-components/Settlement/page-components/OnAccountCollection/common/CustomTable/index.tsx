import {Checkbox, Pagination} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {isEmpty} from '@cogoport/utils';
import React, {useState} from 'react';

import EmptyStateDocs from '../../../../../commons/EmptyStateDocs';
import usePostToSageBulk from '../../../../hooks/usePostToSageBulk';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

interface GlobalInterface {
    page?: number;
    pageLimit?: number;
    accMode?: string;
    search?: string;
    date?: {
        startDate?: Date;
        endDate?: Date;
    };
    paymentDocumentStatus?: string;
    docType?: string;
    sortBy?: string;
    sortType?: string;
}

interface CustomInterface {
    data?: {
        list?: Array<{ id: string }>;
        page?: number;
        totalRecords?: number;
    };
    onPageChange?: (val: number) => void;
    refetch?: () => void;
    loading?: boolean;
    globalFilters?: GlobalInterface;
    setGlobalFilters?: React.Dispatch<React.SetStateAction<GlobalInterface>>;
    checkedRows?: object;
    setCheckedRows?: React.Dispatch<React.SetStateAction<object>>;
}

function CustomTable(
    {
        data = {},
        onPageChange,
        refetch,
        loading,
        setGlobalFilters,
        globalFilters,
        checkedRows,
        setCheckedRows,
    }: CustomInterface,
) {
    const GET_STATUS = ['POSTED', 'APPROVED', 'POSTING_FAILED'];

    const GET_ENTITY = Object.keys(GLOBAL_CONSTANTS.cogoport_entities).filter(
        (entity) => entity !== '501',
    );

    const isCheckBoxAllowed = (item) => GET_STATUS.includes(item?.paymentDocumentStatus)
        && GET_ENTITY.includes(item?.entityType?.toString());

    const {list = [], page = 1, totalRecords = 0} = data;
    const onChangeTableHeaderCheckbox = (event) => {
        event.stopPropagation();

        setCheckedRows({
            ...checkedRows,
            [`page-${page}`]: event?.target?.checked
                ? (list || [])
                    ?.filter((item) => isCheckBoxAllowed(item))
                    .map(({id}) => id)
                : [],
        });
    };

    const onChangeTableBodyCheckbox = (event, item) => {
        event.stopPropagation();
        if (event.target.checked) {
            setCheckedRows({
                ...checkedRows,
                [`page-${page}`]: [
                    ...(checkedRows?.[`page-${page}`] || []),
                    item?.id,
                ],
            });
        } else {
            setCheckedRows({
                ...checkedRows,
                [`page-${page}`]: (checkedRows?.[`page-${page}`] || []).filter(
                    (Id) => Id !== item?.id,
                ),
            });
        }
    };

    const getTableBodyCheckbox = (item) => {
        const isChecked = (checkedRows?.[`page-${page}`] || []).includes(
            item?.id,
        );

        return isCheckBoxAllowed(item) ? (
            <Checkbox
                checked={isChecked}
                onChange={(event) => onChangeTableBodyCheckbox(event, item)}
            />
        ) : null;
    };

    const IsAllChecked = (checkedRows?.[`page-${page}`] || []).length
        === (list || [])?.filter((item) => isCheckBoxAllowed(item))?.length;

    const showHeaderCheckbox = (list || [])?.filter((item) => isCheckBoxAllowed(item))?.length > 0;

    return isEmpty(list) ? (
        <EmptyStateDocs/>
    ) : (
        <div className={styles.table}>
            <Header
                setGlobalFilters={setGlobalFilters}
                globalFilters={globalFilters}
                onChangeTableHeaderCheckbox={onChangeTableHeaderCheckbox}
                IsAllChecked={IsAllChecked}
                showHeaderCheckbox={showHeaderCheckbox}
            />
            <List
                list={list}
                refetch={refetch}
                loading={loading}
                getTableBodyCheckbox={getTableBodyCheckbox}
            />
            <Pagination
                className={styles.pagination}
                currentPage={page}
                totalItems={totalRecords}
                pageSize={10}
                onPageChange={onPageChange}
            />
        </div>
    );
}

export default CustomTable;
