import React, { useState } from 'react';
import { Drawer } from 'antd';
import Cart from '../Cart/Cart';
import styles from './ResultTable.module.css';

const ResultTable = ({area, sizeCell, sheetName, pipeName, priceFixTotal, sheetCount, pipeLength, screwCount, priceSheetTotal, pricePipeTotal}) => {

const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};


return (
  <>
    <div className={styles.wrapResult}>
      <table className={styles.wrapResult__table}>
        <thead>
          <tr>
            <th>Наименование</th>
            <th>ед.</th>
            <th>кол-во</th>
            <th>сумма</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{sheetName}</td>
            <td>шт</td>
            <td>{sheetCount}</td>
            <td>{priceSheetTotal}</td>
          </tr>
          <tr>
            <td>{pipeName}</td>
            <td>мп</td>
            <td>{pipeLength}</td>
            <td>{pricePipeTotal}</td>
          </tr>
          <tr>
            <td>Саморез</td>
            <td>шт</td>
            <td>{screwCount}</td>
            <td>{priceFixTotal}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.wrapResult__info}>
        <p>Итого: {priceFixTotal + pricePipeTotal + priceSheetTotal}</p>
        <p>Площадь {`${area.toFixed(2)}м2`}</p>
        <p>Расчетная ячейка {`${sizeCell}x${sizeCell}м`}</p>
      </div>
      <button className={styles.wrapResult__button} onClick={showDrawer}>В корзину</button>
    </div>
    <Drawer  title="Мои покупки" placement="right" onClose={onClose} open={open} width= {320} >
      <Cart sheetName={sheetName} pipeName={pipeName} sheetCount={sheetCount} pipeLength={pipeLength} screwCount={screwCount} priceFixTotal={priceFixTotal} pricePipeTotal={pricePipeTotal} priceSheetTotal={priceSheetTotal}/>
    </Drawer> 
  </>
);
}

export default ResultTable;
