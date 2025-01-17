import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { HeaderFxProvider } from './context/HeaderFx';
import { ModalProvider } from './context/ModalContext';
import { NowProvider } from './context/Now';
import { SettingsProvider } from './context/Settings';
import useFeedbackFormUrl from './hooks/useFeedbackFom';
import Footer from './sections/App/Footer';
import Header from './sections/App/Header';
import ShardCarousel from './sections/Shard/Carousel';

function ErrorFallback({ error }: FallbackProps) {
  const feedbackUrl = useFeedbackFormUrl({
    error,
    type: 'Bug',
  });
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center [&>*]:mb-2'>
      <h1 className='text-5xl' style={{ fontFamily: "'Caramel', cursive" }}>
        Sky Shards
      </h1>
      <p className='text-sm'>Sorry, the app crashed</p>
      <p className='text-sm'>Please submit a bug report</p>
      <a
        href={feedbackUrl}
        target='_blank'
        rel='noreferrer'
        className='mr-2 rounded-xl bg-purple-700 px-2 pb-1 pt-0.5 text-white'
      >
        <span className='text-sm font-bold '>Submit bug report</span>
      </a>
      <a
        href='https://v3.sky-shards.pages.dev'
        target='_blank'
        rel='noreferrer'
        className='ml-2 rounded-xl bg-purple-700 px-2 pb-1 pt-0.5 text-white'
      >
        <span className='text-sm font-bold '>Try the old version</span>
      </a>
      &nbsp;
      <p>
        Sorry for the inconvenience, I will try to fix it as soon as possible. <br />
      </p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HeaderFxProvider>
        <SettingsProvider>
          <NowProvider>
            <ModalProvider>
              <div className='App'>
                <Header />
                <ShardCarousel />
                <Footer />
              </div>
            </ModalProvider>
          </NowProvider>
        </SettingsProvider>
      </HeaderFxProvider>
    </ErrorBoundary>
  );
}

export default App;
