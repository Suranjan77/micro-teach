"use client"

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

const power_map = new Map();
power_map.set(1, 0);
power_map.set(2, 1);
power_map.set(4, 2);
power_map.set(8, 3);
power_map.set(16, 4);
power_map.set(32, 5);
power_map.set(64, 6);
power_map.set(128, 7);

function powersOfTwo(x) {
  const powers = [];
  let i = 1;

  while (i <= x) {
    if (i & x) {
      powers.push(i);
    }
    i <<= 1;
  }

  return powers;
}

function eightBitBinary(n) {
  const bin = [0, 0, 0, 0, 0, 0, 0, 0];
  powersOfTwo(n).forEach((idx) => bin[power_map.get(idx)] = 1);
  return bin;
}

export default function presentation() {

  const [currSlideNo, setCurrSlideNo] = useState(0);
  const [slide1Hints, setSlide1Hints] = useState(false);
  const [binaryFlip, setBinaryFlip] = useState([0, 0, 0, 0]);
  const [showBinCalc, setShowBinCalc] = useState(true);

  const [redFlip, setRedFlip] = useState([0, 0, 0, 0, 1, 0, 1, 0]);
  const [greenFlip, setGreenFlip] = useState([0, 0, 0, 1, 1, 1, 0, 0]);
  const [blueFlip, setBlueFlip] = useState([0, 0, 0, 1, 1, 1, 1, 0]);

  const [red, setRed] = useState(10);
  const [green, setGreen] = useState(60);
  const [blue, setBlue] = useState(30);

  const [colorUpdate, setColorUpdate] = useState(true);


  const slides = [
    {
      title: "Numbers in Computer",
      content: (
        <div className={styles.two_col}>
          <div style={
            {
              backgroundColor: '#455d7a'
            }
          }>By Suranjan</div>
          <div style={
            {
              marginLeft: 'auto'
            }
          }>
            <h4 className={styles.sub_heading}>Learning aims</h4>
            <ul>
              <li>Learn how computer represent numbers</li>
              <li>Learn how computers use numbers to do everything</li>
              <li>Learn how numbers are represented at hardware level</li>
              <li>Learn how numbers representation affects power efficiency</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Introduction",
      content: (
        <div className={styles.intro_content}>
          <ul>
            <li>How do computers store numerical data?</li>
            <li>Why might computers not use decimal number?</li>
          </ul>

          <div className={styles.hint_btn}>
            <Image src={'/lamp.png'} onClick={() => setSlide1Hints(!slide1Hints)} width="60" height="60" alt="Hints" />
            <div>{slide1Hints ? 'click to remove' : 'click for hints'}</div>
          </div>

          {slide1Hints ?
            <div className={styles.hint}>
              <ul>
                <li>Computer process data using electric circuits</li>
                <li>Electronic signals can be distinguished between two states</li>
              </ul>
            </div>
            : <></>
          }
        </div>
      )
    },
    {
      title: "Binary number system",
      content: (
        <div>
          <div className={styles.two_col}>
            <div className={styles.bg_btn}>
              <h4 className={styles.sub_heading}>Decimal (Base 10)</h4>
              Uses digits 0 to 9 <br />
              Thousands (10<sup>3</sup>) = 1000 <br />
              Hundreds (10<sup>2</sup>) = 100 <br />
              Tens (10<sup>1</sup>) = 10 <br />
              Ones (10<sup>0</sup>) = 1 <br />
            </div>
            <div className={styles.bg_btn}>
              <h4 className={styles.sub_heading}>Binary (Base 2)</h4>
              Uses digits 0 and 1 <br />
              Eight (2<sup>3</sup>) = 8 <br />
              Four (2<sup>2</sup>) = 4 <br />
              Two (2<sup>1</sup>) = 2 <br />
              One (2<sup>0</sup>) = 1 <br />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Binary Counting",
      content: (
        <div>
          Click the cards to see the calculation
          <div className={styles.two_col}>
            <div className={styles.binary_cards_holder}>
              {binaryFlip.map((bit, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const temp = [...binaryFlip];
                    temp[idx] = bit === 0 ? 1 : 0;
                    setBinaryFlip(temp);
                    setShowBinCalc(true);
                  }}
                  className={(binaryFlip[idx] === 0) ? styles.binary_flip_btn : styles.binary_flip_btn_on}>
                  {bit}
                </button>
              ))
              }
            </div>
            <div>
              {showBinCalc && (
                <table>
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Value</th>
                      <th>Calculation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      binaryFlip.map((bit, idx) => (
                        <tr key={idx}>
                          <td>2<sup>{(binaryFlip.length - 1) - idx}</sup></td>
                          <td>{bit}</td>
                          <td>{bit * 2 ** ((binaryFlip.length - 1) - idx)}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>Sum</td>
                      <td>{
                        binaryFlip.reduce((sum, bit, idx) => {
                          sum = sum + (bit * 2 ** ((binaryFlip.length - 1 - idx)));
                          return sum;
                        }, 0)
                      }</td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "A colourful world",
      content: (
        <>
          <div className={styles.two_col}>
            <div className={styles.slider_container}>
              <h3 className={styles.sub_heading}>Sliders</h3>
              <div className={styles.slider}>
                <label>Red</label>
                <input
                  className={styles.redSlider}
                  id="redSlider"
                  type="range"
                  max="255"
                  min="0"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setRed(val);
                    setColorUpdate(true);
                    setRedFlip(eightBitBinary(val));
                  }}
                  defaultValue={red} />
                <span>{red}</span>
              </div>

              <div className={styles.bin_holder}>
                {redFlip.map((i, idx) => (
                  <span key={idx}>{i}</span>
                ))}
              </div>

              <div className={styles.slider}>
                <label>Green</label>
                <input
                  className={styles.greenSlider}
                  id="greenSlider"
                  type="range"
                  max="255"
                  min="0"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setGreen(val);
                    setColorUpdate(true);
                    setGreenFlip(eightBitBinary(val));
                  }}
                  defaultValue={green} />
                <span>{green}</span>
              </div>

              <div className={styles.bin_holder}>
                {greenFlip.map((i, idx) => (
                  <span key={idx}>{i}</span>
                ))}
              </div>

              <div className={styles.slider}>
                <label>Blue</label>
                <input
                  className={styles.blueSlider}
                  id="blueSlider"
                  type="range"
                  max="255"
                  min="0"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setBlue(val);
                    setColorUpdate(true);
                    setBlueFlip(eightBitBinary(val));
                  }}
                  defaultValue={blue} />
                <span>{blue}</span>
              </div>

              <div className={styles.bin_holder}>
                {blueFlip.map((i, idx) => (
                  <span key={idx}>{i}</span>
                ))}
              </div>

            </div>
            <div className={styles.color_box_holder}>
              <div style={{
                backgroundColor: `rgb(${red}, ${green}, ${blue})`,
                width: '200px',
                height: '200px'
              }}>
              </div>
            </div>
          </div>
          <div className={styles.small_ul}>
            <ul>
              <li>8 binary digits can represent 2<sup>8</sup> = 256 numbers</li>
              <li>Each color channel (R,G,B) uses numbers from 0-255</li>
              <li>Total possible color = 256 x 256 x 256 ~ around 16.7 million.</li>
            </ul>
          </div>
        </>
      )
    },
    {
      title: "Transistors",
      content: (
        <>
          <div className={styles.two_col}>
            <div>
              <Image src={'/transis.png'} width={600} height={400} alt="Transistor voltage" />
            </div>
            <div>
              <Image src={'/transistor.png'} width={100} height={200} alt="Transistor image" />
              <Image src={'/size_comp.png'} width={300} height={300} alt="Size comparison" />
            </div>
          </div>
          <div className={styles.small_ul}>
            <ul>
              <li>Transistors can represent 0 or 1 based on the voltage supplied</li>
              <li>Its simpler design has allowed modern transistor of size around 45nm, and modern CPUs like M4 used in apple macbook contains 28 billion transistors</li>
            </ul>

            How many transistors are required to represent the number 5 ?

          </div>
        </>
      )
    },
    {
      title: "Energy Efficiency",
      content: (
        <div>
          <ul>
            <li>Data centers account for up to 4% global energy consumption</li>
            <li>Ask ChatGPT <br />
              "If computers used decimal system to represent numbers, how much electricity would the data centre consume? Give very concise assumption."</li>
          </ul>

        </div>
      )
    },
    {
      title: "Thank you",
      content: (
        <>
          References
          <div className={styles.small_ul}>
            <ul>
              <li>Hajj, A.E. (2022) What reaching the size limit of the transistor means for the future. https://insidetelecom.com/what-reaching-the-size-limit-of-the-transistor-means-for-the-future/.</li>
              <li>Knowledge, D.C. (2024) Data Center Power: Fueling the digital Revolution. https://www.datacenterknowledge.com/energy-power-supply/data-center-power-fueling-the-digital-revolution.</li>
            </ul>
          </div>
        </>
      )
    }
  ];


  function SlideControls() {

    const handleNClick = () => setCurrSlideNo(currSlideNo + 1);
    const handlePClick = () => setCurrSlideNo(currSlideNo - 1);

    const showNext = currSlideNo < (slides.length - 1);
    const showPrev = currSlideNo > 0;

    return (
      <div className={styles.btn_cont}>
        {showPrev ?
          <button onClick={handlePClick}>Previous</button>
          : <div />
        }
        <div></div>
        {showNext ?
          <button onClick={handleNClick}>Next</button>
          : <div />
        }
      </div>
    );
  }

  return (
    <div className={styles.presentation}>
      <div className={styles.slides_container}>
        <div className={styles.slide_title}>
          {slides[currSlideNo].title}
        </div>
        <div className={styles.slide_content}>
          {slides[currSlideNo].content}
        </div>
        <SlideControls />
      </div>
    </div>
  );
}
