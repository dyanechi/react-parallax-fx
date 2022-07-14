export const calculateProgress = (
  _start: number,
  _length: number,
  _current: number,
  _offset?: number,
  callback?: (values: {
    isTransitioning: boolean;
    result: number;
    scrollHeight: number;
  }) => void
) => {
  const start = _start + (_offset || 0); /*+ (offset || 0)*/
  const end = start + _length;
  const scrollHeight = end - start;
  if (scrollHeight <= 0)
    throw new Error("'scrollHeight' must be greater than zero");

  // const current = config.startScroll + topScrollPosition;
  const diff = _current - start;
  const progress = diff / scrollHeight;
  const result = progress < 0 ? 0 : progress > 1 ? 1 : progress;
  // const status = (current < start) ? 'above' : (current > end) ? 'below' : 'in progress';

  const isTransitioning = !!(result > 0 && result < 1);
  callback && callback({ isTransitioning, result, scrollHeight });
  // setStatus({
  //     ...status,
  //     isTransitioning: !!(result > 0 && result < 1),
  // })

  // console.info(
  //     'Progress!\n',
  //     `start: ${start}\n`,
  //     `end: ${end}\n`,
  //     `scrollHeight: ${scrollHeight}\n`,
  //     `config startScroll: ${config.startScroll}\n`,
  //     `manual startScroll: ${topScrollPosition + window.innerHeight}\n`,
  //     `automated startScroll: ${getStartScrollValue(startScroll || "top")}\n`,
  //     `current: ${current}\n`,
  //     `diff: ${diff}\n`,
  //     `progress: ${progress}\n`,
  //     `result: ${result}\n`,
  //     `isTransitioning: ${status.isTransitioning}`
  // );

  // console.info(
  //     'Progress!\n',
  //     `start: ${start}\n`,
  //     `end: ${end}\n`,
  //     `scrollHeight: ${scrollHeight}\n`,
  //     `current: ${_current}\n`,
  //     `diff: ${diff}\n`,
  //     `progress: ${progress}\n`,
  //     `result: ${result}\n`,
  //     `isTransitioning: ${isTransitioning}`
  // );

  // setProgress(result);
  return result;
};
