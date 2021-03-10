import * as React from 'react';
import { IItemsData } from '../types/types';
import ItemListDetail from './item-search-detail';

export interface IItemSearchResults {
    items: IItemsData[];
}

const ItemSearchResults: React.FunctionComponent<IItemSearchResults> = (props: IItemSearchResults) => {
    const { items } = props;
    const filteredItems: IItemsData[] = (CONFIG.PRODUCTS_LIST_LIMIT) ? items.slice(0, CONFIG.PRODUCTS_LIST_LIMIT) : items;
    return (
        <div className="Items--Results">
            {filteredItems.map((item: IItemsData): React.ReactElement => <ItemListDetail key={item.id} {...item} />)}
        </div>
    );
};

export default ItemSearchResults;