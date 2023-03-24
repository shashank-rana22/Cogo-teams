import { Pagination } from "@cogoport/components";
import Card from "../Card";
import styles from './styles.module.css';

export default function List({ data, loading, filters, setFilters }){

    const {list, total} = data;

    if(loading){
        return <div>Loading...</div>
    }

    const renderPagination = (
        <Pagination
            type="table"
            totalItems={total}
            pageSize={10}
            currentPage={filters.page}
            onPageChange={(val) => setFilters({...filters, page: val})}
        />
    )

    return <div className={styles.container} >
        {renderPagination}
        <div className={styles.list_container} >{list.map((item) => <Card item={item} />)}</div>
        {renderPagination}
    </div>
}