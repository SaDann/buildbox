import React from 'react';
import styles from './styles.module.scss';

interface Props {
  image: string;
  message: string;
  author: string;
  onDelete: () => void;
  onAnimationEnd: () => void;
  willDestroy: boolean;
}

function FeedItem(props: Props) {
  return (
    <div className={styles.item} data-will-destroy={props.willDestroy} onAnimationEnd={() => props.onAnimationEnd()}>
      <img src={props.image} alt="" />
      <div>
        <span>{props.message}</span>
        <span>Enviado por</span>
        <span>{props.author}</span>
      </div>
      <button onClick={props.onDelete}>
        <img src="x.png" />
      </button>
    </div>
  );
}

export default FeedItem;
