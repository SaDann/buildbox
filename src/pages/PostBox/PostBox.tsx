import React, { useState } from 'react';
import { useRef } from 'react';
import styles from './styles.module.scss';

export interface Item {
  name: string;
  message: string;
  image: string;
  num: number;
}

interface Props {
  onNewItem: (item: Item) => void;
}

export function PostBox(props: Props) {
  let imgInput = useRef<HTMLInputElement>(null);
  let [item, setItem] = useState<Item>({
    name: '',
    message: '',
    image: '',
    num: 0,
  });

  const changeImg = () => {
    if (item.image === '') {
      imgInput.current?.click();
    } else {
      setItem({...item, image: ''});
    }
  }

  const onImgInput = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file === undefined) return;

    const fr = new FileReader();
    fr.onload = () => {
      console.log(fr.result);

      if (typeof fr.result === 'string') {
        console.log(fr.result);
        setItem({...item, image: fr.result});
      }
    }
    fr.readAsDataURL(file)
  }

  return (
    <div className={styles.postBox}>
      <button data-no-image={item.image === ''} onClick={changeImg} className={styles.imgInput}>
        {(item.image === '') ? (
          <>
            <input type="file" accept='image/png, image/jpeg' ref={imgInput} onInput={onImgInput}></input>
            <img src="no-image.png" alt="" />
          </>
        ) : (
          <>
            <img className={styles.discardImg} src='x.png' alt='' />
            <img className={styles.postImg} src={item.image} alt='' />
          </>
        )}
      </button>

      <input
        onInput={(e) => {
          setItem({ ...item, name: e.currentTarget.value })
        }}
        placeholder='Digite seu nome'
        className={styles.name}
        type="text"
      />
      <textarea
        onInput={(e) => {
          setItem({ ...item, message: e.currentTarget.value })
        }}
        placeholder='Mensagem'
        className={styles.message}
      />

      <div className={styles.postButtons}>
        <button className={styles.discard}>Descartar</button>
        <button
          className={styles.publish}
          onClick={() => {
            if (item.image !== '' && item.message !== '' && item.name !== '') {
              props.onNewItem(item);
              setItem({...item, num: item.num + 1});
            }
          }}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
