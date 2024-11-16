"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function presentation() {

  const [currSlideNo, setCurrSlideNo] = useState(2);
  const [slide1Hints, setSlide1Hints] = useState(false);
  const [surprise, setSurprise] = useState(false);
  const [binaryFlip, setBinaryFlip] = useState([0, 0, 0, 0]);
  const [showBinCalc, setShowBinCalc] = useState(true);

  const slides = [
    {
      title: "Introduction to Binary Numbers",
      content: (
        <div className={styles.intro_content}>
          <ul>
            <li>How do computers store numerical data?</li>
            <li>Why might computers not use decimal number?</li>
          </ul>

          <div className={styles.hint_btn}>
            <Image src={'/lamp.png'} onClick={() => setSlide1Hints(!slide1Hints)} width="60" height="60" alt="Hints" />
            <div>click for hints</div>
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
      title: "Binary Playground",
      content: (
        <div>
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
                          console.log(sum);
                          return sum;
                        }, 0)
                      }</td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>

          <div className={styles.surprise} onClick={() => setSurprise(!surprise)}>😁 Click here for a surprise 😁</div>

          {surprise ?
            <div className={styles.two_col}>
              <div>

              </div>
              <div>

              </div>
            </div>
            : <></>
          }

        </div>
      )
    },
    {
      title: 4,
      content: ""
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
