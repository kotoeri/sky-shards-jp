import { DateTime } from 'luxon';
import { useNow } from '../context/Now';
import { useSettings } from '../context/Settings';
import {FormattedMessage} from 'react-intl';  // for localize
import './Date.css';

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
  const format = [
    hideWeekday ? '' : defShort ? 'ccc,' : 'cccc,',
    defShort ? ' dd' : ' d',
    defShort ? ' MMM' : ' MMMM',
    hideYear ? '' : defShort ? ' yy' : ', yyyy',
  ].join('');
  return (
    <>
      {describeClose && describeClosePrefix && <span>, on </span>}
      <span className='Date'>{date.toFormat(format)}</span>
    </>
  );
}
