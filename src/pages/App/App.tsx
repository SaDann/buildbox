import React from 'react';
import styles from './App.module.scss';
import Header from '../Header/Header';
import {PostBox, Item} from '../PostBox/PostBox';
import Feed from '../Feed/Feed';
import { useState } from 'react';

function App() {
  let [feedItems, setFeedItem] = useState<Item[]>([]);

  return (
    <>
      <Header />
      <div className={styles.content}>
        <PostBox
          onNewItem={(item: Item) => {
            setFeedItem([item, ...feedItems]);
          }}
        />
        <Feed
          items={feedItems}
          onDelete={(item: number) => {
            let tmpArr = [...feedItems];
            tmpArr.splice(item, 1);
            setFeedItem(tmpArr);
          }}
        />
      </div>
    </>
  );
}

export default App;
