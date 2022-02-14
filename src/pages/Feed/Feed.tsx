import React, { useEffect, useState } from 'react';
import FeedItem from '../FeedItem/FeedItem';
import { Item } from '../PostBox/PostBox';
import styles from './styles.module.scss';

interface FeedItemData extends Item {
    willDestroy: boolean;
}

interface Props {
    items: Item[];
    onDelete: (item: number) => void;
}

function convertItems(items: Item[]): FeedItemData[] {
    return items.map((item: Item) => {
        return {...item, willDestroy: false};
    });
}

function Feed(props: Props) {
    let [items, setItems] = useState<FeedItemData[]>([]);

    useEffect(() => {
        setItems([...convertItems(props.items)]);
    }, [props.items])

    return (
        <div className={styles.feed}>
            <header>
                <h4>Feed</h4>
            </header>

            <div className={styles.content}>
                {items.map((item, index) => {
                    return (
                        <FeedItem
                            key={`message${item.num}`}
                            message={item.message}
                            image={item.image}
                            author={item.name}
                            willDestroy={item.willDestroy}
                            onDelete={() => {
                                let tmpArr = [...items];
                                tmpArr[index].willDestroy = true;
                                setItems(tmpArr);
                            }}
                            onAnimationEnd={() => {
                                if (item.willDestroy) {
                                    props.onDelete(index);
                                }
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Feed;
