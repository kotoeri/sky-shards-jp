import { useRef } from 'react';
import { BsChevronCompactDown } from 'react-icons/bs';
import { DateTime, Settings, Zone } from 'luxon';
import Clock from '../../components/Clock';
import Date from '../../components/Date';
import { useNow } from '../../context/Now';
import { getUpcommingShardPhase, ShardInfo } from '../../shardPredictor';
import {FormattedMessage} from 'react-intl';  // for localize

interface ShardSummarySectionProp {
  date: DateTime;
  info: ShardInfo;
}

export default function ShardSummary({ date, info }: ShardSummarySectionProp) {
  const { application: now } = useNow();
  if (date.hasSame(now, 'day')) date = now;

  const summaryRef = useRef<HTMLDivElement>(null);
  if (!info.haveShard) {
    return (
      <div id='shardSummary'>
        <section id='shardInfo' className='glass'>
          <span><FormattedMessage id='shardSummary.NoShard1' defaultMessage='There is ' /></span>
          <strong><FormattedMessage id='shardSummary.NoShard2' defaultMessage='No Shard' /></strong>
          <Date date={date} describeClose describeClosePrefix />
        </section>
      </div>
    );
  } else {
    const upcomming = getUpcommingShardPhase(date, info);
    const landed = upcomming && upcomming.land < date;
    const next = upcomming ? (landed ? upcomming.end : upcomming.land) : undefined;
    const ordinalIndex = upcomming?.index !== undefined && ['1st', '2nd', '3rd'][upcomming.index];

    return (
      <div id='shardSummary' ref={summaryRef}>
        <section id='shardInfo' className='glass'>
          <p className='whitespace-normal'>
            <strong className={`${info.isRed ? 'Red' : 'Black'} whitespace-nowrap`}>
              {info.isRed ? <FormattedMessage id='Red' defaultMessage='Red' /> : <FormattedMessage id='Black' defaultMessage='Black' />}<FormattedMessage id='Shard' defaultMessage=' Shard' />
            </strong>
            <span><FormattedMessage id='shardSummary.in' defaultMessage=' in ' /></span>
            <strong>
            <FormattedMessage id={info.map} />, <FormattedMessage id={info.realmNick} />
            </strong>
            <Date date={date} describeClose describeClosePrefix />
          </p>
          <p>
            <span><FormattedMessage id='shardSummary.giving' defaultMessage='Giving ' /></span>
            {info.isRed ? (
              <>
                <strong><FormattedMessage id='shardSummary.max' defaultMessage=' max of ' />{info.rewardAC}</strong>
                <img className='emoji' src='/emojis/AscendedCandle.webp' alt='Ascended Candles' />
              </>
            ) : (
              <>
                <strong>4</strong>
                <img className='emoji' src='/emojis/CandleCake.webp' alt='Candle Cakes' />
                <span><FormattedMessage id='shardSummary.wax' defaultMessage=' of wax' /></span>
              </>
            )}
            <span><FormattedMessage id='shardSummary.after' defaultMessage=' after first clear' /></span>
          </p>
        </section>
        <section id='shardTiming' className='glass'>
          {upcomming ? (
            <>
              <div id='shardCountdown'>
                <span>
                  <strong>{ordinalIndex ? (<FormattedMessage id={ordinalIndex} />) : (<FormattedMessage id='Shard' defaultMessage=' Shard' />)} </strong>
                  {landed ? (
                    <>
                      <span className='whitespace-nowrap'>
                      <FormattedMessage id='shardSummary.haslanded1' defaultMessage='has ' />
                      <strong><FormattedMessage id='shardSummary.haslanded2' defaultMessage='landed ' /></strong>
                        <Clock date={upcomming.land} relative negate inline hideSeconds fontSize='0.9em' />
                      </span>
                      <span><FormattedMessage id='shardSummary.haslandedago' defaultMessage=' ago. ' /></span>
                      
                      <span className='whitespace-nowrap'>
                      <FormattedMessage id='shardSummary.haslandedend1' defaultMessage='it will ' />
                      <strong><FormattedMessage id='shardSummary.haslandedend2' defaultMessage='end in' /></strong>{' '}
                      </span>
                    </>
                  ) : (
                    <span className='whitespace-nowrap'>
                      <FormattedMessage id='shardSummary.willlandin1' defaultMessage='will ' /><strong><FormattedMessage id='shardSummary.willlandin2' defaultMessage='land in' /></strong>
                    </span>
                  )}
                </span>
                <Clock date={next} relative trim useSemantic fontSize='1.2em' />
                <small><FormattedMessage id='shardSummary.whichis' defaultMessage=' which is' /></small>
              </div>
              <time
                id='shardAbsLocal'
                dateTime={next?.setZone('local')?.toISO({ suppressMilliseconds: true }) ?? undefined}
              >
                <strong><FormattedMessage id='shardSummary.YourTime' defaultMessage='Your Time: ' /></strong>
                <small className='block'>({(Settings.defaultZone as Zone).name})</small>
                <Date date={next} local />
                <Clock date={next} local />
              </time>
              <time id='shardAbsSky' dateTime={next?.toISO({ suppressMilliseconds: true }) ?? undefined}>
                <strong><FormattedMessage id='shardSummary.SkyTime' defaultMessage='Sky Time:' /></strong>
                <small className='block'>(America/Los_Angeles)</small>
                <Date date={next} />
                <Clock date={next} />
              </time>
            </>
          ) : (
            <div id='shardCountdown'>
              <span><FormattedMessage id='shardSummary.Allended' defaultMessage=' All shard has ended ' /></span>
              <Clock date={info.lastEnd} relative negate useSemantic fontSize='1.2em' />
              <span><FormattedMessage id='shardSummary.endedago' defaultMessage=' ago ' /></span>
            </div>
          )}
        </section>
        <small
          className='scrollHint'
          onClick={() => {
            summaryRef.current?.parentElement?.scrollBy({
              top: summaryRef.current?.offsetHeight,
              behavior: 'smooth',
            });
          }}
        >
          <span><FormattedMessage id='shardSummary.Scrolldown' defaultMessage='Click here or Scroll down for more info' /></span>
          <BsChevronCompactDown />
        </small>
      </div>
    );
  }
}
