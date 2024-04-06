var Phase = /*#__PURE__*/function (Phase) {
  Phase[Phase["Start"] = 0] = "Start";
  Phase[Phase["End"] = 1] = "End";
  return Phase;
}(Phase || {});
// Attach a custom dispatcher
let customDispatcher;
export function attachDispatcher(dispatcher) {
  customDispatcher = dispatcher;
}

// Check if the Performance API is available
// e.g. JSDom (used in Jest) doesn't implement these
const perf = globalThis.performance;
const isPerfSupported = typeof perf !== 'undefined' && typeof perf.mark === 'function' && typeof perf.clearMarks === 'function' && typeof perf.measure === 'function' && typeof perf.clearMeasures === 'function';
function getMeasureName(id, specifier) {
  return specifier ? `${id}-${specifier}` : id;
}
function getMarkName(id, specifier, specifierIndex) {
  const measureName = getMeasureName(id, specifier);
  return specifier && specifierIndex ? `${measureName}_${specifierIndex}` : measureName;
}
function getDetail(specifier, metadata) {
  const detail = specifier || metadata ? {
    ...metadata
  } : null;
  if (detail && specifier) {
    detail['specifier'] = specifier;
  }
  return detail;
}

// For marking request metrics
// Fallback to the Performance API if there is no custom dispatcher
export function logOperationStart({
  id,
  specifier,
  specifierIndex,
  metadata
}) {
  if (customDispatcher) {
    customDispatcher({
      id,
      phase: Phase.Start,
      specifier,
      metadata
    });
    return;
  }
  if (isPerfSupported) {
    const markName = getMarkName(id, specifier, specifierIndex);
    const detail = getDetail(specifier, metadata);
    perf.mark(markName, {
      detail
    });
  }
}

// For measuring duration metrics
// Fallback to the Performance API if there is no custom dispatcher
/* istanbul ignore next */
export function logOperationEnd({
  id,
  specifier,
  specifierIndex,
  metadata
}) {
  if (customDispatcher) {
    customDispatcher({
      id,
      phase: Phase.End,
      specifier,
      metadata
    });
  } else if (isPerfSupported) {
    const markName = getMarkName(id, specifier, specifierIndex);
    const measureName = getMeasureName(id, specifier);
    const detail = getDetail(specifier, metadata);
    perf.measure(measureName, {
      start: markName,
      detail
    });

    // Clear the created mark and measure to avoid filling the performance entry buffer
    // Even if they get deleted, existing PerformanceObservers preserve copies of the entries
    perf.clearMarks(markName);
    perf.clearMeasures(measureName);
  }
}