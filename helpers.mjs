export function calledNTimes (n) {
  var called = 0;
  return function() {
    called++;
    return called >= n;
  };
};

