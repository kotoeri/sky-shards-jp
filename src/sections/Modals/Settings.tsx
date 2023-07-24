import { useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { Settings as LuxonSettings, Zone } from 'luxon';
import { useHeaderFx } from '../../context/HeaderFx';
import { ModalProps } from '../../context/ModalContext';
import { useSettings } from '../../context/Settings';
import useLocalStorageState from '../../hooks/useLocalStorageState';
import {FormattedMessage} from 'react-intl';  // for localize

const timezonesJson =
  '["Africa/Abidjan","Africa/Accra","Africa/Addis_Ababa","Africa/Algiers","Africa/Asmera","Africa/Bamako","Africa/Bangui","Africa/Banjul","Africa/Bissau","Africa/Blantyre","Africa/Brazzaville","Africa/Bujumbura","Africa/Cairo","Africa/Casablanca","Africa/Ceuta","Africa/Conakry","Africa/Dakar","Africa/Dar_es_Salaam","Africa/Djibouti","Africa/Douala","Africa/El_Aaiun","Africa/Freetown","Africa/Gaborone","Africa/Harare","Africa/Johannesburg","Africa/Juba","Africa/Kampala","Africa/Khartoum","Africa/Kigali","Africa/Kinshasa","Africa/Lagos","Africa/Libreville","Africa/Lome","Africa/Luanda","Africa/Lubumbashi","Africa/Lusaka","Africa/Malabo","Africa/Maputo","Africa/Maseru","Africa/Mbabane","Africa/Mogadishu","Africa/Monrovia","Africa/Nairobi","Africa/Ndjamena","Africa/Niamey","Africa/Nouakchott","Africa/Ouagadougou","Africa/Porto-Novo","Africa/Sao_Tome","Africa/Tripoli","Africa/Tunis","Africa/Windhoek","America/Adak","America/Anchorage","America/Anguilla","America/Antigua","America/Araguaina","America/Argentina/La_Rioja","America/Argentina/Rio_Gallegos","America/Argentina/Salta","America/Argentina/San_Juan","America/Argentina/San_Luis","America/Argentina/Tucuman","America/Argentina/Ushuaia","America/Aruba","America/Asuncion","America/Bahia","America/Bahia_Banderas","America/Barbados","America/Belem","America/Belize","America/Blanc-Sablon","America/Boa_Vista","America/Bogota","America/Boise","America/Buenos_Aires","America/Cambridge_Bay","America/Campo_Grande","America/Cancun","America/Caracas","America/Catamarca","America/Cayenne","America/Cayman","America/Chicago","America/Chihuahua","America/Ciudad_Juarez","America/Coral_Harbour","America/Cordoba","America/Costa_Rica","America/Creston","America/Cuiaba","America/Curacao","America/Danmarkshavn","America/Dawson","America/Dawson_Creek","America/Denver","America/Detroit","America/Dominica","America/Edmonton","America/Eirunepe","America/El_Salvador","America/Fort_Nelson","America/Fortaleza","America/Glace_Bay","America/Godthab","America/Goose_Bay","America/Grand_Turk","America/Grenada","America/Guadeloupe","America/Guatemala","America/Guayaquil","America/Guyana","America/Halifax","America/Havana","America/Hermosillo","America/Indiana/Knox","America/Indiana/Marengo","America/Indiana/Petersburg","America/Indiana/Tell_City","America/Indiana/Vevay","America/Indiana/Vincennes","America/Indiana/Winamac","America/Indianapolis","America/Inuvik","America/Iqaluit","America/Jamaica","America/Jujuy","America/Juneau","America/Kentucky/Monticello","America/Kralendijk","America/La_Paz","America/Lima","America/Los_Angeles","America/Louisville","America/Lower_Princes","America/Maceio","America/Managua","America/Manaus","America/Marigot","America/Martinique","America/Matamoros","America/Mazatlan","America/Mendoza","America/Menominee","America/Merida","America/Metlakatla","America/Mexico_City","America/Miquelon","America/Moncton","America/Monterrey","America/Montevideo","America/Montreal","America/Montserrat","America/Nassau","America/New_York","America/Nipigon","America/Nome","America/Noronha","America/North_Dakota/Beulah","America/North_Dakota/Center","America/North_Dakota/New_Salem","America/Ojinaga","America/Panama","America/Pangnirtung","America/Paramaribo","America/Phoenix","America/Port-au-Prince","America/Port_of_Spain","America/Porto_Velho","America/Puerto_Rico","America/Punta_Arenas","America/Rainy_River","America/Rankin_Inlet","America/Recife","America/Regina","America/Resolute","America/Rio_Branco","America/Santa_Isabel","America/Santarem","America/Santiago","America/Santo_Domingo","America/Sao_Paulo","America/Scoresbysund","America/Sitka","America/St_Barthelemy","America/St_Johns","America/St_Kitts","America/St_Lucia","America/St_Thomas","America/St_Vincent","America/Swift_Current","America/Tegucigalpa","America/Thule","America/Thunder_Bay","America/Tijuana","America/Toronto","America/Tortola","America/Vancouver","America/Whitehorse","America/Winnipeg","America/Yakutat","America/Yellowknife","Antarctica/Casey","Antarctica/Davis","Antarctica/DumontDUrville","Antarctica/Macquarie","Antarctica/Mawson","Antarctica/McMurdo","Antarctica/Palmer","Antarctica/Rothera","Antarctica/Syowa","Antarctica/Troll","Antarctica/Vostok","Arctic/Longyearbyen","Asia/Aden","Asia/Almaty","Asia/Amman","Asia/Anadyr","Asia/Aqtau","Asia/Aqtobe","Asia/Ashgabat","Asia/Atyrau","Asia/Baghdad","Asia/Bahrain","Asia/Baku","Asia/Bangkok","Asia/Barnaul","Asia/Beirut","Asia/Bishkek","Asia/Brunei","Asia/Calcutta","Asia/Chita","Asia/Choibalsan","Asia/Colombo","Asia/Damascus","Asia/Dhaka","Asia/Dili","Asia/Dubai","Asia/Dushanbe","Asia/Famagusta","Asia/Gaza","Asia/Hebron","Asia/Hong_Kong","Asia/Hovd","Asia/Irkutsk","Asia/Jakarta","Asia/Jayapura","Asia/Jerusalem","Asia/Kabul","Asia/Kamchatka","Asia/Karachi","Asia/Katmandu","Asia/Khandyga","Asia/Krasnoyarsk","Asia/Kuala_Lumpur","Asia/Kuching","Asia/Kuwait","Asia/Macau","Asia/Magadan","Asia/Makassar","Asia/Manila","Asia/Muscat","Asia/Nicosia","Asia/Novokuznetsk","Asia/Novosibirsk","Asia/Omsk","Asia/Oral","Asia/Phnom_Penh","Asia/Pontianak","Asia/Pyongyang","Asia/Qatar","Asia/Qostanay","Asia/Qyzylorda","Asia/Rangoon","Asia/Riyadh","Asia/Saigon","Asia/Sakhalin","Asia/Samarkand","Asia/Seoul","Asia/Shanghai","Asia/Singapore","Asia/Srednekolymsk","Asia/Taipei","Asia/Tashkent","Asia/Tbilisi","Asia/Tehran","Asia/Thimphu","Asia/Tokyo","Asia/Tomsk","Asia/Ulaanbaatar","Asia/Urumqi","Asia/Ust-Nera","Asia/Vientiane","Asia/Vladivostok","Asia/Yakutsk","Asia/Yekaterinburg","Asia/Yerevan","Atlantic/Azores","Atlantic/Bermuda","Atlantic/Canary","Atlantic/Cape_Verde","Atlantic/Faeroe","Atlantic/Madeira","Atlantic/Reykjavik","Atlantic/South_Georgia","Atlantic/St_Helena","Atlantic/Stanley","Australia/Adelaide","Australia/Brisbane","Australia/Broken_Hill","Australia/Currie","Australia/Darwin","Australia/Eucla","Australia/Hobart","Australia/Lindeman","Australia/Lord_Howe","Australia/Melbourne","Australia/Perth","Australia/Sydney","Europe/Amsterdam","Europe/Andorra","Europe/Astrakhan","Europe/Athens","Europe/Belgrade","Europe/Berlin","Europe/Bratislava","Europe/Brussels","Europe/Bucharest","Europe/Budapest","Europe/Busingen","Europe/Chisinau","Europe/Copenhagen","Europe/Dublin","Europe/Gibraltar","Europe/Guernsey","Europe/Helsinki","Europe/Isle_of_Man","Europe/Istanbul","Europe/Jersey","Europe/Kaliningrad","Europe/Kiev","Europe/Kirov","Europe/Lisbon","Europe/Ljubljana","Europe/London","Europe/Luxembourg","Europe/Madrid","Europe/Malta","Europe/Mariehamn","Europe/Minsk","Europe/Monaco","Europe/Moscow","Europe/Oslo","Europe/Paris","Europe/Podgorica","Europe/Prague","Europe/Riga","Europe/Rome","Europe/Samara","Europe/San_Marino","Europe/Sarajevo","Europe/Saratov","Europe/Simferopol","Europe/Skopje","Europe/Sofia","Europe/Stockholm","Europe/Tallinn","Europe/Tirane","Europe/Ulyanovsk","Europe/Uzhgorod","Europe/Vaduz","Europe/Vatican","Europe/Vienna","Europe/Vilnius","Europe/Volgograd","Europe/Warsaw","Europe/Zagreb","Europe/Zaporozhye","Europe/Zurich","Indian/Antananarivo","Indian/Chagos","Indian/Christmas","Indian/Cocos","Indian/Comoro","Indian/Kerguelen","Indian/Mahe","Indian/Maldives","Indian/Mauritius","Indian/Mayotte","Indian/Reunion","Pacific/Apia","Pacific/Auckland","Pacific/Bougainville","Pacific/Chatham","Pacific/Easter","Pacific/Efate","Pacific/Enderbury","Pacific/Fakaofo","Pacific/Fiji","Pacific/Funafuti","Pacific/Galapagos","Pacific/Gambier","Pacific/Guadalcanal","Pacific/Guam","Pacific/Honolulu","Pacific/Johnston","Pacific/Kiritimati","Pacific/Kosrae","Pacific/Kwajalein","Pacific/Majuro","Pacific/Marquesas","Pacific/Midway","Pacific/Nauru","Pacific/Niue","Pacific/Norfolk","Pacific/Noumea","Pacific/Pago_Pago","Pacific/Palau","Pacific/Pitcairn","Pacific/Ponape","Pacific/Port_Moresby","Pacific/Rarotonga","Pacific/Saipan","Pacific/Tahiti","Pacific/Tarawa","Pacific/Tongatapu","Pacific/Truk","Pacific/Wake","Pacific/Wallis"]';
const timezones = JSON.parse(timezonesJson);

const stringifyZone = (zone: string | Zone) => (typeof zone === 'string' ? zone : zone.name);

export default function SettingModal({ hideModal }: ModalProps) {
  console.log('rendering settings modal');
  const { lightMode, setLightMode, twelveHourModeSetting, setTwelveHourModeSetting } = useSettings();
  const [timezone, setTimezone] = useLocalStorageState('timezone', stringifyZone(LuxonSettings.defaultZone));
  const { fontSize: fontSizeAdjust, setFontSize: setFontSizeAdjust } = useHeaderFx();
  const isLightMode = lightMode === 'true';

  useEffect(() => {
    LuxonSettings.defaultZone = timezone;
    if (stringifyZone(LuxonSettings.defaultZone) === Intl.DateTimeFormat().resolvedOptions().timeZone) {
      localStorage.removeItem('timezone');
    }
  }, [timezone]);

  return (
    <div className='glass w-full max-w-xs rounded-lg transition-[height] md:mx-auto md:max-w-lg'>
      <button className='absolute top-2 right-4' onClick={hideModal}>
        <ImCross />
      </button>
      <p className='text-bold w-full text-center text-lg lg:text-2xl'><FormattedMessage id='settings.title' defaultMessage="Settings" /></p>
      <div className='flex flex-col justify-center gap-2 md:grid md:grid-cols-2'>
        {/* Theme */}
        <div className='w-full'>
          <p className='text-bold w-full md:text-center'><FormattedMessage id='settings.theme' defaultMessage="Theme" /></p>
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
        {/* Time format */}
        <div className='w-full'>
          <p className='text-bold w-full md:text-center'><FormattedMessage id='settings.timeformat' defaultMessage="Time format" /></p>
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
        {/* Timezone */}
        <div className='w-full'>
          <p className='text-md flex w-full justify-around md:block md:text-center'>
            <span><FormattedMessage id='settings.timezone' defaultMessage="Timezone" /></span>
            <span
              className='ml-auto cursor-pointer text-xs underline md:ml-4'
              onClick={() => setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)}
            >
              <FormattedMessage id='reset' defaultMessage="Reset" />
            </span>
          </p>
          <select
            className={`shadow-zinc-70 no-scrollbar w-full rounded-lg px-1 py-0.5 shadow-xl
    ${isLightMode ? 'bg-sky-300 text-black' : 'bg-violet-600 text-white'}`}
            onChange={e => setTimezone(e.target.value)}
            value={timezone}
          >
            {timezones.map((tz: string) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>
        {/* Font Size */}
        <div className='w-full'>
          <p className='text-bold w-full text-center'><FormattedMessage id='settings.fontsize' defaultMessage="Font Size" /></p>
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
      {/* Spacer */}
      <div className='h-4' />
    </div>
  );
}
