import { ImCross } from 'react-icons/im';
import { ModalProps } from '../../context/ModalContext';
import { FormattedMessage} from 'react-intl';  // for localize

export default function Announcement_V4({ hideModal }: ModalProps) {
  return (
    <div className='glass w-full max-w-xs rounded-lg transition-[height] md:mx-auto md:max-w-lg'>
      <button
        className='absolute right-4 top-2'
        onClick={() => {
          localStorage.setItem('v4AnnouncementDismissed', 'true');
          hideModal();
        }}
      >
        <ImCross />
      </button>
      <h1 className='text-center text-lg font-semibold'><FormattedMessage id='V4Announcement.title' defaultMessage="V4 Announcement" /></h1>
      <div className='px-4 py-2 [&>*]:pb-2'>
        <p>
          <span className='text-lg font-semibold'><FormattedMessage id='V4Announcement.1' defaultMessage="Hi Skykids!" /></span>
          <span><FormattedMessage id='V4Announcement.2' defaultMessage=", Plutoy here." /></span>
        </p>
        <p>
          <span><FormattedMessage id='V4Announcement.3' defaultMessage="Sky shards has been upgraded to " /></span>
          <span className='text-lg font-semibold'><FormattedMessage id='V4Announcement.4' defaultMessage="V4! Hurray" /></span>
        </p>
        <p><FormattedMessage id='V4Announcement.5' defaultMessage="It was previously released, but got rolled back as it was buggy." /></p>
        <p>
        <FormattedMessage id='V4Announcement.6.1' defaultMessage="It&apos;s now back, and " /><strong><FormattedMessage id='V4Announcement.6.2' defaultMessage="hopefully" /></strong><FormattedMessage id='V4Announcement.6.3' defaultMessage=" it&apos;s better than ever!" />
        </p>
        <p><FormattedMessage id='V4Announcement.7' defaultMessage=" It might still have bugs though, so please report them to me." /></p>
        <p>
          <span><FormattedMessage id='V4Announcement.8' defaultMessage="You can find the a feedback Google Form at the bottom of the page." /></span>
        </p>
        &nbsp;
        <p>
          <span className='text-lg font-semibold'><FormattedMessage id='V4Announcement.9' defaultMessage="Thank you" /></span>
        </p>
      </div>
    </div>
  );
}
