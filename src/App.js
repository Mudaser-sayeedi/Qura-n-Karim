import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import quran from './quranDataV2.json';

function App() {
  const [route, setRoute] = useState('Home');
  const [data, setData] = useState({});
  const [lang, setLang] = useState('dr');

  const change = (e) => {
    // console.log(e.target.value)
    setLang(e.target.value);
  }


  // console.log(data)
  return (
    <div>
      {
        route === 'Home' ? (
          <div className='app-container'>
            <div className='header-container nav'>
              <h1 className='header-title'>Al-Qura'n Karim</h1>
            </div>
            <div className='surahs-container'>
              <h3 className='surahs-title'>Select Aya To Read :</h3>
              <div className='surahs-name'>
                {
                  quran.surahs.map((surah) => {
                    return (
                      <div onClick={
                        () => {
                          setData(surah);
                          setRoute('Surah');
                        }
                      } className='surah' key={surah.surahNumber}>
                        <p>{surah.surahNumber}-{surah.surahName.ar}</p>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        ) : route === "Surah" ? (
          <div className='surah-page'>
            <div className='nav'>
              <button className='back' onClick={() => setRoute('Home')}>Back to Home</button>
              <button className='translation' onClick={() => setRoute('Translation')}>Translation</button>
            </div>

            <div className='surah-container'>
              <div className='surah-title'>
                <h2 style={{ fontSize: 40 }} >{data.surahNumber} - {data.surahName.en}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Translation</h4>
                  <h2 style={{ margin: 0 }}>({data.surahMeaning.en})</h2>
                </div>
                <h2 className='ar ayah'>{data.surahNumber} - {data.surahName.ar}</h2>
              </div>
              <div>
                <h3>Total Ayah ({data.surahInfo.totalVerses})</h3>
              </div>

              {data.surahStart && (
                <div style={{ textAlign: 'center' }}>
                  <h1 className='start-surah'>{data.surahStart.verse}</h1>
                </div>
              )}

              <div className='verse'>
                {
                  data.surahVerses.map((verse) => {
                    return (
                      <p key={verse.verseNumber} className='text ar ayah'>{verse.verse} ({verse.verseNumber})</p>
                    );
                  })
                }
              </div>
            </div>
          </div>
        ) : (
          <div className='translation-container'>
            <div className='nav'>
              <button className='back' onClick={() => setRoute('Home')}>Back to Home</button>
              <button className='translation' onClick={() => setRoute('Surah')}>Back to Surah</button>

              <p style={{ display: 'inline', marginLeft: 10 }}>Select Translation Language</p>
              <select onChange={change}>
                <option value="dr" key="dr">Dari</option>
                <option value="en" key="en">English</option>
              </select>
            </div>

            <div className='surah-container'>
              <div className='surah-title'>
                <h2 style={{ fontSize: 40 }} >{data.surahNumber} - {data.surahName.en}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Translation</h4>
                  <h2 style={{ margin: 0 }}>({data.surahMeaning.en})</h2>
                </div>
                <h2 className='ar ayah'>{data.surahNumber} - {data.surahName.ar}</h2>
              </div>
              <div>
                <h3>Total Ayah ({data.surahInfo.totalVerses})</h3>
              </div>

              {data.surahStart && (
                <div style={{ textAlign: 'center' }}>
                  <h1 className='start-surah'>{data.surahStart.verse}</h1>
                  {
                    lang === 'dr' ? (
                      <p>( {data.surahStart.translation.dr} )</p>

                    ) : (
                      <p>( {data.surahStart.translation.en} )</p>

                    )
                  }
                </div>
              )}

              <div className='verse-translation'>

                {
                  data.surahVerses.map((verse) => {
                    return (
                      <div key={verse.verseNumber} className='translationAya'>
                        <div style={{ width: '50%', marginRight: 30 }}>
                          {
                            lang === 'dr' ? (
                              <p className='ar' style={{ fontSize: 25 }}>{verse.translation.dr} ({verse.verseNumber})</p>
                            ) : (
                              <p className='' style={{ fontSize: 25 }}>{verse.translation.en} ({verse.verseNumber})</p>
                            )
                          }
                        </div>
                        <div style={{ width: '50%' }}>
                          <p key={verse.verseNumber} className='ar ayah'>{verse.verse} ({verse.verseNumber})</p>
                        </div>
                      </div>
                    );
                  })
                }
              </div>

            </div>
          </div>
        )
      }
    </div >
  );
}

export default App;
