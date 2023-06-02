import { NativeScrollEvent } from 'react-native';

type ScrollParams = {
  nativeEvent: NativeScrollEvent;
  isScrolling: boolean;
  fetching: boolean;
  firstCallBack?: () => void;
  setAtTop?: React.Dispatch<React.SetStateAction<boolean>>;
  setAtBottom?: React.Dispatch<React.SetStateAction<boolean>>;
  bottomScrollCallback?: () => void;
  topScrollCallback?: () => void;
};

export const useScrollViewFetch = () => {
  const handleScrollToPosition = ({
    nativeEvent,
    isScrolling,
    setAtTop,
    setAtBottom,
    fetching,
    firstCallBack,
    bottomScrollCallback,
    topScrollCallback,
  }: ScrollParams) => {
    if (firstCallBack) firstCallBack();

    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
      contentOffset.y > 0;

    const isScrolledToTop =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
      contentOffset.y < 0;

    if (isScrolledToBottom && isScrolling) {
      if (setAtBottom) setAtBottom(true);
    }

    if (isScrolledToTop && isScrolling) {
      if (setAtTop) setAtTop(true);
    }

    if (!isScrolling && isScrolledToBottom && !fetching) {
      if (bottomScrollCallback) bottomScrollCallback();
    }

    if (!isScrolling && isScrolledToTop && !fetching) {
      if (topScrollCallback) topScrollCallback();
    }
  };

  return {
    handleScrollToPosition,
  };
};
