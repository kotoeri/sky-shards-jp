import { useEffect } from 'react';
import { FaCog, FaMinus, FaPlus, FaBell } from 'react-icons/fa';
import { Popover } from '@headlessui/react';
import { DateTime, Settings, Zone } from 'luxon';
import Clock from '../../components/Clock';
import Date from '../../components/Date';
import { useHeaderFx } from '../../context/HeaderFx';
import { useSettings } from '../../context/Settings';
import useLocalStorageState from '../../hooks/useLocalStorageState';

interface HeaderProp {
  setTwelveHourModeSetting: (value: string) => void;
  setLightMode: (value: string) => void;
  twelveHourModeSetting: string;
  lightMode: string;
}

const stringifyZone = (zone: string | Zone) => (typeof zone === 'string' ? zone : zone.name);

export default function Header({
  setTwelveHourModeSetting,
  setLightMode,
  twelveHourModeSetting,
  lightMode,
}: HeaderProp) {
  const { isLightMode } = useSettings();
  const { navigateDay, fontSize: fontSizeAdjust, setFontSize: setFontSizeAdjust } = useHeaderFx();

  const navigateToday = () => navigateDay(DateTime.local({ zone: 'America/Los_Angeles' }));

  const [timezone, setTimezone] = useLocalStorageState('timezone', stringifyZone(Settings.defaultZone));

  useEffect(() => {
    Settings.defaultZone = timezone;
    if (stringifyZone(Settings.defaultZone) === Intl.DateTimeFormat().resolvedOptions().timeZone) {
      localStorage.removeItem('timezone');
    }
  }, [timezone]);

  return (
    <header id='header' className='glass'>
      <a id='title' href='/' onClick={e => (navigateToday(), e.preventDefault())}>
        <span>Sky Shards</span>
      </a>

      <time dateTime={DateTime.utc().toISO()} id='header-dateTime' onClick={navigateToday}>
        <Date hideYear short />
        <Clock sky hideSeconds />
      </time>

      <div id='header-buttons'>
        <Popover className='relative'>
          <Popover.Button className='w-min rounded-lg bg-slate-50 bg-opacity-25 p-1.5 shadow-xl shadow-zinc-700 hover:bg-opacity-50'>
            <FaCog size={18} />
          </Popover.Button>
          <Popover.Panel
            className={`text-border absolute z-10 w-60 rounded-lg text-white shadow-xl shadow-zinc-700 backdrop-blur-3xl backdrop-saturate-150 backdrop-filter
            ${isLightMode ? 'bg-sky-600' : 'bg-violet-900'}`}
            style={{ top: '2rem', right: '0rem' }}
          >
            <div className='min-h-50 flex flex-col gap-2 p-2 '>
              <h3 className='text-center text-lg font-bold'>Settings</h3>
              <div className='border-t-2 border-zinc-300 border-opacity-50 pt-1'>
                <p className='text-md'>Theme</p>
                <div className='m-1.5 flex flex-row items-center rounded-full'>
                  {[
                    ['Light', 'true', 'rounded-l-full'],
                    ['System', 'system', 'border-x-2 border-zinc-300 border-opacity-50'],
                    ['Dark', 'false', 'rounded-r-full'],
                  ].map(([label, value, addClass]) => (
                    <button
                      key={value}
                      className={`flex-1  whitespace-nowrap p-1 text-xs 
                    ${lightMode === value ? 'bg-opacity-20' : ''} 
                    ${isLightMode ? 'bg-sky-300 text-black' : 'bg-violet-600 text-white'} 
                    ${addClass}`}
                      onClick={() => setLightMode(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className='border-t-2 border-zinc-300 border-opacity-50 pt-1'>
                <p className='text-md'>Time Format</p>
                <div className='m-1.5 flex flex-row items-center rounded-full'>
                  {[
                    ['12 Hour', 'true', 'rounded-l-full'],
                    ['System', 'system', 'border-x-2 border-zinc-300 border-opacity-50'],
                    ['24 Hour', 'false', 'rounded-r-full'],
                  ].map(([label, value, addClass]) => (
                    <button
                      key={value}
                      className={`flex-1  whitespace-nowrap p-1 text-xs 
                      ${twelveHourModeSetting === value ? ' bg-opacity-20' : ''} 
                      ${isLightMode ? 'bg-sky-300 text-black' : 'bg-violet-600 text-white'}
                      ${addClass}`}
                      onClick={() => setTwelveHourModeSetting(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className='border-t-2 border-zinc-300 border-opacity-50 pt-1'>
                <div className='flex flex-row items-center justify-between px-1'>
                  <p className='text-md'>Timezone</p>
                  <p
                    className='cursor-pointer text-xs underline'
                    onClick={() => setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)}
                  >
                    Reset
                  </p>
                </div>
                <select
                  className={`shadow-zinc-70 no-scrollbar w-full rounded-lg px-1 py-0.5 shadow-xl
                ${isLightMode ? 'bg-sky-300 text-black' : 'bg-violet-600 text-white'}`}
                  onChange={e => setTimezone(e.target.value)}
                  value={timezone}
                >
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    Intl.supportedValuesOf('timeZone').map((tz: string) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className='border-t-2 border-zinc-300 border-opacity-50 pt-1'>
                <p className='text-md'>Font Size</p>
                <div className='flex w-full flex-row items-center justify-center gap-2 pt-1'>
                  <button
                    className={`rounded-full p-1.5 shadow-xl shadow-zinc-700 hover:bg-opacity-50
                    ${isLightMode ? 'bg-sky-300 text-black' : 'bg-violet-600 text-white'}`}
                    onClick={() => setFontSizeAdjust(fontSizeAdjust - 0.1)}
                  >
                    <FaMinus size={12} />
                  </button>
                  <p>{fontSizeAdjust.toFixed(1)}</p>
                  <button
                    className={`rounded-full p-1.5 shadow-xl shadow-zinc-700 hover:bg-opacity-50
                    ${isLightMode ? 'bg-sky-300 text-black' : 'bg-violet-600 text-white'}`}
                    onClick={() => setFontSizeAdjust(fontSizeAdjust + 0.1)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
    </header>
  );
}
