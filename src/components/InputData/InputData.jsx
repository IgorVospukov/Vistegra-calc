import React, { useState } from 'react';
import  data  from '../../data/data.json';
import  config  from '../../data/config.json';
import ResultTable from '../ResultTable/ResultTable';
import styles from './InputData.module.css';

const InputData = () => {

const [sheet, setSheet] = useState('Лист-1 0.5 ширина 1.8м'); //состояние для корректной работы select
const [sheetName, setSheetName] = useState('Лист-1 0.5 ширина 1.8м'); // для передачи в таблицу
const [material, setMaterial] = useState('metal');
const [sheetWidth, setSheetWidth] = useState(1);
const [pipe, setPipe] = useState('Труба 20х20'); //состояние для корректной работы select
const [pipeName, setPipeName] = useState('Труба 20х20'); //для передачи в таблицу
const [pipeWidth, setPipeWidth] = useState(20);
const [step, setStep] = useState(1);
const [width, setWidth] = useState(5);
const [length, setLength] = useState(5);
const [area, setArea] = useState(1);
const [sizeCell, setSizeCell] = useState('0.96');
const [strength, setStrength] = useState('Стандартная');
const [sheetCount, setSheetCount] = useState(0);
const [pipeLength, setPipeLength] = useState(0);
const [screwCount, setScrewCount] = useState(0);
const [priceSheet, setPriceSheet] = useState(12);
const [pricePipe, setPricePipe] = useState(18);
const [priceSheetTotal, setPriceSheetTotal] = useState(1);
const [pricePipeTotal, setPricePipeTotal] = useState(1);
const [priceFixTotal, setPriceFixTotal] = useState(15);

const handleMaterialChange = (event) => {
  const newSheet = event.target.value;
  const sheetName = newSheet.split(',')[0]
  const widthSheetFromOption = newSheet.split(',')[1];
  const newMaterial = newSheet.split(',')[2].trim();
  const priceSheet = newSheet.split(',')[3];
  setSheet(newSheet);
  setMaterial(newMaterial);
  setSheetName(sheetName);
  setSheetWidth(widthSheetFromOption);
  setPriceSheet(priceSheet);
};

const handlePipeChange = (event) => {
  const newPipe = event.target.value;
  const pipeName = newPipe.split(',')[0];
  const widthPipeFromOption = newPipe.split(',')[1];
  const pricePipe = newPipe.split(',')[2];
  setPipe(newPipe);
  setPipeName(pipeName);
  setPipeWidth(widthPipeFromOption);
  setPricePipe(pricePipe);
};

const handleWidthChange = (event) => {
  const newWidth = event.target.value;
  setWidth(newWidth);
};

const handleLengthChange = (event) => {
  const newLength = event.target.value;
  setLength(newLength);
};

const handleStrengthChange = (event) => {
  const newStrength = event.target.value;
  const stepFromOption = newStrength.split(',')[1];
  setStrength(newStrength);
  setStep(stepFromOption);
};

const calculateSheetCountAndPrice = () => {
  if (isNaN(length) || isNaN(width) || isNaN(sheetWidth) || length === undefined || width === undefined || sheetWidth === undefined) {
    console.log('One of the arguments is not a number or is undefined');
    return;
  };
  const area = width * length;
  const priceSheetTotal = Math.ceil(width * length * priceSheet);
  setSheetCount(Math.ceil(area / sheetWidth));
  setPriceSheetTotal(priceSheetTotal);
  setArea(area);
};

const calculatePipeLengthAndPrice = () => {
  if (isNaN(length) || isNaN(width) || isNaN(pipeWidth) || length === undefined || width === undefined || pipeWidth === undefined) {
    console.log('One of the arguments is not a number or is undefined');
    return;
  };
  const NumbersOfPipeDependOnLength = (Number(length) + (Number(step) - 2*(pipeWidth/1000)))/((pipeWidth/1000) + (Number(step)  - 2*(pipeWidth/1000))); //количество штук трубы перпендикулярно длине length
  const NumbersOfPipeDependOnWidth = (Number(width) + (Number(step) - 2 * (pipeWidth/1000)))/((pipeWidth/1000) + (Number(step) - 2*(pipeWidth/1000))); // количество штук трубы перпендикулярно ширине width
  const totalPipeLength = Math.ceil((NumbersOfPipeDependOnLength*Number(width) + NumbersOfPipeDependOnWidth*Number(length))); //формула может зависeть от способа монтажа внешнего каркаса
  const sizeCell = Number(step) - 2 * (pipeWidth/1000)
  const pricePipeTotal = Math.ceil(totalPipeLength * pricePipe);
  setPipeLength(totalPipeLength);
  setPricePipeTotal(pricePipeTotal);
  setSizeCell(sizeCell);
  };

const calculateScrewCountAndPrice = () => {
  if (material === undefined) {
    console.log('arguments is undefined');
    return;
  };
  if (material === 'metal') {
    const screwCountMetal = Math.ceil(Number(width) * Number(length) * config.filter((item) => item.type === 'fix').filter((item) => item.key === 'metal')[0].value);
    const totalPriceScrew = Math.floor(screwCountMetal * Number(data.filter((item) => item.type === 'fix')[0].price));
    setScrewCount(screwCountMetal);
    setPriceFixTotal(totalPriceScrew);
    return;
  };

  if(material === 'plastic') {
    const screwCountPlastic = Math.ceil(
      (Number(width) * Number(length)) * config.filter((item) => item.type === "fix").filter((item) => item.key === 'plastic')[0].value);
      const totalPriceScrew = Math.floor(screwCountPlastic * Number(data.filter((item) => item.type === 'fix')[0].price));
      setScrewCount(screwCountPlastic);
      setPriceFixTotal(totalPriceScrew);
    };  
};

const handleSubmit = (event) => {
  event.preventDefault();
  calculateSheetCountAndPrice();
  calculateScrewCountAndPrice();
  calculatePipeLengthAndPrice();
};

return (
  <div className={styles.wrap}>
      <form className={styles.formWrap}>
        <label className={styles.formWrap__sheet}>
          Выберите листы:
          <select className={styles.formWrap__sheet__select} value={sheet} onChange={handleMaterialChange}>
            {data.filter((item) => item.type === 'list').map((item) => (
            <option key={item.name} value={`${item.name}, ${item.width}, ${item.material}, ${item.price}`}>
              {item.name}
            </option>
            ))}
          </select>
        </label>
        <div className={styles.materialContainer}>
          <span className={styles.materialContainer__material}>
            Материал листа:{material}
          </span>
        </div>
        <label className={styles.formWrap__pipe}>
          Выберите трубу:
          <select className={styles.formWrap__pipe__select} value={pipe} onChange={handlePipeChange}>
            {data.filter((item) => item.type === 'pipe').map((item) => (
            <option key={item.name} value={`${item.name}, ${item.width}, ${item.price}`}>
              {item.name}
            </option>
            ))}
          </select>
        </label>
        <label className={styles.formWrapwidth}>
          Ширина покрытия:
          <input className={styles.formWrapwidth__width} type="number" value={width} onChange={handleWidthChange} step={0.2} min={5} max={25} />
        </label>
        <label className={styles.formWrap__length}>
          Длина покрытия:
          <input className={styles.formWrapwidth__length} type="number" value={length} onChange={handleLengthChange} step={0.2} min={5} max={50} />
        </label>
        <label className={styles.formWrap__strength}>
          Прочность:
          <select className={styles.formWrap__strength__select} value={strength} onChange={handleStrengthChange}>
            {config.filter((item) => item.type === 'frame').map((item) => (
            <option key={item.key} value={`${item.name},${item.step}`}>
              {item.name}
            </option>
            ))}
          </select>
        </label>
        <button className={styles.formWrap__buttonSubmit} onClick={handleSubmit}>Рассчитать материал</button>
      </form>
    <div className={styles.resultTable}>
      <ResultTable area={area} sizeCell={sizeCell} sheetName={sheetName} pipeName={pipeName} sheetCount={sheetCount} pipeLength={pipeLength} screwCount={screwCount} priceFixTotal={priceFixTotal} priceSheetTotal={priceSheetTotal} pricePipeTotal={pricePipeTotal}/>
    </div>
  </div>
);
}

export default InputData;
