import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './Cart.module.css';

const Cart = ({ sheetName, pipeName, priceFixTotal, sheetCount, pipeLength, screwCount, priceSheetTotal, pricePipeTotal}) => {

return (
  <div className={styles.wrapCart}>
    <ShoppingCartOutlined style={{ fontSize: '64px', color: '#839BB1' }} />
    <div className={styles.resultTableCart}>
      <table className={styles.wrapResult__tableCart}>
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
      <p>Итого: {priceFixTotal + pricePipeTotal + priceSheetTotal}</p>
    </div>
  </div>
);
}

export default Cart;



