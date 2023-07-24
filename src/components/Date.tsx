import { DateTime } from 'luxon';
import { useNow } from '../context/Now';
import { useSettings } from '../context/Settings';
import {useIntl, FormattedMessage} from 'react-intl';  // for localize
import './Date.css';
import {geti18nlocaleZone} from '../../i18nSettings';

interface DateProp {
  date?: DateTime;
  local?: boolean;
  short?: boolean;
  describeClose?: boolean;
  describeClosePrefix?: boolean;
  hideWeekday?: boolean;
  hideYear?: boolean;
}

export default function Date({
  date,
  local,
  short,
  describeClose,
  describeClosePrefix,
  hideWeekday,
  hideYear,
}: DateProp) {
  const isMobile = useSettings().isCompactMode;
  const now = local ? useNow().local : useNow().application;
  date = (local ? date?.toLocal() : date?.setZone('America/Los_Angeles')) ?? now;
  const howClose = Math.ceil(date.startOf('day').diff(now.startOf('day'), 'days').days);

  if (describeClose && Math.abs(howClose) <= 1) {
    return (
      <>
        {describeClosePrefix && <span>, </span>}
        <span className='Date'>
          {
            {
              '-1': <FormattedMessage id='yesterday' defaultMessage='Yesterday' />,
              '0': <FormattedMessage id='today' defaultMessage='Today' />,
              '1': <FormattedMessage id='tomorrow' defaultMessage='Tomorrow' />,
            }[howClose.toString()]
          }
        </span>
      </>
    );
  }
  const defShort = short ?? isMobile;
  date.setLocale('ja');
  const intl = useIntl();
  const hidneWeek = intl.formatMessage({ id: 'hidneWeek' , defaultMessage: "" });
  const ShortWeek = intl.formatMessage({ id: 'ShortWeek' , defaultMessage: "EEE," });
  const LongWeek = intl.formatMessage({ id: 'LongWeek' , defaultMessage: "EEEE," });
  const ShortDay = intl.formatMessage({ id: 'ShortDay' , defaultMessage: " dd" });
  const LongDay = intl.formatMessage({ id: 'LongDay' , defaultMessage: " d" });
  const ShortMonth = intl.formatMessage({ id: 'ShortMonth' , defaultMessage: " MMM" });
  const LongMonth = intl.formatMessage({ id: 'LongMonth' , defaultMessage: " MMMM" });
  const noYear = intl.formatMessage({ id: 'noYear' , defaultMessage: "" });
  const shortYear = intl.formatMessage({ id: 'shortYear' , defaultMessage: " yy" });
  const LongYear = intl.formatMessage({ id: 'LongYear' , defaultMessage: ", yyyy" });

  const format = [
    hideWeekday ? hidneWeek : defShort ? ShortWeek : LongWeek,
    defShort ? ShortDay : LongDay,
    defShort ? ShortMonth : LongMonth,
    hideYear ? noYear : defShort ? shortYear : LongYear,
  ].join('');
  // Since the order of year, month, and date is different in Japan, the order is changed in json,
  // and finally the date and time are obtained in the format of the specified language
  return (
    <>
      {describeClose && describeClosePrefix && <span>, on </span>}
      <span className='Date'>{date.setLocale(geti18nlocaleZone).toFormat(format)}</span>
    </>
  );
}
