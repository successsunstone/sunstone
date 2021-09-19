import React, { useState } from 'react';
// import DrawerSearch from './DrawerSearch';
import styles from './ElementsDrawer.module.css';
import scrollbar from './scrollbar.module.css';

export default function (props) {
  const [bundle, setBundle] = useState(window.bundles[0]);

  const internalAddElement = (shape) => {
    console.log(shape);
    const { addElement } = props;
    const element = {
      elementableType: 'Shape',
      transparency: 1,
      zIndex: 0,
      posX: 0,
      posY: 0,
      // _destroy: true
      elementableAttributes: {
        shape, color: '#c7d0d8', width: 500, height: 500,
      },
    };
    addElement(element);
  };

  return (
    <>
      {/* <DrawerSearch placeholder="Search icons and shapes" /> */}
      <div className={scrollbar.horizontalScroll}>
        {window.bundles.map((thebundle) => (
          <button
            key={thebundle.label}
            type="button"
            className="bundlebutton"
            onClick={() => setBundle(thebundle)}>
            {thebundle.label}
          </button>
        ))}
      </div>
      <div className={scrollbar.customScroll}>
        <div className={styles.elementsDrawer}>
          <div className={styles.itemList}>
            {bundle.bundle.map((item, index) => (
              <div
                key={`${item.name}${index}`}
                className={styles.item}
                onClick={() => internalAddElement(item.name)}
              >
                <svg>
                  <use href={item.url} x="0" y="0" width="100" height="100"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
